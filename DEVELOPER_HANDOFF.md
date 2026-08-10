# Legal Trademark Office — Developer Handoff

Release audit updated: 2026-08-08

This package contains the public website, trademark-registration funnel,
payment/receipt flow, client portal, attorney portal, legal pages, portal email
templates, Firebase persistence, private document handling, and Google Ads/GTM
events. It does not include production secrets, local build output, Git history,
or installed dependencies.

## Release verification

- `npm run lint`: passes with no warnings or errors after the 2026-08-08 audit.
- The previous release build passed with all 61 static pages. Run a fresh clean
  production build in CI before deployment; it was intentionally not run while
  the active local Next.js development server was using the same `.next` tree.
- Client and attorney portal sections were tested in desktop and mobile layouts.
- The thank-you page prioritizes secure portal activation and keeps the receipt
  as an optional download.
- Portal tours are separate for clients and attorneys.
- Mutating portal APIs verify the request origin, authenticated session, and
  staff/client role as appropriate.
- Wildcard API CORS headers and customer-email debug logging were removed.
- Safe non-breaking dependency security updates were applied.
- The trademark roadmap is server-enforced in sequence: application received,
  attorney call, clearance report, exact class-fee payment, USPTO filing,
  examination, and registration.
- Portal inactivity protection, keyboard-accessible guided tours, visible focus
  states, click-safe mobile controls, anti-framing/no-store headers, upload file
  signature validation, and atomic duplicate-charge protection are included.

## Install and deploy

1. Use a supported Node.js LTS release and run `npm ci`.
2. Copy every key from `.env.example` into the deployment platform. Supply real
   values in the platform's encrypted environment-variable settings. Never
   upload `.env`, `.env.local`, a service-account JSON file, or gateway keys.
3. Keep `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false` and
   `NEXT_PUBLIC_DISABLE_CAPTCHA=false` in production.
4. Run `npm run lint` and `npm run build` in CI.
5. Deploy behind HTTPS using `https://www.legaltrademarkoffice.com` as both
   `NEXT_PUBLIC_APP_URL` and the application's canonical URL.
6. Complete every launch-gate test near the end of this guide before enabling
   Google Ads or inviting real clients.

## Primary routes

### Public and checkout

- `/trademark-registration` — advertising landing page
- `/trademark-register` — trademark and owner information
- `/trademark-register/step-2` — business activities/classification intake
- `/trademark-register/step-3` — package selection
- `/trademark-register/step-4` — add-ons/review
- `/trademark-register/payment` — tokenized payment
- `/trademark-register/thank-you` — confirmation, receipt, portal activation
- `/legal/terms`, `/legal/privacy`, `/legal/refund-policy`, `/legal/compliance`

### Client portal

- `/portal-login`, `/portal/forgot-password`, `/portal/set-password`
- `/client-portal` — cases, tasks, documents, notifications, appointments,
  billing, invoices, services, referrals, roadmap, and guided tour
- `/client-portal/amendment` — amendment request
- `/client-portal/existing-trademark` — request management of an existing mark
- `/client-portal/domains` — domain search/request flow
- `/client-portal/llc` — LLC service flow

### Attorney portal

- `/portal-admin/login`
- `/portal-admin` — clients, cases, tasks, payments, records/evidence,
  notifications, status actions, appointment controls, and guided tour
- `/portal-admin/invite` — create/invite a client with one or more trademarks
- `/portal-admin/team` — add and manage attorneys

## Checkout-to-portal onboarding

1. NMI receives tokenized card data. Raw PAN or CVV must never reach this app's
   database, logs, email, or analytics.
2. The server recalculates the order total; never trust a browser total.
3. After an approved transaction, the order is recorded and the receipt email
   is sent once.
4. `provisionPortalClient` creates a Firebase user or locates the existing user
   by normalized email. A returning client receives the new trademark in the
   same portal rather than a duplicate account.
5. A new client receives a time-limited, single-use password-creation link.
   Passwords are never generated, stored, displayed, or emailed by staff.
6. The thank-you page highlights portal activation. Existing clients are sent
   to normal portal sign-in.

Provisioning failure must not reverse an approved card transaction. Log and
alert the failure internally, then allow staff to resend the invitation from the
attorney portal.

## Authentication and authorization

- Firebase Authentication handles email/password identity.
- The server exchanges a valid Firebase ID token for a five-day HTTP-only,
  Secure, SameSite session cookie.
- Every protected server route must call the portal authentication helper.
- Client reads/writes must be scoped to the authenticated Firebase `uid`.
- Attorney/admin actions require the appropriate custom role.
- Attorneys should use MFA before real-client launch.
- Sign-out routes remain separate: client logout returns to `/portal-login`;
  staff logout returns to `/portal-admin/login`.

