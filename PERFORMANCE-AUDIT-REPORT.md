# Performance review — September 8, 2026

## Mobile font-loading follow-up

The inline-CSS experiment was rejected and is not enabled. The font change preserves all 24 original Poppins font binaries, weights, Unicode subsets and fallback metrics. Four UI weights are preloaded instead of all eight, using early high-priority resource hints; other weights remain available on demand. Hashed font URLs use immutable caching and include the original OFL license.

Local 390/1440px tests: font transfer 62,236 → 31,480 bytes; headings, sizes, colors, geometry and navigation match, no overflow/errors. Local throttled LCP was not improved (about 1.5s → 1.8s), so a production PageSpeed check is required before claiming a mobile speed gain. Root advertising/Clarity blocks and payment/thank-you/tracking source are unchanged. No real payment or lead was submitted. Scripts: test-mobile-render.cjs and test-lead-performance.cjs.

Status: deployed as cbf5ea8; Vercel Ready / Production Current confirmed September 8, 2026. Baseline production commit: b9870d8.

## Post-deployment results

Deployment: EneaqbGVeNqjjmDjRQWuFAVHAZXR, production www.legaltrademarkoffice.com.

| Page | Device | Before → after score | New FCP | New LCP | New TBT | New CLS |
|---|---|---|---|---|---|---|
| Landing | Mobile | 66 → 53 | 3.5s | 8.4s | 440ms | 0 |
| Landing | Desktop | 84 → 96 | 0.3s | 0.6s | 170ms | 0.017 |
| Form | Mobile | 66 → 62 | 2.8s | 7.3s | 380ms | 0 |
| Form | Desktop | 56 → 78 | 0.7s | 2.7s | 200ms | 0.017 |

Fresh reports:
- https://pagespeed.web.dev/analysis/https-www-legaltrademarkoffice-com-trademark-registration/lbs8m7fwr4
- https://pagespeed.web.dev/analysis/https-www-legaltrademarkoffice-com-trademark-register/guao4o5l74

These are single lab runs. Desktop scores improved; mobile scores did NOT improve. LP mobile LCP remained the hero heading, with render delay. Do not claim mobile performance resolved. LiveChat check_goals still returned HTTP422 in the new report. It needs vendor-side investigation rather than hiding the error. No paid transaction was performed.

Public production LP checks passed at 390px and 1440px: no overflow or runtime errors, unchanged headings/sections/review text, reviews load on approach and next arrow advances. External advertising and API requests were blocked in those interaction checks. Protected layout/tracking/payment/thank-you/NMI/package files remain unchanged against b9870d8.

## Observed production reports (before these changes)

| Page | Device | Lighthouse performance | FCP | LCP | TBT | CLS |
|---|---|---:|---:|---:|---:|---:|
| Landing | Mobile | 66 | 1.2s | 3.0s | 1770ms | 0 |
| Landing | Desktop | 84 | 0.3s | 0.6s | 360ms | 0.017 |
| Form entry | Mobile | 66 | 3.1s | 5.6s | 290ms | 0 |
| Form entry | Desktop | 56 | 0.8s | 3.1s | 700ms | 0.017 |

Sources:
- https://pagespeed.web.dev/analysis/https-www-legaltrademarkoffice-com-trademark-registration/yox6kfbjc9
- https://pagespeed.web.dev/analysis/https-www-legaltrademarkoffice-com-trademark-register/3h0zw8ihnz

These are individual lab runs, not measured checkout response times. Mobile real-user data was unavailable. Desktop showed origin-level 28-day data: LCP 1.6s, INP 103ms, CLS 0.12 (assessment failed because of layout shifts). This is not page-specific proof or an immediate reflection of today's release.

The desktop form LCP element is LiveChat's late-loading `Chat now` eye-catcher image. It is not the owner form itself. Form SEO deductions include intentional noindex; do not remove this to improve a score.

## Implemented without changing visible UI/content or advertising tags

