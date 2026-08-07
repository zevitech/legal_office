import Link from "next/link";

const LegalPage = ({ title, updated = "August 6, 2026", children }) => (
  <main className="min-h-screen bg-slate-50 py-12">
    <article className="mx-auto w-[92%] max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm md:p-10">
      <Link href="/" className="text-sm font-semibold text-primary-theme">
        ← Legal Trademark Office
      </Link>
      <h1 className="mt-6 text-3xl font-bold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>
      <div className="prose prose-slate mt-8 max-w-none space-y-6">{children}</div>
      <p className="mt-10 border-t border-slate-200 pt-6 text-sm">
        Questions? Call <a href="tel:+13104244909">+1 (310) 424-4909</a> or
        use our contact page before purchasing.
      </p>
    </article>
  </main>
);

export default LegalPage;
