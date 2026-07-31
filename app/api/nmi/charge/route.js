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
    } = await req.json();

    if (!paymentToken) {
      return NextResponse.json(
        { success: false, message: "paymentToken is required" },
        { status: 400 }
      );
    }

    // Never trust an amount sent by the browser — recalculate it here.
    const amount = calculateOrderTotal({ packageName, isRushProcessing });
    if (amount === null || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid package selection" },
        { status: 400 }
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
      ...(description ? { order_description: description } : {}),
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
