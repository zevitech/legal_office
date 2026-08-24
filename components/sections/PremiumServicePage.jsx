import Header from "@/components/ui/Header";
import FooterSection from "@/components/sections/FooterSection";
import Link from "next/link";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";

export default function PremiumServicePage({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel = "Contact support",
  secondaryHref = "/contact-us",
  visualTitle,
  visualItems,
  trustItems,
  sectionEyebrow,
  sectionTitle,
  sectionDescription,
  benefits,
  process,
  highlightTitle,
  highlightDescription,
  highlightItems,
  closingTitle,
  closingDescription,
}) {
  return <><Header /><main className="overflow-hidden bg-[#f7faff]">
    <section className="premium-hero relative isolate px-5 pb-24 pt-28 text-white md:pb-28 md:pt-32">
      <div className="premium-orb premium-orb-one" aria-hidden="true" />
      <div className="premium-orb premium-orb-two" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
        <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">{eyebrow}</p><h1 className="mt-5 text-4xl font-bold leading-[1.08] md:text-5xl lg:text-[54px]">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50/90">{description}</p><div className="mt-9 flex flex-col gap-4 sm:flex-row"><Link href={primaryHref} className="premium-button inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-[#075A96] shadow-xl">{primaryLabel}<FaArrowRightLong aria-hidden="true" /></Link><Link href={secondaryHref} className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">{secondaryLabel}</Link></div></div>
        <div className="premium-stage relative mx-auto w-full max-w-[520px]" aria-label={visualTitle}>
          <div className="premium-glow" aria-hidden="true" />
          <div className="premium-card-main"><div className="flex items-center justify-between"><span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#075A96]">Filing support</span><span className="premium-status-dot" aria-hidden="true" /></div><h2 className="mt-7 text-2xl font-bold text-slate-900">{visualTitle}</h2><div className="mt-6 space-y-4">{visualItems.map((item,index)=><div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#027DD6] text-white">{index+1}</span>{item}</div>)}</div></div>
          <div className="premium-float-card premium-float-top"><span className="text-xs font-bold uppercase tracking-wide text-cyan-700">Customer control</span><p className="mt-1 font-bold text-slate-900">Review before submission</p></div>
          <div className="premium-float-card premium-float-bottom"><span className="flex items-center gap-2 font-bold text-slate-900"><FaCheck className="text-emerald-500" /> Clear next step</span></div>
        </div>
      </div>
    </section>

    <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5"><div className="grid overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl md:grid-cols-3">{trustItems.map(([title,copy])=><div key={title} className="border-b border-blue-100 p-7 last:border-0 md:border-b-0 md:border-r"><p className="font-bold text-[#075A96]">{title}</p><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></div>)}</div></section>

    <section className="px-5 py-24 md:py-32"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="font-bold uppercase tracking-[0.18em] text-[#027DD6]">{sectionEyebrow}</p><h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">{sectionTitle}</h2><p className="mt-5 text-lg leading-8 text-slate-600">{sectionDescription}</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{benefits.map(([title,copy],index)=><article key={title} className="premium-feature-card group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-[#027DD6]">0{index+1}</span><h3 className="mt-5 text-2xl font-bold text-slate-900">{title}</h3><p className="mt-4 leading-7 text-slate-600">{copy}</p><div className="mt-7 h-1 w-12 rounded-full bg-gradient-to-r from-[#027DD6] to-cyan-400 transition-all group-hover:w-24" /></article>)}</div></div></section>

    <section className="bg-[#071f38] px-5 py-24 text-white md:py-28"><div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-bold uppercase tracking-[0.18em] text-cyan-300">How it works</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">From your details to a clear filing step</h2><p className="mt-5 leading-7 text-blue-100/80">A structured workflow keeps preparation moving while you remain in control of the information.</p></div><ol className="space-y-5">{process.map(([title,copy],index)=><li key={title} className="premium-process-row grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-[52px_1fr]"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-[#027DD6] text-lg font-bold">{index+1}</span><div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 leading-7 text-blue-100/75">{copy}</p></div></li>)}</ol></div></section>

    <section className="px-5 py-24 md:py-32"><div className="premium-highlight mx-auto grid max-w-6xl items-center gap-12 overflow-hidden rounded-[2rem] p-8 md:grid-cols-2 md:p-14"><div><p className="font-bold uppercase tracking-[0.18em] text-[#027DD6]">Built for confidence</p><h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{highlightTitle}</h2><p className="mt-5 leading-8 text-slate-600">{highlightDescription}</p></div><div className="grid gap-4">{highlightItems.map(item=><div key={item} className="flex items-center gap-4 rounded-2xl border border-white bg-white/80 p-5 shadow-sm backdrop-blur"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><FaCheck /></span><span className="font-semibold text-slate-800">{item}</span></div>)}</div></div></section>

    <section className="px-5 pb-24"><div className="premium-closing mx-auto max-w-6xl rounded-[2rem] px-7 py-16 text-center text-white md:px-16"><h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-5xl">{closingTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-50/85">{closingDescription}</p><Link href={primaryHref} className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-xl bg-white px-9 py-4 font-bold text-[#075A96] shadow-xl">{primaryLabel}<FaArrowRightLong /></Link></div></section>
    <FooterSection />
  </main></>;
}
