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
            <p className="justify-self-end whitespace-nowrap text-2xl font-black italic tracking-tight text-slate-950">
              NIKE<span className="align-super text-[10px] not-italic">®</span>
            </p>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Logo or design</span>
            <div className="flex items-start justify-self-end text-slate-950" aria-label="Nike swoosh logo">
              <svg viewBox="-6 -6 108 48" className="h-12 w-24 overflow-visible" role="img" aria-hidden="true">
                <path fill="currentColor" d="M8 22.5c8.4 5 16.4 7.5 24 7.5 6.5 0 13.6-1.8 21.2-5.3L90 7 52.8 18.4c-9.9 3-17.5 4.5-22.8 4.5-7.2 0-12.2-2.3-15-6.9-1.5-2.5-2.2-5.3-2-8.4C8.2 12.9 6.6 17.9 8 22.5Z" />
              </svg>
              <span className="text-[10px] font-bold">®</span>
            </div>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slogan</span>
            <p className="justify-self-end whitespace-nowrap text-lg font-black uppercase italic tracking-tight text-slate-900">Just Do It.<span className="align-super text-[10px] not-italic">®</span></p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
