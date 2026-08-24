import { additionalTrademarkGuides } from "@/lib/additionalTrademarkGuides";

export const guideBaseUrl = "https://www.legaltrademarkoffice.com/guides";

export const trademarkGuides = [
  {
    slug: "trademark-registration-process",
    cluster: "fundamentals",
    title: "U.S. Trademark Registration Process: A Step-by-Step Guide",
    shortTitle: "Trademark registration process",
    description:
      "Learn the main steps in the U.S. federal trademark registration process, from clearance searching and filing basis through USPTO examination and maintenance.",
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
    slug: "trademark-cost",
    cluster: "preparation",
    title: "How Much Does a U.S. Trademark Application Cost?",
    shortTitle: "Trademark application cost",
    description:
      "Understand the USPTO's current $350-per-class base application fee, possible additional fees, filing-service costs, and ongoing registration maintenance expenses.",
    summary:
      "The USPTO currently charges a base application fee of $350 for each class of goods or services. That government fee is separate from any fee charged by a filing-support provider or attorney. The total can increase when an application covers multiple classes, requires additional information, uses a free-form identification, or is based on an intent to use the mark.",
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
