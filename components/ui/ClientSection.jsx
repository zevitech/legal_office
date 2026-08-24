import React from "react";
import { LuMountain, LuSparkles } from "react-icons/lu";

const ClientSection = () => {
  return (
    <section className="border-y border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-4 py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#025da0]">
            Example mark presentations
          </p>
          <h2 className="mt-2 text-2xl font-bold leading-tight text-slate-800 md:text-3xl">
            See how a name, logo and slogan can appear as trademarks
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            These fictional examples show common ways businesses display the ™ symbol with different types of marks.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="flex min-h-36 flex-col justify-between rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Business name</span>
            <p className="mt-5 text-2xl font-black tracking-tight text-[#075A96]">Northstar<span className="align-super text-xs">™</span></p>
          </article>

          <article className="flex min-h-36 flex-col justify-between rounded-2xl border border-cyan-100 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Logo or design</span>
            <div className="mt-4 flex items-end gap-2 text-[#027DD6]">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#075A96] to-[#55c3e9] text-3xl text-white"><LuMountain aria-hidden="true" /></span>
              <span className="pb-1 text-xs font-bold">™</span>
            </div>
          </article>

          <article className="flex min-h-36 flex-col justify-between rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Slogan</span>
            <p className="mt-4 flex items-start gap-2 text-lg font-bold leading-6 text-slate-800"><LuSparkles className="mt-1 shrink-0 text-[#027DD6]" aria-hidden="true" />Made for the next mile<span className="align-super text-xs text-[#075A96]">™</span></p>
          </article>
        </div>
      </div>
      <p className="mx-auto mt-5 max-w-6xl text-center text-xs leading-5 text-slate-500 lg:text-right">
        Examples are fictional. ™ may be used to identify a claimed mark; ® is reserved for marks registered with the USPTO.
      </p>
    </section>
  );
};

export default ClientSection;
