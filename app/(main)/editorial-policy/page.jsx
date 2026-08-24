import Link from "next/link";

import Header from "@/components/ui/Header";
import FooterSection from "@/components/sections/FooterSection";

const canonical = "https://www.legaltrademarkoffice.com/editorial-policy";

export const metadata = {
  title: "Editorial Standards and Corrections | Legal Trademark Office",
  description: "How Legal Trademark Office sources, reviews, dates, updates, and corrects its general U.S. trademark educational content.",
  alternates: { canonical },
};

export default function EditorialPolicyPage() {
  return (
    <>
      <Header />
      <main className="bg-slate-50 py-12 md:py-16">
        <article className="mx-auto max-w-4xl px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-600">
            <Link className="hover:underline" href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Editorial standards</span>
          </nav>
          <header className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Content transparency</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">Editorial standards and corrections</h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">These standards apply to the educational resources in our trademark guide library. They explain how factual material is sourced, reviewed, updated, and corrected.</p>
            <p className="mt-5 text-sm text-slate-600">Effective and last reviewed: August 24, 2026</p>
          </header>

          <div className="guide-content mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-10">
            <h2>Purpose and scope</h2>
            <p>Guide content is intended to help U.S. businesses understand general federal trademark terminology, procedures, and public records. It is educational information, not individualized legal advice, a prediction of registrability, or a guarantee of a USPTO outcome.</p>

            <h2>Primary-source standard</h2>
            <p>Material statements about USPTO forms, fees, deadlines, examination, publication, maintenance, and official records should cite the current USPTO page beside the guide’s source section. Intellectual-property comparisons may also cite the U.S. Copyright Office or another responsible government source.</p>
            <p>Secondary commentary is not used to override an official requirement. When a source and a page disagree, the official source controls and the page should be corrected.</p>

            <h2>Review and update schedule</h2>
            <p>Each guide displays a review date. Fees, deadlines, forms, filing systems, and processing-time statements are reviewed at least quarterly and after a known material USPTO change. Stable educational fundamentals are reviewed at least annually.</p>

            <h2>Authorship and credentials</h2>
            <p>Legal Trademark Office is identified as the organizational publisher. We do not assign a person byline, professional credential, review, rating, or legal qualification unless the person’s identity, role, permission, and credential can be independently verified.</p>

            <h2>Corrections</h2>
            <p>Readers can report a possible factual error through the <Link href="/contact-us">contact page</Link>. A useful report identifies the page, disputed statement, and supporting source. Substantive corrections should update the visible review date. Typographical changes that do not alter meaning may be made without a separate correction note.</p>

            <h2>Commercial separation</h2>
            <p>Educational pages may link to the filing-support service when relevant, but the answer to the reader’s question comes first. Government fees and procedures are distinguished from optional private service fees. Sponsored placements and paid external links are not presented as editorial recommendations.</p>

            <h2>What we do not publish</h2>
            <ul>
              <li>Invented authors, credentials, customer results, or case studies.</li>
              <li>Guaranteed approval or ranking claims.</li>
              <li>Copied or lightly rewritten third-party articles.</li>
              <li>Mass-produced city or state pages for the same federal intent.</li>
              <li>Advice presented as specific to a reader’s legal situation.</li>
            </ul>
          </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
}
