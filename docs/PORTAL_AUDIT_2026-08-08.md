# Portal audit — 2026-08-08

## Outcome

The client and attorney portals completed a focused code, workflow, UI, UX,
responsive, accessibility, content, and security review. Local preview routes
and the primary attorney/client interactions passed browser regression checks,
and `npm run lint` passes without warnings or errors.

This is an engineering audit, not a legal opinion, PCI certification,
penetration test, accessibility certification, or guarantee of production
availability. The production launch gate in `DEVELOPER_HANDOFF.md` remains
mandatory.

## Routes and interfaces reviewed

- Attorney dashboard, notifications, active clients, open cases, tasks, calls,
  case search, team/profile, invitation, and guided tour
- Every case workspace: client action, secure messages, case details, tasks and
  files, payments, records and evidence, and the attorney-controlled roadmap
- Client overview, trademarks and roadmap, notifications, tasks/documents,
  appointments, secure messages, billing, business services, and guided tour
- Portal login, password setup/reset, amendment request, existing-trademark
  request, LLC service, and domain service routes
- Fresh demo-client creation, multiple matters under one portal account, four
  service packages, and attorney assignment

## Workflow verification

The legal-matter sequence is enforced by both the interface and server routes:

1. Application received
2. Mandatory attorney consultation
3. Attorney-prepared search and clearance report with exact proposed classes
4. Itemized class/filing fee request and payment
5. USPTO filing PDF, date, and eight-digit serial number
6. Examination, office-action, and publication updates
7. Official registration certificate

An attorney may schedule the consultation in the portal or upload the completed
report immediately after a real unscheduled phone consultation. Uploading the
report satisfies the consultation milestone; it does not create a fake
appointment. Client tasks, document requirements, and promotions remain blocked
until the exact classification fees are paid. Filing remains blocked until
payment is recorded.

Office-action updates require the attorney to enter the exact response deadline
printed on the USPTO notice. The client receives that deadline and a mandatory
call request. The application does not infer a legal deadline.

## Improvements implemented

### Security and data handling

- Added allowlisted upload types, size limits, extension/MIME checks, and actual
  PDF/image/audio file-signature verification.
- Kept uploaded documents private and linked client submissions to the exact
  requested task for attorney review.
- Added a 30-minute inactivity timeout for authenticated portals with a visible
  five-minute warning and separate client/staff sign-out destinations.
- Added anti-framing, no-store, MIME-sniffing, referrer, permissions, and
  production HSTS response headers to portal and authentication routes.
- Added atomic invoice payment claims so simultaneous clicks cannot submit the
  same saved-method charge twice. Unknown gateway results enter a review state
  and are not automatically retried.
- Existing clients who buy or receive another trademark matter keep their
  current account and password; only new clients receive a one-time setup link.

### Client experience

- Legal tasks now make clear that only the attorney closes a requirement.
- Clients can upload multiple allowed files to a requested task, request a call,
  request a new appointment time, and use a neutral submission guide.
- Notifications, urgent requests, status messages, and secure-message updates
  use accessible live regions and clearer labels.
- Guided tours trap keyboard focus, support Escape, restore focus, and use
  consistent touch target sizes.
- Global keyboard focus styling and reduced-motion handling are present.

### Attorney experience

- The attorney roadmap mirrors the client roadmap and exposes only the action
  permitted at the current milestone.
- Clearance reports are accepted after a completed unscheduled phone call.
- Exact class lines remain the single source for roadmap count and itemized
  payment requests.
- Office-action status now requires the official notice deadline and creates the
  client call alert with that date.
- Payments, saved-method consent, external/on-call receipts, documents, audit
  events, and evidence remain grouped by case.

## Local verification performed

- `npm run lint` — passed, zero warnings/errors
- Browser route sweep — all reviewed routes loaded without application errors
- Attorney dashboard — client/case/task/call views and all six workspace panels
  opened with content
- Fresh case — unscheduled-call clearance-report action opened successfully
- Client dashboard — notification popup, tasks, call request, reschedule
  request, navigation, services, and guided tour worked in preview data
- Desktop and mobile-oriented styles were reviewed for wrapping, target sizing,
  focus visibility, drawer behavior, and fixed-control overlap

## Production checks still required

1. Run `npm ci`, a clean `npm run build`, and automated end-to-end tests in CI.
2. Test real Firebase role isolation with two clients plus attorney/admin users;
   one client must never read another client's files or case data.
3. Verify SMTP delivery/retry for invitations, messages, tasks, appointments,
   invoices, receipts, filing, office action, and certificate emails.
4. Test one approved low-value gateway transaction, one decline, concurrent
   duplicate submissions, an unknown/timeout response, webhook reconciliation,
   refund, and void behavior in the payment provider's test environment.
5. Add malware scanning/CDR, retention/versioning, backup/restore, queueing,
   monitoring, and incident-response procedures before high-volume use.
6. Require MFA for staff and commission an external security/authorization test.
7. Have qualified counsel review attorney-role wording, deadlines, recording
   consent, billing authorization, descriptor, refund, privacy, and retention
   language.
8. Test real iPhone/Android devices, screen readers, keyboard-only navigation,
   zoom/reflow, and slow networks.

## Research basis

- USPTO office-action response guidance and definitions
- OWASP authorization, session-management, and file-upload guidance
- WCAG 2.2 focus, target-size, authentication, and consistent-help criteria
- Current Clio and MyCase client-portal patterns for secure messages, documents,
  appointments, invoices, status, and mobile access

Source URLs are included in the final audit handoff and should be rechecked when
legal, browser, gateway, or platform behavior changes.
