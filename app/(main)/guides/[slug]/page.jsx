import { notFound } from "next/navigation";

import GuideShell from "@/components/guides/GuideShell";
import { getTrademarkGuide, guideBaseUrl, trademarkGuides } from "@/lib/trademarkGuides";

export function generateStaticParams() {
  return trademarkGuides.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const guide = getTrademarkGuide(params.slug);
  if (!guide) return { title: "Guide Not Found", robots: { index: false, follow: false } };
  const canonical = `${guideBaseUrl}/${guide.slug}`;
  return {
    title: `${guide.title} | Legal Trademark Office`,
    description: guide.description,
    alternates: { canonical },
    openGraph: { type: "article", url: canonical, title: guide.title, description: guide.description },
    twitter: { card: "summary", title: guide.title, description: guide.description },
  };
}

function ProcessGuide() {
  return <>
    <h2>How do you register a trademark in the United States?</h2>
    <p>To register a U.S. trademark, identify the owner and mark, define the goods or services, choose a filing basis, search for potentially conflicting marks, and submit an application to the USPTO. The application then moves through examination, possible correspondence, publication, and—when all requirements are satisfied—registration or a later proof-of-use stage.</p>
    <h2>What happens during trademark registration?</h2>
    <p>Federal registration is a multi-stage review, not an instant purchase. The applicant prepares and submits an application through the USPTO Trademark Center. The USPTO assigns a serial number, reviews the application, and communicates through the official record. A complete application can still be refused, and filing fees are generally not refunded merely because registration is refused.</p>
    <h2>1. Define the mark and owner</h2>
    <p>Decide whether the application is for wording, a logo or another source identifier. Identify the correct legal owner at filing. The owner may be an individual or a business entity, depending on who controls the nature and quality of the goods or services associated with the mark. Errors in ownership can have serious consequences, so uncertain applicants should seek advice from a qualified U.S.-licensed trademark attorney.</p>
    <h2>2. Identify goods, services and classes</h2>
    <p>The application must describe the goods or services connected with the mark. The USPTO groups them into international classes, and its base filing fee applies to each class. A class is an administrative category; it does not by itself determine whether two businesses are related or whether marks conflict.</p>
    <h2>3. Choose a filing basis</h2>
    <p>A use-in-commerce basis generally applies when the mark is already used in U.S. interstate commerce for the listed goods or services. An intent-to-use basis may apply when the applicant has a bona fide intention to use the mark but has not begun qualifying use. Intent-to-use applications require later proof of use and additional filings and fees before registration.</p>
    <h2>4. Search before filing</h2>
    <p>Search the federal trademark database for identical and similar marks, then consider whether the associated goods or services are related. A broader clearance effort may also review state records, business names, domains and marketplace use. No search can guarantee approval, but searching can reveal conflicts worth evaluating before paying a nonrefundable filing fee.</p>
    <h2>5. File and monitor the application</h2>
    <p>Submit the applicant, mark, goods or services, basis, class and other required information through the USPTO. Monitor the application in the Trademark Status and Document Retrieval system and keep the correspondence address current. Deadlines are important; missing a response deadline can cause abandonment.</p>
    <h2>6. USPTO examination and office actions</h2>
    <p>An examining attorney reviews legal and procedural requirements and searches for conflicting federal marks. If there is a problem, the USPTO may issue an office action explaining a requirement or refusal. Some issues are procedural; others are substantive. The response must address the issues by the stated deadline, and complex refusals may require legal analysis.</p>
    <h2>7. Publication, opposition and registration</h2>
    <p>If approved, the mark is published in the Trademark Official Gazette. Third parties then have an opportunity to oppose registration or request more time to oppose. If no successful opposition occurs, a use-based application may proceed to registration. An intent-to-use application generally receives a Notice of Allowance and must complete the required use filings first.</p>
    <h2>8. Maintain the registration</h2>
    <p>Registration creates continuing responsibilities. Owners must keep information current and file required maintenance documents during the USPTO windows, including filings between the fifth and sixth years and renewal-related filings every ten years. A registration can be cancelled or expire when required documents and fees are not timely submitted.</p>
  </>;
}

