import { NextResponse } from "next/server";
import { calculateOrderTotal } from "@/constant/pricing";
import { provisionPortalClient } from "@/lib/portalProvisioning";
import { getPortalUser } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { PAYMENT_AGREEMENT_TEXT, PAYMENT_AGREEMENT_VERSION, STATEMENT_DESCRIPTOR, requestEvidence, savePaymentEvidence } from "@/lib/paymentEvidence";

export async function POST(req) {
  try {
    const portalUser = await getPortalUser();
    const {
      paymentToken,
      packageName,
      isRushProcessing,
      addons,
      firstName,
      lastName,
      email,
      zip,
      description,
      company,
      markName,
      markType,
      applicationDetails,
      billingProfile,
      acceptedTerms,
      savePaymentMethod,
      attorneyChargeConsent,
    } = await req.json();
    const accountEmail = portalUser?.role === "client" ? portalUser.email : email;
    const accountName = portalUser?.role === "client" ? portalUser.name : [firstName, lastName].filter(Boolean).join(" ");

    if (!paymentToken) {
      return NextResponse.json(
        { success: false, message: "paymentToken is required" },
        { status: 400 }
      );
    }
    if (!acceptedTerms) {
      return NextResponse.json(
        { success: false, message: "Please accept the checkout terms before payment." },
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
    const amount = calculateOrderTotal({ packageName, isRushProcessing, addons });
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
      ...(accountEmail ? { email: accountEmail } : {}),
      ...(zip ? { zip } : {}),
      ...(description ? { order_description: description } : {}),
      ...(savePaymentMethod ? {
        customer_vault: "add_customer",
        billing_method: "recurring",
        initiated_by: "customer",
        stored_credential_indicator: "stored",
      } : {}),
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

    let portalProvisioned = false;
    let portalNewlyCreated = false;
    let portalUid = portalUser?.role === "client" ? portalUser.uid : "";
    if (accountEmail && accountName) {
      try {
        const provisioned = await provisionPortalClient({ name: accountName, email: String(accountEmail).trim().toLowerCase(), company, phone:billingProfile?.phone||"", markName, markType, packageName, transactionId: parsed.transactionid || "", orderTotal: amount, source: "checkout", applicationDetails, billingProfile });
        portalUid = provisioned.uid;
        portalNewlyCreated = Boolean(provisioned.newlyCreated);
        portalProvisioned = true;
      } catch (portalError) {
        console.error("Payment succeeded; portal provisioning needs retry:", portalError?.message);
      }
    }

    const db = getAdminFirestore();
    const transactionId = parsed.transactionid || "";
    const customerVaultId = parsed.customer_vault_id || "";
    if (db && transactionId) {
      try {
        const evidence = requestEvidence(req);
        await db.collection("paymentEvidence").doc(transactionId).set({
        transactionId,
        clientUid: portalUid,
        email: accountEmail || "",
        amount,
        currency: "USD",
        acceptedTerms: true,
        agreementVersion: PAYMENT_AGREEMENT_VERSION,
        agreementText: PAYMENT_AGREEMENT_TEXT,
        statementDescriptor: STATEMENT_DESCRIPTOR,
        savedPaymentMethodConsent: Boolean(savePaymentMethod),
        attorneyChargeConsent: Boolean(attorneyChargeConsent),
        customerVaultCreated: Boolean(customerVaultId),
        source: "website_checkout",
        createdAt: new Date().toISOString(),
        ...evidence,
        });
        if (portalUid) await savePaymentEvidence({ clientRef: db.collection("portalClients").doc(portalUid), request: req, transactionId, amount, caseId: transactionId, acceptedTerms: true, savePaymentMethod: Boolean(savePaymentMethod), attorneyChargeConsent: Boolean(attorneyChargeConsent), customerVaultId, cardLastFour: parsed.cc_number || parsed.card_number || "", cardBrand:parsed.cc_type||parsed.card_type||"Card", source: "website_checkout", email: accountEmail || "" });
      } catch (evidenceError) {
        console.error("Payment succeeded; evidence storage needs retry:", evidenceError?.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        transactionId,
        authCode: parsed.authcode || "",
        amount,
        portalProvisioned,
        portalNewlyCreated,
        paymentMethodSaved: Boolean(customerVaultId),
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
