import crypto from "crypto";
import { FieldValue } from "firebase-admin/firestore";

const COLLECTION = "checkoutCharges";

// A Collect.js payment token is minted once per tokenization, so it uniquely
// identifies one intended purchase. Hashing keeps the raw token out of
// Firestore while still giving a stable document id.
function lockId(paymentToken) {
  return crypto.createHash("sha256").update(String(paymentToken)).digest("hex");
}

/**
 * Reserve a public-checkout charge before it is sent to the gateway.
 *
 * Returns:
 *   { ok: true, attemptId }            proceed with the sale
 *   { ok: false, duplicate: true, ... } another request already owns it
 *   { ok: false, unavailable: true }   no database; caller decides
 *
 * Without this a double-click (or a client retry after a slow response) sends
 * the same token twice and can charge the customer twice.
 */
export async function claimCheckoutCharge(db, paymentToken) {
  if (!db) return { ok: false, unavailable: true };

  const ref = db.collection(COLLECTION).doc(lockId(paymentToken));
  const attemptId = crypto.randomUUID();

  try {
    const outcome = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);

      if (snapshot.exists) {
        const current = snapshot.data() || {};
        // Completed: hand back the original result so a retry is a no-op.
        if (current.status === "completed") {
          return {
            ok: false,
            duplicate: true,
            completed: true,
            transactionId: current.transactionId || "",
            amount: Number(current.amount || 0),
          };
        }
        // Still in flight: a second click arrived mid-charge.
        if (current.status === "processing") {
          return { ok: false, duplicate: true, processing: true };
        }
        // "failed" falls through so a declined card can legitimately retry.
      }

      transaction.set(
        ref,
        {
          status: "processing",
          attemptId,
          startedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
      return { ok: true, attemptId };
    });

    return outcome;
  } catch (error) {
    console.error("claimCheckoutCharge failed:", error?.code, error?.message);
    // Never block a sale because the lock itself is unavailable.
    return { ok: false, unavailable: true };
  }
}

export async function completeCheckoutCharge(db, paymentToken, { transactionId, amount }) {
  if (!db) return;
  try {
    await db.collection(COLLECTION).doc(lockId(paymentToken)).set(
      {
        status: "completed",
        transactionId: transactionId || "",
        amount: Number(amount || 0),
        completedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("completeCheckoutCharge failed:", error?.code, error?.message);
  }
}

/**
 * Release the lock after a decline so the customer can correct their card and
 * try again with a fresh token.
 */
export async function releaseCheckoutCharge(db, paymentToken, declineReason = "") {
  if (!db) return;
  try {
    await db.collection(COLLECTION).doc(lockId(paymentToken)).set(
      {
        status: "failed",
        lastDeclineReason: String(declineReason).slice(0, 300),
        failedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("releaseCheckoutCharge failed:", error?.code, error?.message);
  }
}
