import { NextResponse } from "next/server";
import { calculateOrderTotal } from "@/constant/pricing";

export async function POST(req) {
  try {
    const {
      paymentToken,
      packageName,
      isRushProcessing,
      firstName,
      lastName,
      email,
      zip,
      description,
      testKey,
    } = await req.json();

    if (!paymentToken) {
      return NextResponse.json(
        { success: false, message: "paymentToken is required" },
        { status: 400 }
      );
    }

    // The gateway account requires a zip on every transaction.
    if (!zip) {
      return NextResponse.json(
        { success: false, message: "Billing zip / postal code is required" },
        { status: 400 }
      );
    }

    // Never trust an amount sent by the browser — recalculate it here.
    const realAmount = calculateOrderTotal({ packageName, isRushProcessing });
    if (realAmount === null || realAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid package selection" },
        { status: 400 }
      );
    }

    // TEST CHARGE — lets us exercise the live gateway for $1 without changing
    // the price for real customers. Requires NMI_TEST_KEY to be set in the
    // environment AND the caller to present the exact matching secret.
    // The secret never leaves the server, so it cannot be guessed from the
    // client bundle. Unset NMI_TEST_KEY to disable testing entirely.
    const expectedTestKey = process.env.NMI_TEST_KEY;
    const isTestCharge =
      !!expectedTestKey && !!testKey && testKey === expectedTestKey;

    const testAmount = Number(process.env.NMI_TEST_AMOUNT || 1);
    const amount = isTestCharge ? testAmount : realAmount;

    if (isTestCharge) {
      console.log(
        `NMI TEST CHARGE: $${amount.toFixed(2)} (real price $${realAmount.toFixed(2)})`
      );
    }

    const securityKey = process.env.NMI_SECURITY_KEY;
    if (!securityKey) {
      return NextResponse.json(
        { success: false, message: "Payment gateway is not configured" },
        { status: 500 }
      );
    }

    const gatewayUrl = process.env.NMI_GATEWAY_URL || "https://secure.nmi.com";

    const params = new URLSearchParams({
      security_key: securityKey,
      payment_token: paymentToken,
      type: "sale",
      amount: amount.toFixed(2),
      currency: "USD",
      ...(firstName ? { first_name: firstName } : {}),
      ...(lastName ? { last_name: lastName } : {}),
      ...(email ? { email } : {}),
      ...(zip ? { zip } : {}),
      ...(description
        ? {
            order_description: isTestCharge
              ? `[TEST] ${description}`
              : description,
          }
        : {}),
    });

    const gatewayRes = await fetch(`${gatewayUrl}/api/transact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const parsed = Object.fromEntries(
      new URLSearchParams(await gatewayRes.text())
    );

    // response=1 approved, 2 declined, 3 error
    if (parsed.response !== "1") {
      console.log("NMI decline:", {
        response: parsed.response,
        code: parsed.response_code,
        text: parsed.responsetext,
      });
      return NextResponse.json(
        {
          success: false,
          message: parsed.responsetext || "Payment declined",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        transactionId: parsed.transactionid || "",
        authCode: parsed.authcode || "",
        amount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("NMI charge error:", error?.message);
    return NextResponse.json(
      { success: false, message: "Payment could not be processed" },
      { status: 500 }
    );
  }
}
