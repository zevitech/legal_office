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
            <div className="relative inline-flex justify-self-end whitespace-nowrap pr-3 text-slate-950">
              <span className="text-2xl font-black italic tracking-tight">NIKE</span>
              <span className="absolute right-0 top-0 text-[8px] font-bold not-italic leading-none">™</span>
            </div>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Logo or design</span>
            <div className="relative inline-flex justify-self-end pr-3 text-slate-950" aria-label="Nike swoosh logo">
              <svg viewBox="135.5 361.38 1000 356.39" className="h-10 w-28" role="img" aria-hidden="true">
                <path fill="currentColor" d="M245.8075 717.62406c-29.79588-1.1837-54.1734-9.3368-73.23459-24.4796-3.63775-2.8928-12.30611-11.5663-15.21427-15.2245-7.72958-9.7193-12.98467-19.1785-16.48977-29.6734-10.7857-32.3061-5.23469-74.6989 15.87753-121.2243 18.0765-39.8316 45.96932-79.3366 94.63252-134.0508 7.16836-8.0511 28.51526-31.5969 28.65302-31.5969.051 0-1.11225 2.0153-2.57652 4.4694-12.65304 21.1938-23.47957 46.158-29.37751 67.7703-9.47448 34.6785-8.33163 64.4387 3.34693 87.5151 8.05611 15.898 21.86731 29.6684 37.3979 37.2806 27.18874 13.3214 66.9948 14.4235 115.60699 3.2245 3.34694-.7755 169.19363-44.801 368.55048-97.8366 199.35686-53.0408 362.49439-96.4029 362.51989-96.3672.056.046-463.16259 198.2599-703.62654 301.0914-38.08158 16.2806-48.26521 20.3928-66.16827 26.6785-45.76525 16.0714-86.76008 23.7398-119.89779 22.4235z" />
              </svg>
              <span className="absolute right-0 top-0 text-[8px] font-bold leading-none">™</span>
            </div>
          </article>

          <article className="grid min-h-24 grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slogan</span>
            <div className="relative inline-flex justify-self-end whitespace-nowrap pr-3 text-slate-900">
              <span className="text-lg font-black uppercase italic tracking-tight">Just Do It.</span>
              <span className="absolute right-0 top-0 text-[8px] font-bold not-italic leading-none">™</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
