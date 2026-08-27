import { additionalTrademarkGuides } from "@/lib/additionalTrademarkGuides";

export const guideBaseUrl = "https://www.legaltrademarkoffice.com/guides";

export const trademarkGuides = [
  {
    slug: "trademark-registration-process",
    cluster: "fundamentals",
    title: "How to Register a Trademark in the U.S.: Step-by-Step Guide",
    shortTitle: "How to register a trademark",
    description:
      "Learn how to register a trademark in the United States, including searching, ownership, classes, filing basis, USPTO submission, examination, and maintenance.",
    summary:
      "The federal trademark registration process begins before an application is filed. A prospective applicant should identify the mark, owner, goods or services, filing basis, and possible conflicts. After filing, the USPTO reviews the application, may issue an office action, publishes approved marks for opposition, and either registers the mark or requests later proof of use for an intent-to-use application.",
    sourceUrls: [
      "https://www.uspto.gov/trademarks/basics/trademark-process",
      "https://www.uspto.gov/trademarks/apply",
      "https://www.uspto.gov/trademarks/basics/application-filing-basis",
      "https://www.uspto.gov/trademarks/application-timeline",
    ],
  },
  {
    slug: "what-is-a-trademark",
    cluster: "fundamentals",
    title: "What Is a Trademark? Meaning, Examples, and U.S. Registration",
    shortTitle: "What is a trademark?",
    description:
      "Learn what a trademark is, what names, logos, and slogans can identify, how trademark rights begin, and what federal registration with the USPTO can provide.",
    summary:
      "A trademark is a word, phrase, symbol, design, or combination that identifies the source of goods or services and distinguishes them from competing offerings. Trademark rights can begin through use, but federal registration may provide broader nationwide benefits for the goods or services listed in the registration.",
    sourceUrls: [
      "https://www.uspto.gov/trademarks/basics/what-trademark",
      "https://www.uspto.gov/trademarks/basics/trademark-patent-copyright",
      "https://www.uspto.gov/trademarks/basics/strong-trademarks",
      "https://www.uspto.gov/trademarks/basics/why-register-your-trademark",
    ],
  },
  {
    slug: "trademark-cost",
    cluster: "preparation",
    title: "How Much Does It Cost to Register a Trademark in the U.S.?",
    shortTitle: "Trademark application cost",
    description:
      "Compare the USPTO's current $350-per-class base fee with private $49, $149, and $249 filing-support packages, possible additional fees, and maintenance costs.",
    summary:
      "The USPTO currently charges a base application fee of $350 for each class of goods or services. Legal Trademark Office's $49, $149, and $249 prices are separate private service fees for the work listed in each package, not substitutes for the government fee. The total can increase with multiple classes, added USPTO requirements, optional services, or later intent-to-use filings.",
    sourceUrls: [
      "https://www.uspto.gov/trademarks/basics/how-much-does-it-cost",
      "https://www.uspto.gov/trademarks/trademark-fee-information",
      "https://www.uspto.gov/learning-and-resources/fees-and-payment/uspto-fee-schedule",
    ],
  },
  {
    slug: "trademark-search-likelihood-of-confusion",
    cluster: "fundamentals",
    title: "Trademark Search and Likelihood of Confusion Explained",
    shortTitle: "Trademark search and conflicts",
    description:
      "Learn why a federal trademark database search is more than an exact-name lookup and how similarity of marks and related goods or services affect conflicts.",
    summary:
      "A trademark search is an investigation for earlier marks that may conflict with a proposed mark. Exact wording is only one part of the review. The USPTO explains that marks can be confusingly similar in sound, appearance, meaning, or overall commercial impression, and the associated goods or services may be related even when they fall in different international classes.",
    sourceUrls: [
      "https://www.uspto.gov/trademarks/search/federal-trademark-searching",
      "https://www.uspto.gov/trademarks/search/likelihood-confusion",
      "https://www.uspto.gov/trademarks/search",
    ],
  },
  ...additionalTrademarkGuides,
];

export function getTrademarkGuide(slug) {
  return trademarkGuides.find((guide) => guide.slug === slug);
}
