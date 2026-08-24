"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiArrowRight, HiCheck, HiOutlineClipboardCheck, HiOutlineSearch, HiOutlineSupport } from "react-icons/hi";
import LandingPage from "./LandingPage";

const buttonClass =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#087fd3] px-7 text-base font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-[#026bb5] focus:outline-none focus:ring-4 focus:ring-blue-200";

export default function ConversionPreview() {
  const router = useRouter();

  const startApplication = () => {
    try {
      sessionStorage.setItem("lto_preselected_mark", "name");
    } catch {}
    router.push("/trademark-register");
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-950">
        Private conversion preview · the current live landing page remains unchanged
      </div>

      <header className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between gap-4 py-4">
          <Image
            src="/images/legal-trademark-logo.webp"
            alt="Legal Trademark Office"
            width={170}
            height={72}
            className="h-auto w-32 sm:w-40"
            priority
          />
          <div className="flex items-center gap-3">
            <a href="tel:+13104244909" className="hidden text-sm font-semibold text-slate-700 sm:block">
              +1 (310) 424-4909
            </a>
            <button type="button" onClick={startApplication} className="rounded-xl bg-[#087fd3] px-4 py-3 text-sm font-bold text-white">
              Start Registration
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-white to-blue-100 px-4 py-14 sm:py-20">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-blue-200/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.16em] text-[#026daf]">U.S. trademark filing support</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-balance text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Trademark Registration for Your Business Name, Logo or Slogan
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Complete a guided questionnaire and our filing team will prepare your application for review. Approve the details, then follow documents and updates from your secure customer account.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button type="button" onClick={startApplication} className={buttonClass}>
              Start My Trademark Registration <HiArrowRight />
            </button>
            <p className="text-sm font-semibold text-slate-600">Service plans from $49 + USPTO filing fee</p>
          </div>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-700">
            {["Review before submission", "Secure customer account", "No automatic renewal"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <HiCheck className="text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            [HiOutlineClipboardCheck, "Careful preparation", "Important application details organized before submission."],
            [HiOutlineSearch, "Search and classification", "Selected-plan support for similar-mark searching and likely classes."],
            [HiOutlineSupport, "Continued support", "Documents, messages and application updates in one secure account."],
          ].map(([Icon, title, copy]) => (
            <article key={title} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-xl text-[#026daf]">
                <Icon />
              </span>
              <div>
                <h2 className="font-bold">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="conversion-full-content">
        <LandingPage />
      </div>

      <style jsx global>{`
        .conversion-full-content > section:first-child {
          display: none;
        }
      `}</style>
    </main>
  );
}
