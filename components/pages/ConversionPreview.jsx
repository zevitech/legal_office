"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  HiArrowRight, HiCheck, HiChevronDown, HiOutlineBell,
  HiOutlineChatAlt2, HiOutlineClipboardCheck, HiOutlineClock,
  HiOutlineDocumentText, HiOutlineLockClosed, HiOutlineSearch,
} from "react-icons/hi";
import { LuBuilding2, LuFileSignature, LuImage } from "react-icons/lu";

const marks = [
  { id: "name", title: "Business name", copy: "The words customers use to recognize your business.", icon: LuBuilding2 },
  { id: "logo", title: "Logo or design", copy: "A visual symbol, icon or stylized brand design.", icon: LuImage },
  { id: "slogan", title: "Slogan", copy: "A memorable phrase associated with your brand.", icon: LuFileSignature },
];

const plans = [
  { name: "Basic", price: "$49", label: "Essential preparation", features: ["Federal database search", "Application preparation", "Customer account tracking"] },
  { name: "Standard", price: "$149", label: "Most selected", featured: true, features: ["Federal and state search", "Three-business-day preparation", "Completeness review"] },
  { name: "Advanced", price: "$249", label: "Expanded support", features: ["Expanded search coverage", "Priority preparation", "Six months of monitoring"] },
];

const faqs = [
  { question: "What is included in the service fee?", answer: "Your selected plan covers the preparation and support features shown in its package. Government filing fees are separate and are reviewed with you before submission." },
  { question: "Can I review the application before it is filed?", answer: "Yes. You review the filing details prepared from your questionnaire before the application is submitted." },
  { question: "Can I register a name, logo or slogan?", answer: "The guided application supports business names, logos or designs, and slogans. You choose the mark type when you begin." },
  { question: "How do I follow my application after checkout?", answer: "Your secure customer account keeps your documents, messages, status updates and required actions together in one place." },
];

const primaryButton = "inline-flex min-h-14 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087fd3] px-7 text-base font-bold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200 motion-reduce:transform-none motion-reduce:transition-none";