See `docs/client-portal-authentication.md` for Firebase setup.

## Client portal functionality

- Dashboard and clickable notifications with urgent-task prompts
- Multiple trademarks/cases per account
- Case roadmap, serial number, filing details, attorney assignment, and status
- Locked future roadmap stages; clients see only completed/current evidence
- Filing automatically moves the client roadmap to `Filed with USPTO`, exposes
  the 8-digit serial number and receipt, and sends the filing congratulations
  notice with correct ™/® guidance
- Attorney-pushed requirements only after classification fees are paid; neither
  automation nor staff can create pre-payment client tasks/doc requests
- Tasks for specimen, declaration, attestation, publication, Section filings,
  office actions, payments, and custom requests
- Secure PDF/image uploads and private downloads
- Attorney-prepared clearance report and filing-document downloads
- Registration-certificate download after registration
- Google Meet or phone appointments and portal messages
- Billing profile, tokenized saved-card summary, invoices, receipts, and payment
  requests without exposing the gateway/provider name
- Business-service detail cards and consultation requests
- New trademark, existing-trademark transfer, amendment, LLC, domain, logo,
  specimen, web, marketing, CRM, tax/accounting, and other service requests
- Referral voucher experience
- Client-specific guided tour

## Attorney portal functionality

- Search/filter clients and open the selected client's case workspace
- Invite one client with multiple trademark matters
- View/edit client and trademark details
- Assign an attorney to a client/case
- Push, edit, complete, or remove client requirements after class-fee payment
- Use requirement templates or personalized messages/emails
- Request documents, send portal messages, and schedule/edit/reschedule/cancel
  calls; the appointment remains editable from the case workspace
- Upload a manually prepared search-and-clearance report during a scheduled
  portal call or immediately after an unscheduled phone consultation;
  publishing the report automatically completes the call stage
- Set exact recommended classes in the report. The class count is derived from
  one non-empty class per line and cannot diverge from the roadmap or invoice
- Request one itemized fee per report class. The list is locked to the report;
  payment may be made in the portal or marked paid after an on-call payment
- Record filing details, serial number, filing PDF, status, office actions, and
  registration certificate
- An office-action update requires the attorney to enter the exact response
  deadline printed on the USPTO notice. The client receives the deadline and a
  required-call alert; the portal does not calculate or guess legal deadlines.
- Create itemized invoices, request payment, charge a saved method only with
  documented authorization, or mark an offline/on-call payment paid with notes
- Review invoice history, business records, documents, consent evidence, and
  chargeback-support records
- Receive staff notifications when clients send messages, files, or updates
- Attorney-specific guided tour

## Payments, saved cards, and evidence

- Store only gateway tokens plus card brand, last four digits, expiration
  display data when provided, token status, and gateway/customer reference.
- Never store full card number, magnetic-stripe data, PIN data, or CVV—even if
  encrypted. PCI tokenization is mandatory.
- Every portal charge must use a server-created invoice with itemized reason,
  amount, currency, case, client, and unique transaction/idempotency reference.
- Class fees are dynamic per class and should be requested only after the
  attorney uploads/completes the clearance report and confirms classes.
- Filing is rejected until the classification invoice is paid. Recording a
  valid filing date, official PDF, and 8-digit serial number advances the client
  roadmap automatically; generic status actions cannot bypass this gate.
- Saved-method charges require recorded consent. A call recording or signed
  consent document can be attached as evidence where lawful; confirm recording
  consent rules for every applicable jurisdiction.
- Every successful charge generates a client-visible invoice/receipt and an
  email. Record failed attempts without exposing gateway secrets.
- The merchant descriptor/payment receiver must be disclosed accurately in the
  checkout terms and receipt. Do not make misleading refund or chargeback
  claims. Have qualified counsel approve refund language and consent design.

Phase-3 billing requirements (webhooks, refunds, voids, retry/idempotency,
accounting export) are documented in `docs/PORTAL_PHASE_3.md`.

## Documents and storage

- Client upload types: PDF, PNG, JPEG, and WebP; maximum 15 MB.
- Filing documents, clearance reports, and certificates: PDF; maximum 15 MB.
- Consent evidence: PDF/audio; maximum 100 MB.
- Documents must remain private with authenticated download routes or short-
  lived signed URLs. Responses use private/no-store caching.
- Add malware scanning, file versioning, retention rules, and backup/restore
  before high-volume use.

## Email notifications

Configure SMTP/support/billing variables from `.env.example`. Verify these
messages in production:

- checkout/receipt confirmation
- new portal invitation/password setup
- new requirement/task
- document or message update
- appointment creation/change
- payment request, payment receipt, and failed-payment notice
- filing/status/serial-number update
- office action and registration-certificate availability

