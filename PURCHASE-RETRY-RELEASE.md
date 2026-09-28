# Bounded Google purchase retries — September 28, 2026

## Scope

Website-only change based on production commit `55da8a9d7e25f2ad37f2eba47ba3ceec683d44c0`.
Previous Vercel production deployment: `6G83ZknYLQw9mmWZGCErZiizrMCJ`.
No GTM publish, campaign changes, payment processing changes, consent grants,
new conversion action, or historical order replay.

The existing `lto_purchase` event remains once per order (Google + Reddit).
Two additional Google-only `conversion` commands use the existing action
`AW-16565473053/RmqECOrQ97sbEJ2ehNs9`, identical transaction ID/value/currency,
and the existing Google tag/consent state. Timers are due at 2 and 5 seconds.
These are bounded redundant attempts, NOT delivery-confirmed retries.

## Guards and limitations

- Production code only; reject demo IDs, absent IDs, and non-positive/non-finite values.
- Retry ledger starts only for a fresh order with a valid payment timestamp
  within 24 hours. Already-flagged legacy orders are not replayed.
- Persist total attempts (maximum 3), value, currency, and timestamps in the
  browser. Refresh resumes only remaining attempts for up to 10 minutes.
- Use Web Locks where available to serialize attempts across same-origin tabs.
  Older browsers without Web Locks still have per-page guards and the shared
  persisted ledger, but simultaneous cross-tab races are not fully atomic.
- If storage is unavailable, keep the original event but do not enable retries;
  durable attempt limits cannot be enforced in that case.
- No new scripts, forced consent, unhashed customer data, callbacks interpreted
  as delivery receipts, or repeated shared Reddit events.
- Closing/navigating away from the document can prevent pending timers. Ad
  blockers and consent restrictions may block all attempts. This does not
  guarantee Google acceptance, attribution, or campaign reporting.
- Reconcile missing paid orders through the existing recovery Sheet. This
  release does not automate Sheet population or create a server-side queue.

## Verification

`node --test scripts/test-purchase-retries.cjs` exercises the actual tracking
module in a fake-browser VM with no network, real tags, or customer data.
Tests cover attempt timing/caps, refresh, frozen values, legacy orders, separate
orders, expiry, invalid inputs, development, blocked storage, unloaded gtag,
tag exceptions, and missing original flags. Run targeted lint and production
build before release. Do not test by replaying a real paid thank-you session.

## Rollback

Revert this release's tracking/thank-you changes through a new commit, or use
the previous Vercel deployment above for an immediate full-deployment rollback.
Do not clear customer browser storage or bulk replay old purchases.
