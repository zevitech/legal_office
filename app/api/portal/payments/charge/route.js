import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendAttorneyActivityEmail, sendPortalActivityEmail } from "@/lib/portalEmail";
import { savePaymentEvidence } from "@/lib/paymentEvidence";
import { claimInvoicePayment, completeInvoicePayment, holdInvoiceForReview, releaseDeclinedInvoice } from "@/lib/portalInvoicePaymentLock";

export async function POST(request) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getPortalUser();
  if (!user || user.role !== "client") return NextResponse.json({ error: "Client access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  let invoiceRef;
  let paymentAttempt;
  let gatewaySucceeded = false;
  let invoiceMarkedPaid = false;
  let completedTransactionId = "";
  let completedAmount = 0;
  try {
    const body = await request.json();
    const invoiceId = String(body.invoiceId || "").slice(0, 160);
    const paymentToken = String(body.paymentToken || "");
    const billingMethodId = String(body.billingMethodId || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 180);
    if (!invoiceId || (!paymentToken && !billingMethodId)) return NextResponse.json({ error: "Payment request and a payment method are required." }, { status: 400 });
    if (!body.acceptedTerms) return NextResponse.json({ error: "Please accept the payment terms before continuing." }, { status: 400 });
    const clientRef = db.collection("portalClients").doc(user.uid);
    invoiceRef = clientRef.collection("invoices").doc(invoiceId);
    const invoiceSnapshot = await invoiceRef.get();
    if (!invoiceSnapshot.exists) return NextResponse.json({ error: "Payment request not found." }, { status: 404 });
    const invoice = invoiceSnapshot.data();
    if (invoice.status === "paid") return NextResponse.json({ error: "This payment was already completed." }, { status: 409 });
    const amount = Number(invoice.amount || 0);
    if (!(amount > 0 && amount <= 25000)) return NextResponse.json({ error: "Invalid payment amount." }, { status: 400 });
    const securityKey = process.env.NMI_SECURITY_KEY;
    if (!securityKey) return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 503 });
    const gatewayUrl = process.env.NMI_GATEWAY_URL || "https://secure.nmi.com";
    let storedMethod = null;
    if (billingMethodId) {
      const storedSnapshot = await clientRef.collection("billingMethods").doc(billingMethodId).get();
      if (!storedSnapshot.exists || storedSnapshot.data()?.status !== "active") return NextResponse.json({ error: "Saved payment method not found." }, { status: 404 });
      storedMethod = storedSnapshot.data();
    }
    paymentAttempt = await claimInvoicePayment(db, invoiceRef, { actorUid:user.uid, source:"client_portal" });
    if (!paymentAttempt.ok) return NextResponse.json({ error:paymentAttempt.error }, { status:paymentAttempt.status });
    const gatewayParams = new URLSearchParams({ security_key: securityKey, type: "sale", amount: amount.toFixed(2), currency: "USD", email: user.email || "", order_description: `${invoice.title || "Portal payment"} · ${invoice.caseId || "Trademark matter"}`, ...(storedMethod ? { customer_vault_id: storedMethod.customerVaultId, initiated_by: "customer", stored_credential_indicator: "used", original_transaction_id: storedMethod.originalTransactionId } : { payment_token: paymentToken, first_name: String(body.firstName || "").slice(0, 80), last_name: String(body.lastName || "").slice(0, 80), zip: String(body.zip || "").slice(0, 20), ...(body.savePaymentMethod ? { customer_vault: "add_customer", billing_method: "recurring", initiated_by: "customer", stored_credential_indicator: "stored" } : {}) }) });
    const response = await fetch(`${gatewayUrl}/api/transact.php`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: gatewayParams.toString() });
    const gateway = Object.fromEntries(new URLSearchParams(await response.text()));
    if (gateway.response !== "1") { await releaseDeclinedInvoice(db, invoiceRef, paymentAttempt.attemptId, gateway.responsetext||"Payment declined."); return NextResponse.json({ error: gateway.responsetext || "Payment declined." }, { status: 400 }); }
    gatewaySucceeded = true;
    completedTransactionId = gateway.transactionid || "";
    completedAmount = amount;
    await completeInvoicePayment(db, invoiceRef, paymentAttempt.attemptId, { paymentMethod: "portal_card", transactionId: completedTransactionId, paidAt: FieldValue.serverTimestamp() });
    invoiceMarkedPaid = true;
    if (invoice.activityId) await clientRef.collection("activity").doc(invoice.activityId).set({ paymentStatus: "paid", taskStatus: "completed", transactionId: gateway.transactionid || "", paidAt: FieldValue.serverTimestamp() }, { merge: true });
    if (invoice.caseId && invoice.paymentKind === "classification_fees") await clientRef.collection("cases").doc(invoice.caseId).set({ classificationPaymentStatus: "paid", currentStage: "USPTO filing fees paid — preparing submission", progress: 58, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    try { await savePaymentEvidence({ clientRef, request, transactionId: gateway.transactionid || "", amount, caseId: invoice.caseId || "", invoiceId, acceptedTerms: true, savePaymentMethod: Boolean(body.savePaymentMethod), attorneyChargeConsent: false, customerVaultId: gateway.customer_vault_id || "", cardLastFour: gateway.cc_number || gateway.card_number || "", cardBrand:gateway.cc_type||gateway.card_type||"Card", source: storedMethod ? "client_portal_saved_method" : "client_portal", email: user.email || "" }); } catch (error) { console.error("Portal payment succeeded; evidence storage needs retry:", error?.message); }
    const event = { clientUid: user.uid, clientName: user.name, clientEmail: user.email, type: "payment_completed", title: `${invoice.title || "Classification payment"} paid`, message: `$${amount.toFixed(2)} was paid securely through the client portal.`, caseId: invoice.caseId || "", read: false, createdAt: FieldValue.serverTimestamp() };
    await db.collection("portalAttorneyNotifications").add(event);
    try { await sendAttorneyActivityEmail(event); } catch (error) { console.error("Attorney payment email failed:", error?.message); }
    const receipt = { type:"payment_receipt", title:`Receipt — ${invoice.title || "Portal payment"}`, message:`Your payment was completed successfully and recorded in your secure billing history. It will appear as XTARLABS LLC.`, amount, classificationFees:invoice.classificationFees||[], transactionId:gateway.transactionid||"", caseId:invoice.caseId||"", read:false, createdAt:FieldValue.serverTimestamp() };
    await clientRef.collection("activity").add(receipt);
    try { await sendPortalActivityEmail({ clientName:user.name, clientEmail:user.email, attorneyName:"Legal Trademark Office billing team", ...receipt }); } catch (error) { console.error("Client receipt email failed:", error?.message); }
    return NextResponse.json({ success: true, transactionId: gateway.transactionid || "", amount, paymentMethodSaved: Boolean(gateway.customer_vault_id) });
  } catch(error) {
    if (invoiceMarkedPaid) {
      console.error("Portal payment completed; follow-up synchronization failed:", error?.message);
      return NextResponse.json({ success:true, transactionId:completedTransactionId, amount:completedAmount, warning:"Payment completed. Some portal records may take longer to refresh." });
    }
    if (paymentAttempt?.ok && invoiceRef) {
      try { await holdInvoiceForReview(db, invoiceRef, paymentAttempt.attemptId, gatewaySucceeded ? "Gateway approved the charge, but portal finalization failed." : "Gateway result was not confirmed. Reconcile before retrying."); } catch {}
    }
    console.error("Portal payment failed:", error?.message);
    return NextResponse.json({ error: gatewaySucceeded ? "The payment was approved but needs account reconciliation. Do not retry; contact the billing team." : "Payment status could not be confirmed. Do not retry until the billing team reviews the invoice." }, { status: 500 });
  }
}
