import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";

export async function claimInvoicePayment(db, invoiceRef, { actorUid, source }) {
  const attemptId = crypto.randomUUID();
  try {
    const invoice = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(invoiceRef);
      if (!snapshot.exists) throw Object.assign(new Error("Payment request not found."), { status: 404 });
      const current = snapshot.data() || {};
      if (current.status === "paid") throw Object.assign(new Error("This invoice was already paid."), { status: 409 });
      if (["processing", "payment_review_required"].includes(current.status)) throw Object.assign(new Error("This payment is already processing or awaiting payment reconciliation. Do not submit it again."), { status: 409 });
      transaction.set(invoiceRef, { status:"processing", processingAttemptId:attemptId, processingSource:source, processingActorUid:actorUid, processingStartedAt:FieldValue.serverTimestamp() }, { merge:true });
      return current;
    });
    return { ok:true, attemptId, invoice };
  } catch (error) {
    return { ok:false, status:error?.status || 500, error:error?.message || "Unable to reserve this invoice for payment." };
  }
}

async function transition(db, invoiceRef, attemptId, values) {
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(invoiceRef);
    if (!snapshot.exists || snapshot.data()?.processingAttemptId !== attemptId) throw new Error("Payment attempt no longer owns this invoice.");
    transaction.set(invoiceRef, { ...values, processingCompletedAt:FieldValue.serverTimestamp() }, { merge:true });
  });
}

export function completeInvoicePayment(db, invoiceRef, attemptId, values) {
  return transition(db, invoiceRef, attemptId, { ...values, status:"paid" });
}

export function releaseDeclinedInvoice(db, invoiceRef, attemptId, declineReason="") {
  return transition(db, invoiceRef, attemptId, { status:"due", lastDeclineReason:String(declineReason).slice(0,300), lastDeclinedAt:FieldValue.serverTimestamp(), processingAttemptId:FieldValue.delete(), processingSource:FieldValue.delete(), processingActorUid:FieldValue.delete() });
}

export function holdInvoiceForReview(db, invoiceRef, attemptId, reason="") {
  return transition(db, invoiceRef, attemptId, { status:"payment_review_required", reconciliationReason:String(reason).slice(0,500), reconciliationRequestedAt:FieldValue.serverTimestamp() });
}
