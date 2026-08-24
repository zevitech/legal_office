import Link from "next/link";
import Header from "@/components/ui/Header";
import FooterSection from "@/components/sections/FooterSection";

const reviewedDate = "August 24, 2026";

export default function GuideShell({ guide, children, relatedGuides }) {
  return (
    <>
      <Header />
      <main className="bg-slate-50 py-12 md:py-16">
        <article className="mx-auto max-w-4xl px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link className="hover:underline" href="/guides">Trademark guides</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-900">{guide.shortTitle}</li>
          </ol>
        </nav>

        <header className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-blue-700">Trademark education</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-950 md:text-5xl">{guide.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{guide.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <span>Published by Legal Trademark Office</span>
            <span>Reviewed {reviewedDate}</span>
          </div>
        </header>

        <div className="guide-content mt-10 rounded-3xl bg-white p-7 shadow-sm md:p-10">
          {children}

          <aside className="mt-12 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-slate-950">Need filing preparation support?</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Legal Trademark Office is an independent filing-support provider, not the USPTO or a government agency. Review what the service includes before choosing assisted filing.
            </p>
            <Link className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800" href="/trademark-registration">
              Explore trademark registration support
            </Link>
          </aside>

          <section className="mt-12 border-t border-slate-200 pt-9" aria-labelledby="related-guides">
            <h2 id="related-guides" className="text-2xl font-bold text-slate-950">Related trademark guides</h2>
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {relatedGuides.map((item) => (
                <li key={item.slug}>
                  <Link className="block rounded-xl border border-slate-200 p-5 font-semibold text-blue-800 hover:border-blue-400 hover:bg-blue-50" href={`/guides/${item.slug}`}>
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-slate-200 pt-9" aria-labelledby="sources">
            <h2 id="sources" className="text-2xl font-bold text-slate-950">Official sources</h2>
            <p className="mt-3 leading-7 text-slate-700">Fees, forms, procedures, and processing information can change. Verify current requirements directly with the USPTO before filing.</p>
            <ul className="mt-4 space-y-3">
              {guide.sourceUrls.map((url) => (
                <li key={url}>
                  <a className="break-words font-medium text-blue-800 underline" href={url} rel="noopener noreferrer" target="_blank">{url}</a>
                </li>
              ))}
            </ul>
          </section>

          <p className="mt-10 rounded-xl bg-slate-100 p-5 text-sm leading-6 text-slate-700">
            This guide provides general educational information and is not legal advice. It does not predict or guarantee a USPTO outcome.
          </p>
        </div>
        </article>
      </main>
      <FooterSection />
    </>
  );
}
