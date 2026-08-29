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
- [Editorial standards](${baseUrl}/editorial-policy): Source, review, update, and corrections policy for educational content

## Educational content
- [U.S. trademark registration guides](${baseUrl}/guides): Official-source explanations covering filing preparation, examination, registration, and maintenance
- [Trademark registration process](${baseUrl}/guides/trademark-registration-process): Step-by-step federal process and maintenance overview
- [Trademark application cost](${baseUrl}/guides/trademark-cost): USPTO fees, possible added costs, and service-fee distinctions
- [Trademark search and likelihood of confusion](${baseUrl}/guides/trademark-search-likelihood-of-confusion): Federal searching and conflict-analysis fundamentals
- [Trademark classes](${baseUrl}/guides/trademark-classes): Goods, services, international classes, and ID Manual basics
- [Use in commerce vs. intent to use](${baseUrl}/guides/use-in-commerce-vs-intent-to-use): Filing-basis requirements and later steps
- [Trademark specimens](${baseUrl}/guides/trademark-specimens): Evidence-of-use examples and common problems
- [Trademark application checklist](${baseUrl}/guides/trademark-application-checklist): Pre-filing information and evidence checklist
- [Trademark timeline and status](${baseUrl}/guides/trademark-timeline-status): Examination, publication, allowance, and registration stages
- [Trademark office actions](${baseUrl}/guides/trademark-office-actions): Requirements, refusals, response periods, and official records
- [Trademark renewal deadlines](${baseUrl}/guides/trademark-renewal-deadlines): Section 8, Section 9, and maintenance windows
- [How to trademark a business name](${baseUrl}/guides/how-to-trademark-a-business-name): Owner, search, scope, basis, filing, and maintenance steps
- [How to trademark a logo](${baseUrl}/guides/how-to-trademark-a-logo): Special-form drawings, design searching, descriptions, and specimens
- [Do I need a trademark attorney?](${baseUrl}/guides/do-i-need-a-trademark-attorney): Attorney requirements and differences between representation, self-filing, and filing support
- [State vs. federal trademark registration](${baseUrl}/guides/state-vs-federal-trademark-registration): Geographic scope, filing systems, and business-name distinctions
- [Can you trademark a name already in use?](${baseUrl}/guides/can-you-trademark-a-name-already-in-use): Similarity, related goods or services, priority, and common-law use
- [Trademark scams and misleading notices](${baseUrl}/guides/trademark-scams-misleading-notices): TSDR verification and warning signs
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