export default function ConversionPreview() {
  const router = useRouter();
  const [selectedMark, setSelectedMark] = useState("name");

  const startApplication = (mark = selectedMark) => {
    try { sessionStorage.setItem("lto_preselected_mark", mark); } catch {}
    router.push("/trademark-register");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <div data-customizer-section="preview-notice" className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-950">Private conversion preview · the current live landing page remains unchanged</div>

      <header data-customizer-section="header" className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-4">
          <Image src="/images/legal-trademark-logo.webp" alt="Legal Trademark Office" width={170} height={72} className="h-auto w-32 sm:w-40" priority />
          <div className="flex items-center gap-3">
            <a href="tel:+13104244909" className="hidden min-h-11 items-center text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:inline-flex">+1 (310) 424-4909</a>
            <button type="button" onClick={() => startApplication()} className="min-h-11 cursor-pointer rounded-xl bg-[#087fd3] px-4 text-sm font-bold text-white transition hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200">Start Registration</button>
          </div>
        </div>
      </header>

      <section data-customizer-section="hero" className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-4 py-14 sm:py-20 lg:py-24">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#026daf]">U.S. trademark filing support</p>
          <h1 data-customizer-text="hero-title" className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-black leading-[1.08] text-slate-900 sm:text-5xl lg:text-6xl">Trademark Registration for Your Business Name, Logo or Slogan</h1>
          <p data-customizer-text="hero-copy" className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Complete a guided questionnaire and our filing team will prepare your application for review. Approve the details, then follow documents and updates from your secure customer account.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={() => startApplication()} className={primaryButton}>Start My Trademark Registration <HiArrowRight aria-hidden="true" /></button>
            <p className="text-sm font-semibold text-slate-600">Service plans from $49 + USPTO filing fee</p>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-700">
            {["Review before submission", "Secure customer account", "No automatic renewal"].map((item) => <span key={item} className="inline-flex items-center gap-2"><HiCheck className="text-emerald-600" aria-hidden="true" />{item}</span>)}
          </div>
        </div>
      </section>

      <section data-customizer-section="benefits" className="border-b border-slate-200 bg-white px-4 py-7" aria-label="Service benefits">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[[HiOutlineClipboardCheck,"Prepared for review","Important details organized before submission."],[HiOutlineSearch,"Search and classification","Selected-plan support for likely classes and similar marks."],[HiOutlineLockClosed,"One secure account","Documents, messages and application updates together."]].map(([Icon,title,copy]) => <article key={title} className="flex gap-4 rounded-2xl bg-slate-50 p-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-xl text-[#026daf]"><Icon aria-hidden="true" /></span><div><h2 className="font-bold">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p></div></article>)}
        </div>
      </section>

      <section data-customizer-section="mark-selector" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daf]">Start with your mark</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">What would you like to register?</h2><p className="mt-3 text-slate-600">Choose one to begin. Your selection opens the real application questionnaire.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {marks.map(({id,title,copy,icon:Icon}) => <button key={id} type="button" onClick={() => setSelectedMark(id)} aria-pressed={selectedMark === id} className={`min-h-48 cursor-pointer rounded-2xl border-2 p-6 text-left transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 ${selectedMark === id ? "border-[#087fd3] bg-blue-50 shadow-lg shadow-blue-100" : "border-slate-200 bg-white hover:border-blue-300"}`}><span className={`grid h-12 w-12 place-items-center rounded-xl text-xl ${selectedMark === id ? "bg-[#087fd3] text-white" : "bg-slate-100 text-slate-600"}`}><Icon aria-hidden="true" /></span><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#026daf]">{selectedMark === id ? <><HiCheck aria-hidden="true" /> Selected</> : "Select"}</span></button>)}
        </div>
        <div className="mt-7 text-center"><button type="button" onClick={() => startApplication()} className={primaryButton}>Continue with {marks.find((mark) => mark.id === selectedMark)?.title} <HiArrowRight aria-hidden="true" /></button></div>
      </section>

      <section data-customizer-section="process" className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daf]">A clear path forward</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">From questionnaire to application tracking</h2></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[["01",HiOutlineSearch,"Search and organize","Share your mark and business activities. The search level depends on your selected plan."],["02",HiOutlineDocumentText,"Prepare and approve","Your filing information is organized for review, and you approve the details before submission."],["03",HiOutlineBell,"Follow your application","Access documents, messages, status updates and required actions from your customer account."]].map(([number,Icon,title,copy]) => <article key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-black tracking-[.16em] text-blue-500">{number}</span><Icon className="mt-5 text-3xl text-[#087fd3]" aria-hidden="true" /><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section data-customizer-section="pricing" className="px-4 py-16 sm:py-20" id="packages">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daf]">Transparent service plans</p><h2 className="mt-2 text-3xl font-black sm:text-4xl">Choose the preparation level that fits</h2><p className="mt-3 text-slate-600">The amounts below are service fees. Government filing fees are reviewed separately before submission.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => <article key={plan.name} className={`relative flex flex-col rounded-3xl border-2 bg-white p-7 ${plan.featured ? "border-[#087fd3] shadow-xl shadow-blue-100" : "border-slate-200 shadow-sm"}`}>{plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#087fd3] px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">Most selected</span>}<p className="text-sm font-bold text-[#026daf]">{plan.label}</p><h3 className="mt-2 text-2xl font-black">{plan.name}</h3><p className="mt-5 text-5xl font-black">{plan.price}</p><p className="mt-1 text-sm text-slate-500">service fee</p><ul className="mt-6 flex-1 space-y-3">{plan.features.map((item) => <li key={item} className="flex gap-3 text-sm text-slate-700"><HiCheck className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}</ul><button type="button" onClick={() => startApplication()} className={`mt-7 min-h-12 cursor-pointer rounded-xl px-5 font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-200 ${plan.featured ? "bg-[#087fd3] text-white hover:bg-[#026bb5]" : "border-2 border-[#087fd3] text-[#026daf] hover:bg-blue-50"}`}>Choose {plan.name}</button></article>)}
          </div>
        </div>
      </section>

      <section data-customizer-section="account" className="bg-[#062b47] px-4 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div><p className="text-sm font-bold uppercase tracking-[.14em] text-cyan-300">Included customer account</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Know what happens after checkout</h2><p className="mt-5 max-w-xl leading-7 text-slate-200">Your receipt is immediate. Then your account keeps the preparation, approval and application-following steps visible in one place.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{[[HiOutlineClock,"Application timeline"],[HiOutlineDocumentText,"Secure documents"],[HiOutlineBell,"Status notifications"],[HiOutlineChatAlt2,"Team messages"]].map(([Icon,label]) => <div key={label} className="flex min-h-24 items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-5"><span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300 text-xl text-[#062b47]"><Icon aria-hidden="true" /></span><span className="font-bold">{label}</span></div>)}</div>
        </div>
      </section>

      <section data-customizer-section="faq" className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-sm font-bold uppercase tracking-[.14em] text-[#026daf]">Questions before starting</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">Straight answers to common questions</h2><p className="mt-4 leading-7 text-slate-600">Everything essential without making you search through a long resource page.</p></div>
          <div className="space-y-3">{faqs.map((faq) => <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">{faq.question}<HiChevronDown className="shrink-0 text-xl text-[#087fd3] transition group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" /></summary><p className="pt-3 text-sm leading-6 text-slate-600">{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section data-customizer-section="final-cta" className="bg-gradient-to-r from-[#07395c] to-[#087fd3] px-4 py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left"><div><p className="text-sm font-bold uppercase tracking-[.14em] text-cyan-200">Ready when you are</p><h2 className="mt-2 text-3xl font-black">Start your trademark registration questionnaire</h2><p className="mt-3 text-blue-50">Choose your mark, review the available plans and continue through the secure application.</p></div><button type="button" onClick={() => startApplication()} className="inline-flex min-h-14 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 font-bold text-[#026daf] shadow-lg transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-cyan-200 motion-reduce:transform-none motion-reduce:transition-none">Start My Application <HiArrowRight aria-hidden="true" /></button></div>
      </section>

      <footer data-customizer-section="footer" className="border-t border-slate-200 bg-white px-4 py-8 text-slate-600"><div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"><p>Legal Trademark Office</p><div className="flex flex-wrap gap-5"><a className="hover:text-[#026daf]" href="/legal/privacy">Privacy</a><a className="hover:text-[#026daf]" href="/legal/terms">Terms</a><a className="hover:text-[#026daf]" href="/legal/refund-policy">Refund policy</a></div></div></footer>

      <div data-customizer-section="mobile-cta" className="sticky bottom-0 z-40 border-t border-blue-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,.12)] backdrop-blur sm:hidden"><button type="button" onClick={() => startApplication()} className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#087fd3] px-5 font-bold text-white focus:outline-none focus:ring-4 focus:ring-blue-200">Start Registration <HiArrowRight aria-hidden="true" /></button></div>
    </main>
  );
}
