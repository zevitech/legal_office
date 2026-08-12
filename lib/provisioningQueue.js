import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "provisioningFailures";

/**
 * Record a portal account that could not be created after a SUCCESSFUL charge.
 *
 * The customer has paid. Previously this failure was only written to the
 * console, so nobody knew the account was missing until the customer complained.
 * Persisting it makes the backlog queryable (status == "pending") and gives
 * staff everything needed to finish provisioning by hand.
 */
export async function recordProvisioningFailure(db, { transactionId, email, name, company, phone, markName, markType, packageName, orderTotal, applicationDetails, billingProfile, error }) {
  if (!db || !transactionId) return;
  try {
    await db.collection(COLLECTION).doc(transactionId).set(
      {
        status: "pending",
        transactionId,
        email: String(email || "").trim().toLowerCase(),
        name: name || "",
        company: company || "",
        phone: phone || "",
        markName: markName || "",
        markType: markType || "",
        packageName: packageName || "",
        orderTotal: Number(orderTotal || 0),
        applicationDetails: applicationDetails || {},
        billingProfile: billingProfile || {},
        lastError: String(error || "").slice(0, 500),
        attempts: FieldValue.increment(1),
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch (writeError) {
    console.error("recordProvisioningFailure failed:", writeError?.code, writeError?.message);
  }
}

/**
 * Clear the entry once the account exists, so the pending queue only ever
 * contains work that still needs doing.
 */
export async function clearProvisioningFailure(db, transactionId) {
  if (!db || !transactionId) return;
  try {
    const ref = db.collection(COLLECTION).doc(transactionId);
    const snapshot = await ref.get();
    if (!snapshot.exists) return;
    await ref.set(
      { status: "resolved", resolvedAt: FieldValue.serverTimestamp() },
      { merge: true },
    );
  } catch (error) {
    console.error("clearProvisioningFailure failed:", error?.code, error?.message);
  }
}
