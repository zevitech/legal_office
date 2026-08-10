import { FieldValue } from "firebase-admin/firestore";
import { NextResponse } from "next/server";
import { getPortalUser, isTrustedPortalOrigin } from "@/lib/portalAuth";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendPortalActivityEmail } from "@/lib/portalEmail";
import { requestEvidence } from "@/lib/paymentEvidence";

export async function PATCH(request, { params }) {
  if (!isTrustedPortalOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const staff = await getPortalUser();
  if (!staff || !["admin", "attorney"].includes(staff.role)) return NextResponse.json({ error: "Attorney access required." }, { status: 401 });
  const db = getAdminFirestore();
  if (!db) return NextResponse.json({ error: "Portal database is not configured." }, { status: 503 });
  try {
    const clientRef = db.collection("portalClients").doc(params.uid);
    const invoiceRef = clientRef.collection("invoices").doc(params.id);
    const [clientSnapshot, invoiceSnapshot] = await Promise.all([clientRef.get(), invoiceRef.get()]);
    if (!invoiceSnapshot.exists) return NextResponse.json({ error: "Payment request not found." }, { status: 404 });
    const invoice = invoiceSnapshot.data();
    await invoiceRef.set({ status: "paid", paymentMethod: "attorney_confirmed", paidAt: FieldValue.serverTimestamp(), markedPaidBy: staff.uid }, { merge: true });
    if (invoice.activityId) await clientRef.collection("activity").doc(invoice.activityId).set({ paymentStatus: "paid", taskStatus: "completed", paidAt: FieldValue.serverTimestamp(), paidBy: "attorney" }, { merge: true });
    if (invoice.caseId && invoice.paymentKind === "classification_fees") await clientRef.collection("cases").doc(invoice.caseId).set({ classificationPaymentStatus: "paid", currentStage: "USPTO filing fees paid — preparing submission", progress: 58, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    const notice = { caseId: invoice.caseId || "", type: "payment_receipt", title: `Receipt — ${invoice.title || "Portal payment"}`, message: "Your attorney confirmed that this payment was received. No further payment action is required.", amount: Number(invoice.amount || 0), classificationFees:invoice.classificationFees||[], paymentStatus: "paid", taskStatus: "completed", read: false, createdBy: staff.uid, createdByName: staff.name, createdAt: FieldValue.serverTimestamp() };
    await clientRef.collection("activity").add(notice);
    await clientRef.collection("auditLog").add({ event:"payment_marked_paid_by_attorney", caseId:invoice.caseId||"", invoiceId:params.id, amount:Number(invoice.amount||0), paymentMethod:"attorney_confirmed", performedBy:staff.uid, performedByName:staff.name, performedByRole:staff.role, createdAt:FieldValue.serverTimestamp(), ...requestEvidence(request) });
    const client = clientSnapshot.data() || {};
    try { await sendPortalActivityEmail({ clientName: client.name, clientEmail: client.email, attorneyName: staff.name, ...notice }); } catch (error) { console.error("Paid confirmation email failed:", error?.message); }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Unable to mark this payment paid." }, { status: 500 }); }
}
