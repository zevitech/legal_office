# Legal Trademark Office

Next.js trademark-registration funnel with staged lead capture, Google Ads/GTM
events, Google Places address suggestions, package selection, NMI checkout, and
payment receipts.

## Deployment configuration

Copy `.env.example` into the deployment platform's environment settings and
provide the production secrets. Do not commit a populated `.env` file.

For address suggestions:

1. In Google Cloud, enable **Maps JavaScript API** and **Places API**.
2. Create a browser API key.
3. Restrict website access to `https://www.legaltrademarkoffice.com/*` and any
   approved preview domain.
4. Restrict the key to Maps JavaScript API and Places API.
5. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the deployment environment.

The address form remains usable manually if Google suggestions fail to load.

Before going live, keep `NEXT_PUBLIC_PAYMENT_BYPASS_MODE=false`, configure the
NMI keys, and follow `docs/google-ads-gtm-funnel.md` for the GTM mapping.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
