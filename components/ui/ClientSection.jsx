import React from "react";
import { FaApple } from "react-icons/fa";

const ClientSection = () => {
  return (
    <section className="w-full border-y border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-4 py-6">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-6 lg:grid-cols-[.65fr_1.35fr]">
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#025da0]">
            Example mark presentations
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-800 md:text-3xl">
            See how a name, logo and slogan can appear as trademarks
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Business name</span>
            <p className="whitespace-nowrap text-2xl font-black tracking-tight"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span><span className="align-super text-[10px] text-slate-700">®</span></p>
          </article>

          <article className="flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Logo or design</span>
            <div className="flex items-start text-slate-900">
              <FaApple className="text-5xl" aria-label="Apple logo" />
              <span className="text-[10px] font-bold">®</span>
            </div>
          </article>

          <article className="flex min-h-24 items-center justify-between gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slogan</span>
            <p className="whitespace-nowrap text-lg font-black uppercase italic tracking-tight text-slate-900">Just Do It.<span className="align-super text-[10px] not-italic">®</span></p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ClientSection;
