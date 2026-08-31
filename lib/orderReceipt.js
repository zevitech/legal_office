/**
 * Server-side receipt dispatch.
 *
 * The receipt used to be sent from a browser useEffect guarded by localStorage,
 * which could fire more than once (re-render, reload, restored tab). Customers
 * received duplicate receipts, and because the amount was recalculated in the
 * client each time, the copies disagreed with each other.
 *
 * Sending from the charge route — after the idempotency claim — means one
 * receipt per payment, carrying the figures actually charged.
 */
export async function sendOrderReceipt({
  req,
  email,
  name,
  transactionId,
  packageName,
  packagePrice,
  addonLines = [],
  totalPrice,
}) {
  if (!email) return;

  const [firstName, ...rest] = String(name || "").trim().split(/\s+/);
  const origin = new URL(req.url).origin;

  // The receipt template reads this nested shape; keep it in sync with
  // app/api/send-receipt/route.js.
  const payload = {
    packagePrice: Number(packagePrice || 0),
    addonLines,
    totalPrice: Number(totalPrice || 0),
    today: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    nestedLeadData: {
      stepOne: {
        firstName: firstName || "",
        lastName: rest.join(" "),
        emailAddress: email,
      },
      stepThree: { packageName, price: Number(packagePrice || 0) },
      stepFour: { receipt_ID: transactionId },
    },
  };

  const response = await fetch(`${origin}/api/send-receipt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`send-receipt responded ${response.status}`);
  }
}
