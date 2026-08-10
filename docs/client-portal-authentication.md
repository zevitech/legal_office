# Client portal authentication

## Account creation and login

1. A successful checkout or a signed-in attorney at `/portal-admin/invite`
   calls the server-side provisioning service.
2. Firebase Admin creates or finds the user by normalized email and assigns the
   correct portal role.
3. A new client receives a branded email with a single-use, time-limited
   password-creation link. No reusable temporary password is sent.
4. The client creates a password of at least 12 characters at
   `/portal/set-password` and signs in at `/portal-login`.
5. The server verifies the Firebase ID token and exchanges it for a five-day,
   HTTP-only, Secure, SameSite session cookie.
6. Protected portal pages and APIs verify the session, revocation state, role,
   trusted request origin, and client-record ownership.
7. Client logout returns to `/portal-login`; staff logout returns to
   `/portal-admin/login`.

Existing clients are never given a duplicate portal for another trademark. The
new matter is added to their current Firebase UID/client record.

## Firebase production setup

- Enable Email/Password in Firebase Authentication.
- Add `legaltrademarkoffice.com` and approved preview domains under Authorized
  domains.
- Create a Firebase Web App and set every `NEXT_PUBLIC_FIREBASE_*` value from
  `.env.example`.
- Create a least-privilege server service account and set the three
  `FIREBASE_ADMIN_*` values. Keep its private key server-only.
- Configure private Cloud Storage/Firestore rules; do not grant public document
  reads.
- Customize Firebase password/reset email sender and domains.
- Require MFA for attorney/admin accounts before real-client launch.

## Operational security

- Never commit `.env`, service-account JSON, SMTP credentials, gateway secrets,
  API keys, session cookies, or client documents.
- Rotate credentials that appeared in source, chat, screenshots, or old ZIPs.
- Do not log Firebase tokens, user emails, passwords, case answers, or document
  URLs.
- Apply role changes only from a trusted server process and record them in the
  staff audit log.
- Add login rate limiting, failed-login alerts, session revocation, backup, and
  incident-response procedures for production.
