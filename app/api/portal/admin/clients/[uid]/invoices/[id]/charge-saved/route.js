import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { requestEvidence, STATEMENT_DESCRIPTOR } from "@/lib/paymentEvidence";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { claimInvoicePayment, completeInvoicePayment, holdInvoiceForReview, releaseDeclinedInvoice } from "@/lib/portalInvoicePaymentLock";

const allowedKinds = new Set(["classification_fees", "office_action", "amendment", "declaration", "publication", "filing_requirement"]);

export async function POST(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
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
    if (body.confirmCharge !== true) return NextResponse.json({ error: "Explicit charge confirmation is required." }, { status: 400 });
    const clientRef = db.collection("portalClients").doc(params.uid);
    invoiceRef = clientRef.collection("invoices").doc(params.id);
    const [clientSnapshot, invoiceSnapshot, methodsSnapshot] = await Promise.all([
      clientRef.get(), invoiceRef.get(), clientRef.collection("billingMethods").where("attorneyInitiatedChargesAuthorized", "==", true).limit(5).get(),
    ]);
    if (!clientSnapshot.exists || !invoiceSnapshot.exists) return NextResponse.json({ error: "Client or invoice not found." }, { status: 404 });
    const invoice = invoiceSnapshot.data();
    if (invoice.status === "paid") return NextResponse.json({ error: "This invoice was already paid." }, { status: 409 });
    const amount = Number(invoice.amount || 0);
    const paymentKind = String(invoice.paymentKind || "");
    if (!allowedKinds.has(paymentKind)) return NextResponse.json({ error: "This fee category is outside the client standing authorization." }, { status: 400 });
    const methodDoc = methodsSnapshot.docs.find((doc) => { const method = doc.data(); return method.status === "active" && Number(method.attorneyChargeMaximum || 0) >= amount && (method.attorneyChargeCategories || []).includes(paymentKind); });
    if (!methodDoc) return NextResponse.json({ error: "The client has not granted a valid standing authorization for this amount and fee category. Send the invoice for client approval instead." }, { status: 409 });
    const method = methodDoc.data();
    const securityKey = process.env.NMI_SECURITY_KEY;
    if (!securityKey) return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 503 });
    paymentAttempt = await claimInvoicePayment(db, invoiceRef, { actorUid:staff.uid, source:"attorney_authorized_saved_method" });
    if (!paymentAttempt.ok) return NextResponse.json({ error:paymentAttempt.error }, { status:paymentAttempt.status });
    const gatewayUrl = process.env.NMI_GATEWAY_URL || "https://secure.nmi.com";
    const paramsBody = new URLSearchParams({ security_key:securityKey, type:"sale", amount:amount.toFixed(2), currency:"USD", customer_vault_id:method.customerVaultId, initiated_by:"merchant", stored_credential_indicator:"used", original_transaction_id:method.originalTransactionId, email:clientSnapshot.data()?.email||"", order_description:`${invoice.title||"Attorney-issued trademark fee"} · ${invoice.caseId||"Trademark matter"}` });
    const response = await fetch(`${gatewayUrl}/api/transact.php`, { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:paramsBody.toString() });
    const gateway = Object.fromEntries(new URLSearchParams(await response.text()));
    if (gateway.response !== "1") { await releaseDeclinedInvoice(db, invoiceRef, paymentAttempt.attemptId, gateway.responsetext||"The saved payment method was declined."); return NextResponse.json({ error:gateway.responsetext||"The saved payment method was declined." }, { status:400 }); }
    gatewaySucceeded = true;
    const transactionId = gateway.transactionid || "";
    await completeInvoicePayment(db, invoiceRef, paymentAttempt.attemptId, { paymentMethod:"nmi_saved_method_attorney_initiated", billingMethodId:methodDoc.id, transactionId, paidAt:FieldValue.serverTimestamp(), chargedBy:staff.uid, statementDescriptor:STATEMENT_DESCRIPTOR });
    invoiceMarkedPaid = true;
    completedTransactionId = transactionId;
    completedAmount = amount;
    if (invoice.activityId) await clientRef.collection("activity").doc(invoice.activityId).set({ paymentStatus:"paid", taskStatus:"completed", transactionId, paidAt:FieldValue.serverTimestamp(), paidBy:"authorized_saved_method" }, { merge:true });
    if (invoice.caseId && paymentKind === "classification_fees") await clientRef.collection("cases").doc(invoice.caseId).set({ classificationPaymentStatus:"paid", currentStage:"USPTO filing fees paid — preparing submission", progress:58, updatedAt:FieldValue.serverTimestamp() }, { merge:true });
    const audit = { event:"attorney_initiated_authorized_charge", caseId:invoice.caseId||"", invoiceId:params.id, paymentKind, amount, currency:"USD", transactionId, billingMethodId:methodDoc.id, statementDescriptor:STATEMENT_DESCRIPTOR, standingConsentText:method.attorneyChargeConsentText||"", standingConsentAt:method.consentAt||null, maximumAuthorized:Number(method.attorneyChargeMaximum||0), performedBy:staff.uid, performedByName:staff.name, performedByRole:staff.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) };
    await clientRef.collection("auditLog").add(audit);
    const client = clientSnapshot.data() || {};
    const notice = { type:"payment_receipt", title:`Receipt — ${invoice.title||"Trademark fee"}`, message:`The authorized $${amount.toFixed(2)} charge was completed using your saved payment method. It will appear as ${STATEMENT_DESCRIPTOR}.`, amount, classificationFees:invoice.classificationFees||[], transactionId, paymentStatus:"paid", taskStatus:"completed", caseId:invoice.caseId||"", createdAt:FieldValue.serverTimestamp(), read:false };
    await clientRef.collection("activity").add(notice);
    try { await sendPortalActivityEmail({ clientName:client.name, clientEmail:client.email, attorneyName:staff.name, ...notice }); } catch (error) { console.error("Authorized charge completed; email failed:", error?.message); }
    return NextResponse.json({ success:true, transactionId, amount });
  } catch (error) {
    if (invoiceMarkedPaid) {
      console.error("Authorized charge completed; follow-up synchronization failed:", error?.message);
      return NextResponse.json({ success:true, transactionId:completedTransactionId, amount:completedAmount, warning:"Charge completed. Some portal records may take longer to refresh." });
    }
    if (paymentAttempt?.ok && invoiceRef) {
      try { await holdInvoiceForReview(db, invoiceRef, paymentAttempt.attemptId, gatewaySucceeded ? "Gateway approved the attorney-authorized charge, but portal finalization failed." : "Gateway result was not confirmed. Reconcile before retrying."); } catch {}
    }
    console.error("Authorized saved-method charge failed:", error?.message);
    return NextResponse.json({ error:gatewaySucceeded?"The charge was approved but requires reconciliation. Do not retry the charge.":"Charge status could not be confirmed. Do not retry until billing reconciliation is complete." }, { status:500 });
  }
}
