# Legal Trademark Office — Developer Handoff

## Verification completed

- `npm run lint` passes with no warnings or errors.
- `npm run build` completes successfully.
- Registration routes render from Step 1 through payment and thank-you.
- Landing page was checked at 375px, 768px, 1024px and 1440px with no horizontal overflow.
- The mobile pricing sticky bar was intentionally removed; do not restore a lowest-price anchor without a conversion test.
- Payment totals are recalculated server-side before NMI is charged.
- Local previews do not send live Google Ads conversions.

## Deployment

1. Install dependencies with `npm ci`.
2. Copy every variable from `.env.example` into the deployment platform and
   provide the real production values there. Never commit the populated values.
3. Keep `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false` in production.
4. Run `npm run build`.
5. Deploy the Next.js application.
6. Test one complete production checkout using Tag Assistant.

## Google address suggestions

Enable **Maps JavaScript API** and **Places API** in Google Cloud. Create a
browser key restricted to `https://www.legaltrademarkoffice.com/*` and approved
preview domains, restrict the key to those two APIs, then set:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_restricted_browser_key
```

The form remains usable through manual address entry if Google Places is
unavailable.

## Google Ads and GTM

Follow `docs/google-ads-gtm-funnel.md`. The site loads `GTM-KJGHNHGM`; configure
the old Legal Trademark Office Ads destination (`AW-16565473053`) inside GTM.
Purchase is the primary conversion. Qualified Lead and Begin Checkout remain
secondary. Confirm that every event fires once.

## Required production checks

- NMI tokenization loads and a real approved transaction returns a unique ID.
- Receipt, business copy and onboarding emails arrive once.
- Purchase carries `value`, `currency`, `transaction_id` and enhanced conversion
  data in Tag Assistant.
- Legal Terms, Privacy and Refund Policy links work from the funnel.
- Test desktop and a real iPhone/Android device before enabling ads.

## Security note

An older Zoho endpoint credential previously existed in source. Rotate that
credential before use and store the replacement only in the private
`ZOHO_LEAD_ENDPOINT` environment variable. Test-only email endpoints are disabled
in production.
