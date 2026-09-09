# Checkout release security review — 2026-09-08

## Status
Local remediation in progress; not a production security certification. Production branch and tracking configuration have not been changed by this remediation. Vercel billing is excluded at the owner's request.

## Addressed
- Updated Next.js 14.2.35 to 15.5.25 to leave the critical AVIF image-optimization advisory range (GHSA-2xp9-vwfh-vxw4). Updated matching ESLint config and compatible Cloudinary integration.
- Updated Nodemailer and Sharp; pinned Next's PostCSS dependency to 8.5.28. Refreshed compatible vulnerable transitive dependencies. Latest lockfile audit reports zero critical/high findings and ten moderate findings.
- Awaited the Next.js cookies API in portal authentication; authentication checks are unchanged.
- Restricted the optional vault retry to an explicit gateway error with no transaction ID. An unrecognized gateway response retains its charge reservation instead of being treated as a confirmed decline.
- Changed generic payment-network error wording to request support before another payment, avoiding an explicit unsafe retry instruction.
- Added a 20-second timeout to post-payment CRM submission. The existing confirmed-payment fallback still redirects to thank-you, without asking the customer to pay again.

## Remaining findings / limits
1. Moderate dependency findings remain in Firebase/Google Cloud transitive dependencies (including UUID) and body-parser/qs. Do not force-downgrade Firebase to satisfy npm audit; assess supported upstream upgrades separately.
2. Checkout charge reservations currently fail open if Firestore is unavailable (`lib/checkoutChargeLock.js`). Stronger idempotency requires a durable availability/reconciliation design; a token lock does not deduplicate a newly tokenized second attempt.
3. An approval with a missing gateway transaction ID is not currently reconciled to a gateway reference. Never synthesize a conversion ID or ask the customer to recharge for this condition.
4. Browser session storage is the handoff for purchase tracking. Storage failure, browser closure, or blockers may prevent a conversion event; this is not a server-side payment reconciliation system.
5. The receipt-email promise and slow post-charge provisioning need production-equivalent delivery testing. The new CRM timeout prevents indefinite browser loading but is not a durable queue.

## Release verification
Next.js 15.5.25 production build/lint passed. Production-mode mobile journey to payment, saved package on Back, four package viewport widths, absent demo button and no page errors passed with external services blocked and save-data mocked. Anonymous admin API returned 401; empty charge request was rejected. Actual gateway success/decline, email delivery and Google Ads attribution are not certified by these tests. Existing form URLs, `utils/tracking.js`, GTM-KJGHNHGM, AW-16565473053, Clarity ouge10k1z4 and gateway environment values remain unchanged.
