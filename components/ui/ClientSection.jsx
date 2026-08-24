import React from "react";

const ClientSection = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-4 py-6">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-5 lg:grid-cols-[.55fr_1.45fr]">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#025da0]">
            Recognizable examples
          </p>
          <h2 className="mt-2 text-xl font-bold leading-snug text-slate-700 md:text-2xl">
            Name, logo and slogan trademarks
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Business name</span>
            <div className="inline-flex items-start justify-self-end whitespace-nowrap text-slate-950">
              <span className="text-2xl font-black italic tracking-tight">NIKE</span>
              <span className="ml-1 mt-0.5 text-[9px] font-bold not-italic leading-none">™</span>
            </div>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Logo or design</span>
            <div className="inline-flex items-start justify-self-end pr-1 text-slate-950" aria-label="Nike swoosh logo">
              <svg viewBox="0 0 100 42" className="h-10 w-24 overflow-visible" role="img" aria-hidden="true">
                <path fill="currentColor" d="M6 28c9 7 21 8 35 2L94 6 44 20c-13 4-23 6-29 3-4-2-6-6-5-11-6 6-8 12-4 16Z" />
              </svg>
              <span className="ml-1 mt-0.5 text-[9px] font-bold leading-none">™</span>
            </div>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slogan</span>
            <div className="inline-flex items-start justify-self-end whitespace-nowrap text-slate-900">
              <span className="text-lg font-black uppercase italic tracking-tight">Just Do It.</span>
              <span className="ml-1 mt-0.5 text-[9px] font-bold not-italic leading-none">™</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
