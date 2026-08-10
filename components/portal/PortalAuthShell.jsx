"use client";

import Link from "next/link";

export default function PortalAuthShell({ eyebrow, title, description, children, footer, wide = false }) {
  return (
    <main className="min-h-screen bg-[#f4f7fa] px-4 py-8 sm:grid sm:place-items-center sm:py-14">
      <div className={`w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid ${wide?"max-w-[1320px] lg:grid-cols-[.72fr_1.28fr]":"max-w-[1080px] lg:grid-cols-[.9fr_1.1fr]"}`}>
        <section className="relative overflow-hidden bg-[#087dcc] p-7 text-white sm:p-10 lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#005da5]/20 blur-3xl" />
          <Link href="/" className="relative inline-flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-xl font-black text-[#027dd6] shadow-sm">L</span>
            <span><span className="block text-sm font-extrabold">Legal Trademark</span><span className="block text-xs font-bold tracking-wider text-blue-50">OFFICE®</span></span>
          </Link>
          <div className="relative mt-14 lg:mt-28">
            <p className="text-xs font-extrabold uppercase tracking-[.2em] text-white">Private client access</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">Your trademark journey, organized in one secure place.</h2>
            <ul className="mt-8 space-y-4 text-sm font-medium leading-6 text-white">
              {['Track application progress and deadlines','Upload case documents securely','Message your legal team','Access appointments, invoices and receipts'].map(item => <li key={item} className="flex gap-3"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[11px] font-black text-[#087dcc] shadow-sm">✓</span>{item}</li>)}
            </ul>
          </div>
        </section>
        <section className="p-6 sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#027dd6]">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-700">{description}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-7 border-t border-slate-200 pt-6 text-center text-sm font-medium text-slate-700">{footer}</div>}
        </section>
      </div>
    </main>
  );
}
