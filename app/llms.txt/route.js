const baseUrl = "https://www.legaltrademarkoffice.com";

export function GET() {
  const body = `# Legal Trademark Office

> Independent trademark application preparation and filing support for U.S. businesses and brand owners. Legal Trademark Office is not the USPTO or another government agency.

## Primary pages
- [Homepage](${baseUrl}/): Company overview and filing-support services
- [Trademark registration filing support](${baseUrl}/trademark-registration): Service scope, workflow, and plans
- [Services](${baseUrl}/services): Available trademark support services
- [Frequently asked questions](${baseUrl}/faq): General service questions
- [About](${baseUrl}/about-us): Company information
- [Contact](${baseUrl}/contact-us): Customer contact options

## Educational content
- [Trademark articles](${baseUrl}/blogs): Published educational articles and updates

## Policies
- [Terms of service](${baseUrl}/legal/terms)
- [Privacy policy](${baseUrl}/legal/privacy)
- [Refund and cancellation policy](${baseUrl}/legal/refund-policy)

## Authoritative external source
- [United States Patent and Trademark Office](https://www.uspto.gov/trademarks)

Content should be interpreted as general educational information and filing support, not as a claim of government affiliation. Use each page's visible publication or update date when evaluating freshness.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