1. `/api/save-data` previously awaited Firestore, SMTP, CRM and Zoho serially before allowing navigation. Successful durable saves now acknowledge before notifications, using supported Next.js `after()` and a 60-second function duration. Captcha still precedes persistence and no lead event moves before the successful response.
2. Firestore atomically records pending handoffs with each save. Completion is tracked by step and attempt so delayed callbacks cannot clear a newer pending request. Failed/pending handoffs remain queryable through `needsRetry`. This is recoverability, not an automatic retry worker.
3. If Firestore is unavailable, synchronous delivery is retained; total persistence/delivery failure returns 503 instead of falsely reporting success. The fast path therefore requires working Firestore configuration.
4. Prefetch classification when owner details opens. The route and form state are unchanged.
5. Cache static country/state lookups rather than rebuilding reference lists on every keystroke.
6. Correct two LiveChat bootstrap typos to the vendor's documented `_h` and `__lc.asyncInit`. License, initialization strategy, widget placement and configuration remain unchanged.

Reference: https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package (Next `after` lifecycle support); https://platform.text.com/docs/extending-chat-widget/javascript-api/v4.0 (canonical snippet).

## Verification

- Next 15.5.25 production build: pass, including lint/type validation and 92 static pages.
- `node scripts/test-lead-performance.cjs`: pass. Mocked serial 250ms SMTP + 250ms CRM waits: baseline response ~574ms; new response ~22ms after mocked persistence. Not a live speed measurement.
- Tests cover deferred delivery, unchanged email/CRM payload, failed-save fallback, total delivery failure, captcha rejection, per-step pending state, stale callbacks, and LiveChat pre/post-load dispatch.
- `scripts/test-performance-ui.cjs`: isolated production preview, external requests blocked, save API mocked. 390px and 1440px: owner-to-classification navigation 210ms and 1231ms respectively, one `lto_qualified_lead` event, no horizontal overflow or page errors, navigation through package selection passed.
- Protected-file diff against production: zero for root layout/tag setup, tracking utility, payment, thank-you, NMI API, landing page and package component.
- No real lead, email, CRM write, payment or advertising conversion was submitted by these tests.

## Still unresolved / deployment checks

## Landing-page follow-up

- The client-only reviews carousel now requests its engine when the section approaches within 1200px of the viewport. All existing sections, headings, reviews, packages and styles are retained; no advertising/analytics script is deferred or removed.
- Isolated production-mode comparison, third-party requests blocked equally: initial first-party JavaScript transfer fell from 254,292 to 219,808 bytes (13.6%) and 34 to 31 JS requests at both 390px and 1440px. This is a transfer reduction, not a new public Lighthouse score or a reliable measured LCP improvement.
- Existing mobile arrow binding failed in both baseline and first optimized tests. Direct Swiper instance navigation replaces the ref-based Navigation binding without changing review text/styles. Arrow accessible labels were added.
- Test script: `scripts/test-lp-loading.cjs`. Baseline port 3006, candidate port 3007; override with LP_BASE/LP_UPDATED. Playwright and Chrome paths are provided via environment variables. Tests block nonlocal requests and all API submissions.

## Remaining checks

- PSI reported HTTP422 from LiveChat `check_goals`. A fresh public-page observation did not reproduce that request/error. Bootstrap corrections are not proof this vendor-side error is fixed. Recheck after deployment; if it remains, inspect LiveChat goal configuration/vendor diagnostics. Do not suppress errors or disable the widget to hide it.
- Post-change production PSI scores are recorded above. The backend change targets submit latency, not the Lighthouse page-load score.
- Google, Reddit, Clarity and chat scripts contribute materially to main-thread work. Their timing/configuration was deliberately preserved.
- Existing visual/accessibility findings (contrast, heading order and landing button names) were not redesigned under the no-UI/content-change constraint.
- Confirm production Firestore writes and pending/completed handoff markers with the next genuine submission. Check notification delivery and conversion diagnostics without inventing a paid order.
- Notifications may finish after navigation. Preserve step labels when reviewing their arrival order. `after()` is bounded by function duration and is not a durable job scheduler; pending records identify interrupted work.
- Deploy only the scoped source/test changes; exclude unrelated local PDFs/screenshots. Recheck mobile/desktop PSI and real submit timings after release. Do not change tracking IDs, labels, event names or payment endpoints.
