import Header from "@/components/ui/Header";
import FooterSection from "@/components/sections/FooterSection";
import FaqAccordion from "@/components/sections/FaqAccordion";
import LiveChatButton from "@/components/ui/LiveChatButton";
import Link from "next/link";
import { FaArrowRightLong, FaListCheck, FaMagnifyingGlass, FaRegMessage } from "react-icons/fa6";

export const metadata = {
  title: "Trademark Filing Support FAQs | Legal Trademark Office",
  description: "Get clear answers about U.S. trademark filing support, service plans, application preparation and what happens after you get started.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const topics = [
    [FaMagnifyingGlass, "Getting started", "Understand searches, marks and the first filing steps."],
    [FaListCheck, "Preparing an application", "See what information helps your filing move smoothly."],
    [FaRegMessage, "After you begin", "Learn how support and service updates work."],
  ];
  return <><Header /><main className="overflow-hidden bg-white">
    <section className="relative bg-gradient-to-b from-[#e9f8ff] via-white to-white px-5 pb-20 pt-28"><div className="soft-blob -right-20 top-8 bg-cyan-200" /><div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]"><div><p className="font-bold uppercase tracking-[0.18em] text-[#027DD6]">Trademark support, explained</p><h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">Answers That Help You Move Forward</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">Explore straightforward answers about trademark registration support, application preparation, service plans and what happens after you begin.</p><div className="mt-8 flex flex-col gap-4 sm:flex-row"><Link href="/trademark-registration" className="soft-primary-btn">View Registration Plans <FaArrowRightLong /></Link><LiveChatButton className="soft-secondary-btn" /></div></div><div className="grid gap-4">{topics.map(([Icon,title,copy])=><article key={title} className="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg"><div className="flex gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl text-[#027DD6]"><Icon /></span><div><h2 className="text-xl font-bold text-slate-900">{title}</h2><p className="mt-2 leading-6 text-slate-600">{copy}</p></div></div></article>)}</div></div></section>
    <section className="bg-[#f7fbff] px-5 py-24"><div className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><p className="font-bold uppercase tracking-[0.16em] text-[#027DD6]">Popular questions</p><h2 className="mt-3 text-4xl font-bold text-slate-900">What would you like to know?</h2><p className="mt-4 leading-7 text-slate-600">Open any question below for a clear, practical answer.</p></div><div className="mt-12"><FaqAccordion /></div></div></section>
    <section className="px-5 py-20"><div className="mx-auto max-w-5xl rounded-[2rem] bg-gradient-to-r from-[#087bc3] to-[#55c3e9] px-8 py-14 text-center text-white"><h2 className="text-3xl font-bold md:text-5xl">Ready to start your trademark registration?</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">Compare filing-support plans and choose the option that fits your brand.</p><Link href="/trademark-registration" className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-xl bg-white px-9 py-4 font-bold text-[#075A96]">Compare Plans <FaArrowRightLong /></Link></div></section>
    <FooterSection />
  </main></>;
}