function WhatIsTrademarkGuide() {
  return <>
    <h2>What is a trademark in simple terms?</h2>
    <p>A trademark is a source identifier. It helps customers recognize that particular goods or services come from one business rather than another. A business name, product name, logo, slogan, symbol, packaging feature, sound, or another distinctive element may function as a trademark when customers use it to identify the source.</p>
    <p>The term <em>service mark</em> is sometimes used for services, while <em>trademark</em> is often used broadly for both goods and services. A trademark does not automatically give its owner control over a word or design in every possible context. Rights are connected to the mark, the relevant goods or services, and the circumstances in which consumers encounter it.</p>

    <h2>What can function as a trademark?</h2>
    <p>Common trademark formats include business and product names, logos, slogans, symbols, and combinations of wording and design. The key question is whether the matter identifies source rather than merely describing the product, decorating it, or communicating ordinary information.</p>
    <div className="overflow-x-auto"><table><thead><tr><th>Mark type</th><th>Example format</th><th>Application consideration</th></tr></thead><tbody><tr><td>Business or product name</td><td>Words in standard characters</td><td>May protect the wording without limiting it to one font or design</td></tr><tr><td>Logo or design</td><td>Stylized wording, symbol, or combined design</td><td>The drawing should accurately show the design being claimed</td></tr><tr><td>Slogan</td><td>A phrase used to identify source</td><td>Advertising language must function as a mark, not only as a message</td></tr><tr><td>Other source identifier</td><td>Sound, color, packaging, or configuration</td><td>May require specialized evidence and a clear description</td></tr></tbody></table></div>

    <h2>Trademark vs. business name</h2>
    <p>Forming an LLC, registering a corporation, or obtaining a local assumed-name registration does not create a federal trademark registration. Entity-name systems generally identify businesses in a particular jurisdiction. Trademark review focuses on whether a mark identifies source and conflicts with earlier rights for related goods or services.</p>
    <p>A business can therefore have an available entity name but still encounter a trademark conflict. Searching should consider similar wording, sound, meaning, appearance, and related goods or services—not only an exact company-name match.</p>

    <h2>Trademark vs. copyright vs. patent</h2>
    <p>Trademarks identify the source of goods or services. Copyright generally protects original expressive works, while patents protect qualifying inventions or designs for limited periods. One business asset can involve more than one type of intellectual property, but each system has different requirements and purposes.</p>

    <h2>Do trademark rights require federal registration?</h2>
    <p>Rights may begin when a mark is used to identify goods or services, but unregistered rights can be limited by geography, priority, and the facts of marketplace use. Federal registration is not mandatory, yet it may provide important nationwide benefits connected with the goods or services covered by the registration.</p>
    <p>The symbols also mean different things. Businesses may use TM or SM to communicate a trademark claim. The federal registration symbol, ®, should be used only after the USPTO registers the mark and only in connection with the covered goods or services.</p>

    <h2>What makes a trademark strong?</h2>
    <p>Distinctive marks are generally easier to identify as a single source. Fanciful marks are invented terms, arbitrary marks use familiar words in unrelated ways, and suggestive marks require thought to connect them with an offering. Merely descriptive wording may face registration obstacles, and a generic term cannot function as a trademark for the goods or services it names.</p>

    <h2>Why search before applying?</h2>
    <p>The USPTO can refuse registration when a proposed mark is likely to cause confusion with an earlier mark for related goods or services. A useful search examines more than exact spelling. It may include similar sounds, meanings, appearances, abbreviations, translations, and marketplace uses.</p>
    <p>No search guarantees approval, but it can identify records that deserve attention before a nonrefundable government filing fee is paid.</p>

    <h2>What information is needed to apply?</h2>
    <ul><li>The correct individual or legal entity that owns the mark.</li><li>A clear representation of the name, logo, slogan, or other mark.</li><li>Accurate descriptions of the associated goods or services.</li><li>The international classes and expected government fees.</li><li>A filing basis, such as current use in commerce or a bona fide intent to use.</li><li>Evidence of use when the selected basis and filing stage require it.</li></ul>

    <h2>Direct filing, filing support, or legal representation</h2>
    <p>Applicants may prepare a filing directly with the USPTO, purchase defined-scope filing support, or retain a U.S.-licensed attorney for individualized legal advice and representation. These are different service models. Legal Trademark Office offers filing-support plans beginning at $49, with USPTO government fees paid separately.</p>
    <p>A defined service fee can help customers budget application-preparation support separately from optional legal advice. Questions involving ownership disputes, close conflicts, substantive refusals, or legal strategy may require advice from a qualified U.S.-licensed trademark attorney.</p>
  </>;
}

