import { FieldValue } from "firebase-admin/firestore";
import { randomUUID } from "node:crypto";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

const COLLECTION = "leads";

/**
 * A lead is identified by the customer_ID minted in Step 1 and carried through
 * every later step, so each visitor gets ONE document that fills in as they
 * progress rather than four disconnected records.
 */
function leadId(data) {
  const id = String(data?.customer_ID || "").trim();
  if (id) return `lead-${id.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const email = String(data?.emailAddress || "")
    .trim()
    .toLowerCase();
  if (email) return `email-${email.replace(/[^a-z0-9]/g, "-").slice(0, 120)}`;
  return null;
}

// Never persist the captcha token — it is single-use and worthless afterwards.
function stripTransient({ reChaptcha, ...rest }) {
  return rest;
}

/**
 * Write the lead to Firestore BEFORE any email or webhook is attempted.
 *
 * The email and CRM calls are best-effort: Gmail throttles (free tier is ~500
 * a day and flags bulk sending) and webhooks time out. Without this write a
 * throttled send meant a paid click vanished with no record and no way to
 * recover it. Firestore is now the source of truth; email and CRM are
 * notifications on top of it.
 */
export async function saveLead(data) {
  const db = getAdminFirestore();
  if (!db) return { saved: false, reason: "firestore-unconfigured" };

  const id = leadId(data);
  if (!id) return { saved: false, reason: "no-identifier" };

  const step = Number(data?.zoho_step || 1);
  const attempt = randomUUID();

  try {
    const ref = db.collection(COLLECTION).doc(id);

    // One transaction so createdAt is stamped only on first write and
    // furthestStep never walks backwards when a step is re-submitted.
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      const existing = snapshot.data() || {};
      const furthest = Math.max(Number(existing.furthestStep || 0), step);

      transaction.set(
        ref,
        {
          ...stripTransient(data),
          customerId: String(data?.customer_ID || ""),
          email: String(data?.emailAddress || "")
            .trim()
            .toLowerCase(),
          lastStep: step,
          furthestStep: furthest,
          isPaid: Boolean(data?.is_paid) || Boolean(existing.isPaid),
          deliveryByStep: {
            ...existing.deliveryByStep,
            [step]: { attempt, pending: true },
          },
          needsRetry: true,
          updatedAt: FieldValue.serverTimestamp(),
          ...(snapshot.exists
            ? {}
            : { createdAt: FieldValue.serverTimestamp() }),
        },
        { merge: true },
      );
    });

    return { saved: true, id, step, attempt };
  } catch (error) {
    console.error("saveLead failed:", error?.code, error?.message);
    return { saved: false, reason: error?.code || "write-failed" };
  }
}

/**
 * Record whether the email and CRM handoffs succeeded, so failed deliveries can
 * be found and replayed later instead of being lost in the logs.
 */
export async function recordLeadDelivery(
  id,
  { emailSent, crmSent, emailError, crmError, zohoSent = true, zohoError, step, attempt },
) {
  const db = getAdminFirestore();
  if (!db || !id) return;
  try {
    const ref = db.collection(COLLECTION).doc(id);
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      const existing = snapshot.data() || {};
      // A late callback must not clear a newer submission's pending marker.
      if (existing.deliveryByStep?.[step]?.attempt !== attempt) return;
      const delivery = {
        emailSent: Boolean(emailSent),
        crmSent: Boolean(crmSent),
        zohoSent: Boolean(zohoSent),
        ...(emailError ? { emailError: String(emailError).slice(0, 300) } : {}),
        ...(crmError ? { crmError: String(crmError).slice(0, 300) } : {}),
        ...(zohoError ? { zohoError: String(zohoError).slice(0, 300) } : {}),
        checkedAt: FieldValue.serverTimestamp(),
      };
      const deliveryByStep = {
        ...existing.deliveryByStep,
        [step]: { ...delivery, attempt, pending: false },
      };
      transaction.set(ref, {
        delivery,
        deliveryByStep,
        needsRetry: Object.values(deliveryByStep).some(
          (item) => item.pending || !item.emailSent || !item.crmSent || item.zohoSent === false,
        ),
      }, { merge: true });
    });
  } catch (error) {
    console.error("recordLeadDelivery failed:", error?.code, error?.message);
  }
}
