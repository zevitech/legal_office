"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HiArrowRight,
  HiCheck,
  HiOutlineChatAlt2,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineLockClosed,
  HiOutlineSearch,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { MdOutlineBusinessCenter } from "react-icons/md";
import { HiOutlinePhotograph, HiOutlineSparkles } from "react-icons/hi";

const plans = [
  {
    name: "Basic",
    price: "$49",
    label: "Essential preparation",
    features: ["Federal database search", "Application preparation", "Customer account tracking"],
  },
  {
    name: "Standard",
    price: "$149",
    label: "Most popular",
    featured: true,
    features: ["Federal and state search", "Three-business-day preparation", "Completeness review"],
  },
  {
    name: "Advanced",
    price: "$249",
    label: "Expanded support",
    features: ["Expanded search coverage", "Priority preparation", "Six months of monitoring"],
  },
];

const marks = [
  { id: "name", title: "Business name", copy: "The words customers use to recognize your business.", icon: MdOutlineBusinessCenter },
  { id: "logo", title: "Logo or design", copy: "A visual symbol, icon or stylized brand design.", icon: HiOutlinePhotograph },
  { id: "slogan", title: "Slogan", copy: "A memorable phrase associated with your brand.", icon: HiOutlineSparkles },
];

const buttonClass = "inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#087fd3] px-7 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200";