function CostGuide() {
  return <>
    <h2>What is the USPTO trademark filing fee?</h2>
    <p>The USPTO currently lists a base application fee of <strong>$350 per class</strong> for an electronically filed U.S. trademark application. One class therefore starts at $350 in government fees; two classes start at $700. This payment goes to the USPTO and is separate from fees charged by an independent filing-support provider or a law firm.</p>
    <h2>Why does the number of classes change the cost?</h2>
    <p>Trademark applications identify the goods and services for which protection is requested. Those goods and services are organized into international classes. Clothing items might fit within one class, while custom printing services may require another. The application fee is calculated per class, so the selected scope directly affects the initial government cost.</p>
    <h2>Possible additional application fees</h2>
    <p>The base fee is not always the final USPTO cost. According to the USPTO fee schedule, additional fees can apply when required information is insufficient, when an applicant uses a free-form description instead of an entry from the Trademark ID Manual, or when a long free-form description exceeds specified character groups. Current amounts and rules should always be confirmed on the official fee schedule before filing.</p>
    <div className="overflow-x-auto"><table><thead><tr><th>Cost item</th><th>Current amount</th><th>When it may apply</th></tr></thead><tbody><tr><td>Base application</td><td>$350 per class</td><td>Every new electronic application</td></tr><tr><td>Insufficient information</td><td>$100 per class</td><td>When required application information is missing</td></tr><tr><td>Free-form identification</td><td>$200 per class</td><td>When goods or services are entered outside the ID Manual</td></tr><tr><td>Extra free-form characters</td><td>$200 per affected group</td><td>For each additional 1,000-character group beyond the initial allowance</td></tr></tbody></table></div>
    <h2>Intent-to-use applications can cost more later</h2>
    <p>An applicant who has a bona fide intention to use a mark but has not begun qualifying use may file on an intent-to-use basis. Before registration, that applicant must later submit an allegation of use with an acceptable specimen and pay the applicable fee. Extensions may create further costs. These later requirements are different from the initial base application fee.</p>
    <h2>Government fees versus service fees</h2>
    <p>A government filing fee is paid for USPTO processing. A service fee pays a private provider for the scope described in its plan, such as gathering information, preparing form entries, or submitting materials. Compare the two separately. Confirm which classes, searches, follow-up services, office-action work or post-filing assistance are included before checkout.</p>
    <h2>What the $49, $149, and $249 service fees cover</h2>
    <p>Legal Trademark Office&apos;s advertised $49, $149, and $249 prices are private service fees, not discounted USPTO fees and not the total government cost of registration. They pay for the preparation and submission-support work listed in the selected package. That work is intended to help customers organize application information and reduce avoidable administrative errors, but it cannot eliminate every issue or guarantee that the USPTO will approve a mark.</p>
    <div className="overflow-x-auto"><table><thead><tr><th>Package</th><th>Listed service work</th><th>Monitoring</th></tr></thead><tbody><tr><td>Basic — $49</td><td>Federal basic search, filing-specialist review, and listed seven-business-day preparation</td><td>Not included</td></tr><tr><td>Standard — $149</td><td>Federal and state search, paralegal review, and listed three-business-day preparation</td><td>Not included</td></tr><tr><td>Advanced — $249</td><td>Comprehensive search, full paralegal support, and listed 24–48-hour preparation</td><td>Six months included</td></tr></tbody></table></div>
    <p>The package comparison shown at the time of purchase controls the service scope. Customers should review it before checkout because optional add-ons, future work, extra classes, government fees, and services not listed in the selected plan may cost more. Monitoring means watching for potentially similar later activity during the stated period; it is not enforcement, legal representation, or a promise that every possible conflict will be detected.</p>
    <h2>Why a private service fee can be lower than a law firm&apos;s fee</h2>
    <p>Providers can define different scopes, workflows, staffing, turnaround times, and levels of legal involvement. A lower service price does not change the USPTO&apos;s government fee or examination standard. The useful comparison is not price alone: compare the search scope, preparation work, reviewer role, monitoring period, excluded work, refund terms, and what happens if the USPTO issues a refusal or requests more information.</p>
    <p>Some applicants file directly with the USPTO, some use administrative filing support, and others retain a law firm for individualized legal advice and representation. These are different service models. Customers should choose based on the assistance they need and verify any claimed professional credential independently.</p>
    <h2>Are USPTO filing fees refundable?</h2>
    <p>USPTO filing fees are generally not refunded simply because an application is refused, abandoned or does not register. The agency describes limited refunds for payments made by mistake or in excess of the amount required. This makes pre-filing decisions about ownership, scope, basis, identification and searching financially important.</p>
    <h2>Budget for maintenance after registration</h2>
    <p>Federal rights require maintenance filings. The USPTO charges fees for declarations of use or excusable nonuse and for renewal, generally on a per-class basis. Late filings during a grace period can add surcharges. Review the official maintenance schedule rather than treating registration as a one-time lifetime payment.</p>
  </>;
}