Use a queue/retry provider for volume. Email failures must not duplicate a
payment or portal action.

## Google Ads and GTM

The website uses only `GTM-KJGHNHGM`. Do not add a second hard-coded Google Ads
tag. Follow `docs/google-ads-gtm-funnel.md`.

- `lto_purchase`: primary conversion
- `lto_qualified_lead`: secondary conversion
- `lto_begin_checkout`: secondary conversion
- supporting funnel events: GA4/observation

Purchase must include unique `transaction_id`, `value`, and `currency` and fire
only after an approved payment. Enhanced-conversion fields use normalized,
SHA-256 hashed email/phone values. Never send legal answers, uploads, addresses,
or card details to advertising platforms.

## Google address suggestions

Enable Maps JavaScript API and Places API. Restrict the browser key to the live
domain and approved preview domains, and restrict it to those APIs. Set
`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`. Manual address entry remains available if
Places is unavailable.

## Optional integrations

- `CRM_INGEST_URL`/`CRM_INGEST_API_KEY`: guarded server-to-server lead delivery
- `ZOHO_LEAD_ENDPOINT`: server-only full endpoint; keep `DISABLE_ZOHO=true`
  unless the replacement credential has been rotated and verified
- OpenAI portal recommendations: disabled by default; uses safe rule-based
  recommendations without an API key. If enabled, enforce provider-side spend
  limits and do not send privileged legal content or full client files.
- Domain search: configure the production domain-provider integration and rate
  limits before representing availability or registration as final.

## Capacity and operations

The current queries have explicit limits suitable for hundreds of clients, but
production scale still requires:

- Firestore indexes for case/status/attorney/date filters
- pagination instead of increasing collection limits
- background email and document-processing queues
- gateway webhook processing and idempotency storage
- error monitoring, uptime alerts, structured audit logs, and daily backups
- workload and deadline dashboards for attorneys
- retention/deletion policy and incident-response procedure

## Dependency security note

Safe non-breaking updates were applied before packaging. `npm audit` still
reports advisories in the legacy Next.js 14/PostCSS chain and a Firebase Admin
transitive UUID dependency. npm's automatic remediation requires breaking major
upgrades (Next.js 16 and Firebase Admin 14). Do not run `npm audit fix --force`
on the production branch. Migrate and regression-test those upgrades in a
separate branch, with special attention to middleware, authentication, payment,
email, image handling, and App Router behavior. If launching before migration,
use a managed patched platform/WAF and obtain a security review.

## Production launch gate

Do not enable ads or real-client invitations until all items pass:

1. Rotate every credential that has ever appeared in source, chat, logs, or a
   shared ZIP. Add only new values to the deployment platform.
2. Firebase authorized domains, email/password sign-in, service account, roles,
   storage rules, and MFA for staff are configured.
3. One approved low-value NMI test returns a unique transaction ID; one decline
   does not create a paid order; refresh does not duplicate a charge.
4. New checkout creates one portal account and one invitation email. Returning
   checkout adds a trademark to the existing portal.
5. Client and attorney login/logout, password setup/reset, role separation, and
   unauthorized API access are tested.
6. Before class-fee payment, attorney and API task/document actions are blocked.
   After payment, attorney pushes/removes a task; the client receives a clickable
   notification/email and can upload or respond; the attorney reviews the
   response and is the only role that closes the legal requirement.
7. Schedule and edit the attorney call, and separately test an unscheduled phone
   consultation followed by a report upload. Verify the report's exact class
   count on roadmap and invoice; record portal or on-call payment; verify filing
   unlocks only afterward.
8. Record a filing PDF, date, and serial number; confirm the client roadmap,
   congratulations notice/email, ™ guidance, serial number, and receipt update
   automatically. Then test examination, an office action with the exact notice
   deadline and required-call alert, publication, and registration certificate.
9. All uploads are private and inaccessible to another client.
10. GTM/Tag Assistant confirms each funnel event once and Purchase only after
   approval.
11. Terms, privacy, refund, consent, descriptor, attorney-role wording, and call
   recording practices receive legal/compliance review.
12. Desktop plus real iPhone/Android testing passes; no horizontal overflow or
   blocked controls.
13. Monitoring, backups, support ownership, and rollback instructions exist.

## Known performance follow-up

The registration entry route currently has a large first-load bundle because it
contains the full interactive form stack. The build passes, but the developer
should profile and dynamically load nonessential form/media modules before a
high-budget advertising launch. Preserve conversion event order when splitting
the bundle.

## Handoff boundaries

- This release ZIP is source code, configuration templates, and documentation.
- It intentionally excludes `.env*` values, `.next`, `node_modules`, Git data,
  logs, screenshots, local test artifacts, and previous archives.
- No production deployment or live data migration is performed by this handoff.