export default function ConversionPreview() {
  const [selectedMark, setSelectedMark] = useState("name");
  const [usage, setUsage] = useState("yes");

  const scrollToForm = () => document.getElementById("form-preview")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="sticky top-0 z-50 border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-950">
        Private conversion concept · no data is submitted · existing live pages are unchanged
      </div>

      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-4">
          <Image src="/images/legal-trademark-logo.webp" alt="Legal Trademark Office" width={170} height={72} className="h-auto w-32 sm:w-40" priority />
          <div className="flex items-center gap-3">
            <a href="tel:+13104244909" className="hidden text-sm font-semibold text-slate-700 sm:block">+1 (310) 424-4909</a>
            <button type="button" onClick={scrollToForm} className="rounded-xl bg-[#087fd3] px-4 py-3 text-sm font-bold text-white">Start Registration</button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-4 py-16 sm:py-20">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#026daF]">U.S. trademark filing support</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Trademark Registration for Your Business Name, Logo or Slogan
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Complete a guided questionnaire and our filing team will prepare your application for review. Approve the details, then follow documents and updates from your secure customer account.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={scrollToForm} className={buttonClass}>Start My Trademark Registration <HiArrowRight /></button>
            <p className="text-sm font-semibold text-slate-600">Service plans from $49 + USPTO filing fee</p>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-700">
            {["Review before submission", "Secure customer account", "No automatic renewal"].map((item) => <span key={item} className="inline-flex items-center gap-2"><HiCheck className="text-emerald-600" />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            [HiOutlineClipboardCheck, "Careful preparation", "Important application details organized before submission."],
            [HiOutlineSearch, "Search and classification", "Selected plan support for similar-mark searching and likely classes."],
            [HiOutlineChatAlt2, "Continued support", "Documents, messages and application updates in one account."],
          ].map(([Icon, title, copy]) => <article key={title} className="flex gap-4 rounded-2xl bg-slate-50 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-xl text-[#026daF]"><Icon /></span><div><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div></article>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daF]">Choose your mark</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">What would you like to protect?</h2></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {marks.map(({ id, title, copy, icon: Icon }) => <button key={id} type="button" onClick={() => setSelectedMark(id)} aria-pressed={selectedMark === id} className={`min-h-48 rounded-2xl border-2 p-6 text-left transition ${selectedMark === id ? "border-[#087fd3] bg-blue-50 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-blue-300"}`}><span className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${selectedMark === id ? "bg-[#087fd3] text-white" : "bg-slate-100 text-slate-600"}`}><Icon /></span><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#026daF]">{selectedMark === id ? <><HiCheck /> Selected</> : "Select"}</span></button>)}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daF]">Transparent service plans</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Choose the preparation level that fits</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">Every amount below is a service fee. The USPTO filing fee is handled separately after class review.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-3xl border-2 bg-white p-7 ${plan.featured ? "border-[#087fd3] shadow-xl shadow-blue-100" : "border-slate-200 shadow-sm"}`}>{plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#087fd3] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">Most popular</span>}<p className="text-sm font-bold text-[#026daF]">{plan.label}</p><h3 className="mt-2 text-2xl font-black">{plan.name}</h3><p className="mt-5 text-5xl font-black">{plan.price}</p><p className="mt-1 text-sm text-slate-500">service fee</p><ul className="mt-6 flex-1 space-y-3">{plan.features.map((item) => <li key={item} className="flex gap-3 text-sm text-slate-700"><HiCheck className="mt-0.5 shrink-0 text-emerald-600" />{item}</li>)}</ul><button type="button" onClick={scrollToForm} className={`mt-7 min-h-12 rounded-xl px-5 font-bold ${plan.featured ? "bg-[#087fd3] text-white" : "border-2 border-[#087fd3] text-[#026daF]"}`}>Choose {plan.name}</button></article>)}
          </div>
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center"><strong>Need expanded support?</strong> A Premium plan with broader search and monitoring can be selected as an optional upgrade—never automatically added.</div>
        </div>
      </section>

      <section id="form-preview" className="scroll-mt-16 bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daF]">Application preview</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Start with your trademark details</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">A shorter first step with a clear next action. This concept form does not submit information.</p></div>
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-wide text-[#026daF]">Step 1 of 4 · Trademark details</p><h3 className="mt-2 text-2xl font-black">Tell us about your mark</h3></div><span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#026daF]">About 2 minutes</span></div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/4 rounded-full bg-[#087fd3]" /></div>
              <fieldset className="mt-8"><legend className="text-base font-bold">What would you like to protect?</legend><div className="mt-4 grid gap-3 sm:grid-cols-3">{marks.map(({ id, title, icon: Icon }) => <button key={id} type="button" onClick={() => setSelectedMark(id)} aria-pressed={selectedMark === id} className={`flex min-h-24 items-center gap-3 rounded-xl border-2 p-4 text-left font-bold ${selectedMark === id ? "border-[#087fd3] bg-blue-50" : "border-slate-200 bg-white"}`}><Icon className="text-xl text-[#026daF]" />{title}{selectedMark === id && <HiCheck className="ml-auto text-emerald-600" />}</button>)}</div></fieldset>
              <label className="mt-7 block text-sm font-bold" htmlFor="preview-mark">Exact spelling of your mark</label><input id="preview-mark" placeholder="Example: NORTH & PINE" className="mt-2 min-h-14 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-base outline-none focus:border-[#087fd3] focus:ring-4 focus:ring-blue-100" />
              <fieldset className="mt-7"><legend className="text-sm font-bold">Are customers currently seeing this mark in business?</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{[["yes","Yes, it is in use"],["no","Not yet"]].map(([value,label]) => <button key={value} type="button" onClick={() => setUsage(value)} aria-pressed={usage === value} className={`min-h-14 rounded-xl border-2 px-4 text-left font-semibold ${usage === value ? "border-[#087fd3] bg-blue-50" : "border-slate-200"}`}>{label}{usage === value && <HiCheck className="float-right mt-1 text-emerald-600" />}</button>)}</div></fieldset>
              <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="inline-flex items-center gap-2 text-sm text-slate-600"><HiOutlineLockClosed className="text-lg text-emerald-600" /> Your answers remain editable</p><button type="button" className={`${buttonClass} w-full sm:w-auto`}>Continue to Owner Details <HiArrowRight /></button></div>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">{[[HiOutlineDocumentText,"Review every detail"],[HiOutlineShieldCheck,"Secure checkout"],[HiOutlineChatAlt2,"Support available"]].map(([Icon,label]) => <div key={label} className="flex items-center gap-3 rounded-xl bg-white p-4 font-semibold text-slate-700"><Icon className="text-xl text-[#026daF]" />{label}</div>)}</div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-8 text-slate-300"><div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"><p>Conversion concept only · Existing website remains unchanged</p><div className="flex gap-5"><span>Privacy</span><span>Terms</span><span>Refund policy</span></div></div></footer>
    </main>
  );
}