function SearchGuide() {
  return <>
    <h2>What is a trademark search?</h2>
    <p>A trademark search looks for earlier marks that may conflict with a proposed brand name, slogan or design. Searching the USPTO federal database is an essential step, but a comprehensive clearance search may also include state registrations, business records, domains, websites and marketplace use. Search results require analysis; finding no exact match does not mean a mark is available or registrable.</p>
    <h2>Why exact-name searching is not enough</h2>
    <p>The USPTO evaluates the overall commercial impression of marks. Two marks can be confusingly similar even when spelling differs. Similarity may arise from sound, appearance, meaning or the impression created when consumers encounter the marks. Search variations should therefore include phonetic equivalents, alternative spellings, translations, abbreviations and wording with similar meaning.</p>
    <h2>How likelihood of confusion works</h2>
    <p>Likelihood of confusion exists when marks are sufficiently similar and their goods or services are related in a way that may cause consumers to believe they come from the same source. The USPTO identifies this as the most common reason for refusing registration. The analysis is contextual; it is not limited to identical marks or identical products.</p>
    <h2>Related goods and services may be in different classes</h2>
    <p>International classes organize applications and fees, but class numbers do not settle the conflict question. Goods or services may be considered related when they are used together, sold to the same purchasers, advertised together, or commonly offered by the same source. That relationship can exist across different classes.</p>
    <h2>A practical federal search sequence</h2>
    <ol><li>Search the complete wording and close spelling variations.</li><li>Search individual distinctive terms and their combinations.</li><li>Consider sound-alike terms, meanings, translations and abbreviations.</li><li>Review live registrations and pending applications for related goods or services.</li><li>Open relevant records in TSDR to review ownership, status, descriptions and documents.</li><li>Expand beyond the federal database when broader marketplace clearance is needed.</li></ol>
    <h2>What a search can and cannot tell you</h2>
    <p>A search can identify records that deserve closer review and can help an applicant make a more informed filing decision. It cannot guarantee that the USPTO will approve an application. The examining attorney performs an independent search, and other refusal grounds—such as descriptiveness, ornamentation or an inadequate specimen—may apply even when no conflicting mark is found.</p>
    <h2>When professional legal review may be appropriate</h2>
    <p>Evaluating a crowded field, a close phonetic match, related products, common-law use or a substantive refusal can require legal judgment. An independent filing-support service is not a substitute for legal advice. Applicants who need advice about registrability, risk, ownership disputes or responses to substantive refusals should consult a qualified U.S.-licensed trademark attorney.</p>
  </>;
}

function StructuredGuide({ sections }) {
  return sections.map((section) => (
    <section key={section.heading}>
      <h2>{section.heading}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.list ? <ul>{section.list.map((item) => <li key={item}>{item}</li>)}</ul> : null}
    </section>
  ));
}

const guideContent = {
  "trademark-registration-process": <ProcessGuide />,
  "trademark-cost": <CostGuide />,
  "what-is-a-trademark": <WhatIsTrademarkGuide />,
  "trademark-search-likelihood-of-confusion": <SearchGuide />,
};

export default function TrademarkGuidePage({ params }) {
  const guide = getTrademarkGuide(params.slug);
  if (!guide) notFound();
  const canonical = `${guideBaseUrl}/${guide.slug}`;
  const guideIndex = trademarkGuides.findIndex((item) => item.slug === guide.slug);
  const rotateFrom = (items, offset) => items.length
    ? [...items.slice(offset % items.length), ...items.slice(0, offset % items.length)]
    : [];
  const sameCluster = trademarkGuides.filter((item) => item.slug !== guide.slug && item.cluster === guide.cluster);
  const otherClusters = trademarkGuides.filter((item) => item.slug !== guide.slug && item.cluster !== guide.cluster);
  const relatedGuides = [
    ...rotateFrom(sameCluster, guideIndex).slice(0, 3),
    ...rotateFrom(otherClusters, guideIndex).slice(0, 2),
  ];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        datePublished: "2026-08-24",
        dateModified: "2026-08-24",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        author: { "@id": "https://www.legaltrademarkoffice.com/#organization" },
        publisher: { "@id": "https://www.legaltrademarkoffice.com/#organization" },
        citation: guide.sourceUrls,
        isPartOf: { "@id": `${guideBaseUrl}#page` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.legaltrademarkoffice.com/" },
          { "@type": "ListItem", position: 2, name: "Trademark guides", item: guideBaseUrl },
          { "@type": "ListItem", position: 3, name: guide.shortTitle, item: canonical },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <GuideShell guide={guide} relatedGuides={relatedGuides}>
      {guideContent[guide.slug] || <StructuredGuide sections={guide.sections} />}
    </GuideShell>
  </>;
}
