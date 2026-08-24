import Header from "@/components/ui/Header";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";
import FooterSection from "@/components/sections/FooterSection";
import TMButton from "@/components/ui/TMButton";

export const metadata = {
  title: "Trademark Filing Services | Legal Trademark Office",
  description: "Compare U.S. trademark application, renewal and revival filing-support services, then choose the next step for your brand.",
  alternates: { canonical: "/services" },
};

const services = [
  ["Trademark Registration", "Turn your name, logo or slogan details into an organized U.S. trademark application prepared for your review.", "/trademark-registration", "Compare registration plans"],
  ["Trademark Renewal Support", "Organize registration details and maintenance information so your renewal filing can move forward with a clear checklist.", "/services/trademark-renewal", "Explore renewal support"],
  ["Trademark Revival Support", "Get filing support for an eligible application that needs a response or revival step after an abandonment notice.", "/services/trademark-revival", "Explore revival support"],
];

export default function ServicesPage() {
  return <><Header /><main className="bg-slate-100">
    <section className="bg-itBanner min-h-[78vh] bg-cover bg-bottom px-5 py-28 md:px-20 flex items-center"><div className="max-w-2xl space-y-6"><p className="font-semibold uppercase tracking-[0.18em] text-blue-100">U.S. trademark filing support</p><h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">Choose the Trademark Service That Fits Your Next Step</h1><p className="max-w-xl text-lg leading-8 text-slate-100">Start a new trademark application, organize a renewal, or get support with an eligible revival request through one clear process.</p><div className="flex flex-wrap gap-4"><TMButton px="80px" py="30px" text="Start Registration" /><Button as={Link} href="/contact-us" className="px-10 py-[30px] font-semibold text-white" variant="light" endContent={<FaArrowRightLong />}>Contact support</Button></div></div></section>
    <section className="px-5 py-20 md:py-28"><div className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><p className="font-semibold text-[#027DD6]">Select your service</p><h2 className="mt-2 text-3xl font-bold text-[#075A96] md:text-4xl">A focused path from details to filing</h2><p className="mt-4 text-lg text-slate-600">Each service is designed around a specific trademark filing need, with your information reviewed by you before submission.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{services.map(([title,copy,href,action], index)=><article key={title} className="flex min-h-[310px] flex-col rounded-2xl bg-white p-7 shadow-lg"><span className="text-sm font-bold text-[#027DD6]">0{index+1}</span><h2 className="mt-4 text-2xl font-bold text-[#075A96]">{title}</h2><p className="mt-4 flex-1 leading-7 text-slate-600">{copy}</p><Link href={href} className="mt-7 inline-flex items-center gap-2 font-semibold text-[#027DD6] hover:underline">{action} <FaArrowRightLong /></Link></article>)}</div></div></section>
    <section className="bg-[#E5F4FF] px-5 py-20 shadow-inner-md"><div className="mx-auto max-w-5xl text-center"><h2 className="text-3xl font-bold text-[#075A96]">Simple support. Clear customer control.</h2><div className="mt-10 grid gap-5 text-left md:grid-cols-3">{[["Share your details","Provide the mark, owner and goods or services information needed for the selected filing."],["Review the preparation","Check the organized application information and confirm changes before submission."],["Follow the next step","Receive filing or status information based on the service you selected."]].map(([title,copy])=><div key={title} className="rounded-xl bg-white p-6 shadow-sm"><h3 className="text-xl font-bold text-[#075A96]">{title}</h3><p className="mt-3 leading-7 text-slate-600">{copy}</p></div>)}</div><div className="mt-10"><TMButton px="80px" py="30px" text="Start Now" /></div></div></section>
    <FooterSection />
  </main></>;
}
