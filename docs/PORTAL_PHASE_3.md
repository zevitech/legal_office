# Client Portal — Phase 3

Phase 3 turns the working portal into a production operations system. It should begin only after the Phase 2 workflows are deployed and verified with real staff and test clients.

## 1. Production security and governance

- Require MFA for every attorney and administrator account.
- Add granular roles for administrator, attorney, paralegal, billing, and read-only staff.
- Record an immutable audit trail for status changes, document access, payment overrides, invitations, and client-data edits.
- Add session controls, account lockout/rate limits, security alerts, data retention, backup, and recovery procedures.
- Complete a privacy/security review before storing more sensitive legal documents.

## 2. Reliable billing operations

- Verify NMI payments with server-side transaction records and gateway webhooks.
- Add idempotency to prevent duplicate charges and duplicate payment updates.
- Generate branded PDF receipts for classification and government-fee payments.
- Add refunds, voids, partial payments, failed-payment retry, and accounting exports.
- Require an attorney note and audit entry whenever an offline payment is marked paid.

## 3. Legal document workflow

- Version attorney-prepared clearance reports and applications instead of overwriting files.
- Add client approval/acknowledgement before filing.
- Add secure e-signature support where legally appropriate.
- Add document expiry, replacement, malware scanning, and retention controls.
- Keep AI limited to internal organization and drafting assistance; an attorney must approve legal analysis and client-facing legal conclusions.

## 4. Calendar and communication integrations

- Connect attorney Google or Outlook calendars and generate Google Meet links automatically.
- Add appointment reminders, timezone handling, cancellation rules, and conflict detection.
- Persist two-way portal conversations as case-scoped threads.
- Add delivery status, retry queues, and templates for transactional email.

## 5. Case operations and reporting

- Add attorney assignment, workload queues, deadline dashboards, and escalation rules.
- Add saved filters and reporting for intake, consultation, clearance, class payment, preparation, filing, examination, and registration.
- Add operational analytics without exposing confidential client content to advertising systems.
- Add production monitoring, error reporting, uptime alerts, and an automated end-to-end test suite.

## Acceptance gate

Phase 3 is complete when a real matter can move from paid onboarding through consultation, attorney-prepared clearance report, class selection/payment, client approval, USPTO filing, and post-filing monitoring with a complete audit history and no manual database edits.
