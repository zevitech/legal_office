import Link from "next/link";

import { trademarkGuides } from "@/lib/trademarkGuides";

const canonical = "https://www.legaltrademarkoffice.com/guides";

export const metadata = {
  title: "U.S. Trademark Registration Guides | Legal Trademark Office",
  description: "Official-source educational guides covering the U.S. trademark registration process, USPTO fees, clearance searches, and filing preparation.",
  alternates: { canonical },
};

export default function TrademarkGuidesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#page`,
        url: canonical,
        name: "U.S. Trademark Registration Guides",
        description: metadata.description,
        publisher: { "@id": "https://www.legaltrademarkoffice.com/#organization" },
        hasPart: trademarkGuides.map((guide) => ({ "@id": `${canonical}/${guide.slug}#article` })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.legaltrademarkoffice.com/" },
          { "@type": "ListItem", position: 2, name: "Trademark guides", item: canonical },
        ],
      },
    ],
  };

  return (
    <main className="bg-slate-50 py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-600"><Link className="hover:underline" href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Trademark guides</span></nav>
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Educational resource center</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 md:text-6xl">U.S. trademark registration guides</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700">Understand the federal filing process before making a decision. These independent educational guides use current USPTO sources and separate government requirements from optional filing-support services.</p>
        </header>
        <section className="mt-12 grid gap-6 md:grid-cols-3" aria-label="Trademark guides">
          {trademarkGuides.map((guide) => (
            <article key={guide.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold leading-snug text-slate-950">{guide.shortTitle}</h2>
              <p className="mt-4 flex-1 leading-7 text-slate-700">{guide.description}</p>
              <Link className="mt-6 font-semibold text-blue-800 underline" href={`/guides/${guide.slug}`}>Read the guide</Link>
            </article>
          ))}
        </section>
        <p className="mt-12 max-w-3xl rounded-xl bg-slate-100 p-5 text-sm leading-6 text-slate-700">Legal Trademark Office is an independent trademark filing-support provider and is not affiliated with the USPTO. This resource center provides general education, not legal advice.</p>
      </div>
    </main>
  );
}
