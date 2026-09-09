"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";

// Keep the above-fold island independent of the full page's UI dependencies.
export default function LandingHero({ optimizedCopy = false }) {
  const router = useRouter();
  const handleRegisterClick = () => router.push("/trademark-register");
  return (
      <section data-customizer-old-section="hero" className="relative overflow-hidden bg-gradient-to-br from-[#eefbff] via-white to-[#e8f2ff]">
        <header className="border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,.04)]">
          <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-5 py-3 sm:py-4">
            <Image src="/images/legal-trademark-logo.webp" alt="Legal Trademark Office" width={170} height={72} className="h-auto w-28 sm:w-36" priority />
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="tel:+13104244909" className="hidden min-h-11 flex-col justify-center rounded-lg px-2 text-right focus:outline-none focus:ring-2 focus:ring-blue-500 md:inline-flex"><span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Questions?</span><span className="text-sm font-bold text-slate-800">+1 (310) 424-4909</span></Link>
              <button type="button" onClick={handleRegisterClick} className="min-h-11 rounded-xl bg-[#087fd3] px-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200 motion-reduce:transform-none motion-reduce:transition-none">Start Registration</button>
            </div>
          </div>
        </header>
        <div className="absolute -left-24 top-36 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:py-20 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#026daf]">U.S. trademark filing support</p>
          <h1 data-customizer-old-text="hero-title" className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-bold leading-[1.12] text-[#13233a] sm:text-5xl lg:text-[3.5rem]">Trademark Registration for Your Business Name, Logo or Slogan</h1>
          <p data-customizer-old-text="hero-copy" className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{optimizedCopy ? "Apply to register a U.S. trademark for your business name, logo or slogan through our guided filing-support process." : "Complete our guided questionnaire and our filing team will prepare your trademark application. Review and approve the details, then track documents and updates in your secure account."}</p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <button type="button" onClick={handleRegisterClick} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#087fd3] px-7 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200 motion-reduce:transform-none motion-reduce:transition-none">Start My Trademark Registration <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 motion-safe:animate-pulse motion-reduce:transition-none"><HiArrowRight aria-hidden="true" /></span></button>
            <p className="text-sm font-semibold text-slate-600">Service plans start at $49</p>
          </div>
          <div className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-700">{["Complete the application form", "We prepare your application", "Filed with the USPTO"].map((item, index) => <span key={item} className="inline-flex items-center gap-2"><span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-xs font-bold text-[#026daf]">{index + 1}</span>{item}</span>)}</div>
        </div>
      </section>
  );
}
