# Form release review - September 8, 2026

## Deployment status
Not deployed. Base repository HEAD verified against origin and Vercel production: f1e282d316adee26938e8b9d90d06434aff0dd65. Existing project: danishs-projects-29ca5462/legaltrademarkoffice, domain legaltrademarkoffice.com, production branch main. Rollback deployment: E5ubLvpX1fbv6XZg5hMWWtoGsoN8. Do not replace production environment variables with local preview values. Hosting dashboard reports overdue billing/payment failure; owner notified.

## Passed locally
- Final rerun: production build all 102 pages; full lint; 20 route/viewport checks at 320, 390, 768 and 1440 pixels without overflow or page errors; complete 390px synthetic walkthrough.
- Production guards explicitly disable payment bypass and classification preview. Receipt includes XTARLABS LLC descriptor and invoice-style line items; PDF visually verified.
- Full-project ESLint; diff whitespace check.
- Isolated production build passed: all 102 static pages generated. Uses no production secrets; not a payment-integration certification.
- Fictitious customer walkthrough: mark name, use/not-yet toggles, first-use date field visibility, owner contact details, classification description, default Business Plus, payment, demo confirmation.
- No horizontal overflow on all form routes at 375, 390, 768 and 1440px.
- All four package choices navigate to checkout and restore on return.
- Server price aliases and included-add-on filtering tested.
- Website-interest selection survives package change without adding cost; email template now includes the interest field.
- Mobile payment shortcut moves focus to billing.
- Demo activation makes no activation request. Local checkout does not tokenize or charge.
- Downloaded native-text PDF receipt rendered for inspection. Decimal totals formatted; missing historical date is not invented. New browser-confirmed payments retain a timestamp.

## Preservation
- Form route files and next.config redirects unchanged.
- utils/tracking.js unchanged. Existing GTM-KJGHNHGM, AW-16565473053 and Clarity ouge10k1z4 retained in production layout; disabled only in development.
- Gateway endpoint and tokenization integration retained. Payment changes include package aliases and exclusion of already-included add-ons from totals/receipt lines.

## Release gates still required
- Confirm correct Vercel project, production domain, deployment revision and rollback version.
- Confirm build and runtime in the actual deployment environment (isolated local production build passed).
- Hosted card fields in gateway test environment; success, decline, retry/idempotency, portal provisioning and email delivery.
- Real Tag Assistant verification of lead, begin-checkout and purchase destinations, values and transaction IDs; no synthetic live conversions.
- Upload integration tests for logo/sound using production-equivalent Cloudinary configuration.
- Address autocomplete, non-US/company ownership and all validation edge cases.
- Production submission latency under SMTP/CRM delays. 20-second browser timeouts bound form waits but are not a durable background delivery queue. Never silently drop server acknowledgement for speed.
- Test website-interest visibility in admin and delivered email.

Do not represent these local smoke tests as exhaustive production certification.
