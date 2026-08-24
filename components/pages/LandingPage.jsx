"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LandingHeader from "../ui/LandingHeader";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HowWorkCard from "../ui/HowWorkCard";
import { AiOutlineDoubleRight } from "react-icons/ai";
import BenefitCard from "../ui/BenefitCard";
import Link from "next/link";
import { LuCopyright } from "react-icons/lu";
import ClientSection from "../ui/ClientSection";
import WhyChooseCard from "../ui/WhyChooseCard";
import WhyChooseInfo from "../ui/WhyChooseInfo";
import { FaAnglesDown } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import HeaderText from "../ui/HeaderText";
import { HiOutlineBell, HiOutlineChatAlt2, HiOutlineDocumentText, HiOutlineShieldCheck } from "react-icons/hi";
import { LuBuilding2, LuFileSignature, LuImage, LuVolume2 } from "react-icons/lu";

const PackageCard2 = dynamic(() => import("../ui/PackageCard2"), {
  loading: () => <div className="mx-auto my-10 h-40 max-w-6xl animate-pulse rounded-3xl bg-slate-100" />,
});
const AccordionBox = dynamic(() => import("../ui/AccordionBox"), {
  loading: () => <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />,
});
const TestimonialCarousel = dynamic(() => import("../ui/TestimonialCarousel"), {
  ssr: false,
  loading: () => <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-100" />,
});

const PROTECTION_OPTIONS = [
  { value: "name", title: "Business name", description: "Protect the words customers use to identify your business.", icon: LuBuilding2 },
  { value: "logo", title: "Logo or design", description: "Protect a symbol, icon or stylized visual identity.", icon: LuImage },
  { value: "slogan", title: "Slogan", description: "Protect a memorable phrase connected with your brand.", icon: LuFileSignature },
  { value: "sound", title: "Sound mark", description: "Protect a distinctive jingle, tone or audio signature.", icon: LuVolume2 },
];

const LandingPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const [selectedProtection, setSelectedProtection] = useState("name");
  const [dashboardOpen, setDashboardOpen] = useState(false);

  useEffect(() => {
    if (!dashboardOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => event.key === "Escape" && setDashboardOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [dashboardOpen]);

  const handleRegisterClick = () => {
    setIsLoading(true);
    router.push("/trademark-register");
  };

  const handleProtectionStart = () => {
    try {
      sessionStorage.setItem("lto_preselected_mark", selectedProtection);
    } catch {}
    handleRegisterClick();
  };

  // Function to open Tawk.to chat
  // const handleOpenChat = () => {
  //   if (window.Tawk_API && window.Tawk_API.maximize) {
  //     window.Tawk_API.maximize();
  //   }
  // };

  // Function to open Live Chat
  const handleOpenChat = () => {
    if (
      window.LiveChatWidget &&
      typeof window.LiveChatWidget.call === "function"
    ) {
      window.LiveChatWidget.call("maximize");
    } else {
      console.warn("LiveChat not ready yet.");
    }
  };

  return (
    <>
      {/* hero section */}
      <section className="relative w-full bg-of-hero pb-20 max-md:pb-10 backdrop-brightness-150">
        <div className="heroBg absolute"></div>
        <div>
          <LandingHeader />
          <div className="flex-center mt-8 max-md:mt-4">
            <div className="flex flex-col gap-5 max-md:gap-2 max-w-[1000px] px-2">
              <h1 className="text-slate-800 text-5xl max-md:text-2xl leading-tight font-bold text-center">
                Register Your Business Name, Slogan or Logo as a Trademark
              </h1>
              <h2 className="text-slate-700 text-2xl font-bold text-center">
                <span className="text-[44px]  max-md:text-2xl text-[#025da0]">
                  Starting at $49 + USPTO Filing Fee
                </span>
              </h2>
              <p className="text-slate-700 mt-4 text-center max-w-[80%] max-md:max-w-full px-2 m-auto">
                Use our guided questionnaire to prepare a business name, slogan
                or logo trademark application, review the filing details before
                submission, and follow your application from one secure customer
                account.
              </p>
            </div>
          </div>
          <div className="flex-center mt-16 max-md:mt-10 w-[80%] m-auto">
            <Button
              color="primary"
              radius="sm"
              onClick={handleRegisterClick}
              isLoading={isLoading}
              className="hero-cta w-full max-w-sm bg-primary-theme px-8 py-8 text-lg font-bold text-white hover:bg-primary-hovered"
            >
              Trademark Now
            </Button>
          </div>
        </div>
        <div className="flex-center mt-12">
          <div className="flex flex-wrap items-center justify-center gap-6 px-4 max-md:gap-4">
            <Image
              src={"/images/trustpilot-logo.webp"}
              alt="Trustpilot Review"
              width={110}
              height={40}
              className="w-26 h-12 max-md:w-14 max-md:h-auto"
            />
            <Image
              src={"/images/Untitled-design-1.webp"}
              alt="Google Review"
              width={110}
              height={40}
              className="w-24 h-16 max-md:w-14 max-md:h-auto"
            />
            {/* <Image
              src={"/images/Seal_of_the_United_States_Patent.png"}
              alt="Seal of the United States patient"
              width={110}
              height={40}
              className="w-20 h-20 max-md:w-14 max-md:h-auto"
            /> */}
            <Image
              src={"/images/accredited-business.jpg"}
              alt="trustpilot"
              width={110}
              height={40}
              className="w-24 h-10 max-md:w-14 max-md:h-auto"
            />
            <Image
              src={
                "/images/Advisor-logo_2-line_Profile-V2-e1589299562467-removebg-preview.webp"
              }
              alt="Forbes"
              width={110}
              height={40}
              className="w-24 h-10 max-md:w-14 max-md:h-auto"
            />
            {/* <Image
              src={"/images/seal-cs-grnte.png"}
              alt="Forbes"
              width={110}
              height={110}
              className="w-26 h-24"
            /> */}
          </div>
        </div>
      </section>

      {/* clients or partner section */}
      <ClientSection />

      {/* interactive protection selector */}
      <section className="mx-auto mt-20 max-w-6xl px-4 max-md:mt-14">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[.14em] text-[#025da0]">Start with your mark</p>
          <h2 className="mt-2 text-4xl font-bold text-slate-800 max-md:text-3xl">What would you like to protect?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Choose one to begin. You can add other mark types during the application.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROTECTION_OPTIONS.map(({ value, title, description, icon: Icon }) => {
            const selected = selectedProtection === value;
            return <button key={value} type="button" aria-pressed={selected} onClick={() => setSelectedProtection(value)} className={`min-h-52 rounded-2xl border-2 p-5 text-left transition ${selected ? "border-[#025da0] bg-blue-50 shadow-lg shadow-blue-100" : "border-slate-200 bg-white hover:border-blue-300"}`}><span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${selected ? "bg-[#025da0] text-white" : "bg-slate-100 text-slate-600"}`}><Icon /></span><h3 className="mt-6 text-lg font-bold text-slate-800">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p><span className={`mt-4 inline-block text-sm font-bold ${selected ? "text-[#025da0]" : "text-slate-500"}`}>{selected ? "✓ Selected" : "Select"}</span></button>;
          })}
        </div>
        <div className="mt-7 flex justify-center"><Button onClick={handleProtectionStart} isLoading={isLoading} className="w-full max-w-sm bg-primary-theme px-8 py-7 text-lg font-bold text-white shadow-lg shadow-blue-200 hover:bg-primary-hovered">Trademark Now</Button></div>
      </section>

      {/* how it's work section */}
      <section className="flex-center mt-24 max-md:mt-20 max-md:w-full">
        <div className="flex flex-col gap-16 max-md:gap-8">
          <div className="text-center flex flex-col gap-4  max-md:px-3">
            <h2 className="text-4xl text-[#025da0] font-bold max-md:text-3xl">
              Start Your U.S. Trademark in 3 Easy Steps
            </h2>
            <p className="text-base text-slate-600 md:max-w-[50%] m-auto">
              Our guided process supports businesses across retail, e-commerce,
              professional services, technology and many other industries.
            </p>
            <Image
              src={"/images/curve-DplsLMf8.webp"}
              width={300}
              height={10}
              alt="curve line"
              className="m-auto max-md:w-56"
            />
          </div>
          <div className="flex-center">
            <div className="flex-center gap-4 max-md:flex-col">
              <HowWorkCard
                step={1}
                title={` Search and Review`}
                description={`The search level included in your selected plan helps identify potentially similar marks before your application is prepared. No search can guarantee USPTO approval.`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4 max-md:hidden" />
              <FaAnglesDown className="text-3xl text-[#025da0] font-thin animate-down-to-r mt-4 md:hidden" />
              <HowWorkCard
                step={2}
                title={` Prepare and Approve`}
                description={`Your information, business activities and likely classes are reviewed with you. You approve the final filing details and separate government fees before submission.`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4 max-md:hidden" />
              <FaAnglesDown className="text-3xl text-[#025da0] font-thin animate-down-to-r mt-4 md:hidden" />
              <HowWorkCard
                step={3}
                title={` Track Your Application`}
                description={`After filing, receive status updates, access documents and see required actions from your customer account. Additional response services are quoted separately when required.`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* filing readiness section */}
      <section className="mx-auto mt-24 max-w-6xl px-4 max-md:mt-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.14em] text-primary-theme">Prepare with confidence</p>
              <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-800 max-md:text-2xl">Avoid common filing problems.</h2>
              <p className="mt-4 leading-7 text-slate-600">The USPTO may raise questions when important details are incomplete or inconsistent. Our guided application helps collect the information needed for review before filing.</p>
              <Button onClick={handleRegisterClick} isLoading={isLoading} className="mt-6 bg-primary-theme px-8 py-6 font-bold text-white hover:bg-primary-hovered">Start Your Application</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["A similar existing trademark", "Incorrect goods or services class", "Unclear business activity description", "Incomplete ownership information", "Weak or unsuitable proof of use", "Missing application details"].map((item) => (
                <div key={item} className="flex min-h-16 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  <span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blue-100 text-primary-theme">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* customer account preview */}
      <section className="mx-auto mt-24 max-w-6xl px-4 max-md:mt-16">
        <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-xl shadow-blue-100/50 md:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.14em] text-[#025da0]">Included customer account</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-800 max-md:text-2xl">Stay connected after checkout.</h2>
              <p className="mt-4 leading-7 text-slate-600">Follow application milestones, receive required-action reminders, access documents and communicate with your support team in one secure place.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Application timeline", "Secure documents", "Status notifications", "Team messages"].map((item) => <div key={item} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm"><HiOutlineShieldCheck className="text-lg text-[#025da0]" />{item}</div>)}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row"><Button onClick={handleRegisterClick} isLoading={isLoading} className="bg-primary-theme px-8 py-6 font-bold text-white hover:bg-primary-hovered">Start Your Application</Button><Button onClick={() => setDashboardOpen(true)} variant="bordered" className="border-2 border-primary-theme px-8 py-6 font-bold text-primary-theme hover:bg-blue-50">View Sample Dashboard</Button></div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
              <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-[#025da0]">My trademark</p><h3 className="mt-1 text-xl font-bold text-slate-900">NORTH & PINE</h3></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">Review in progress</span></div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[45%] rounded-full bg-[#025da0]" /></div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center"><div className="rounded-xl bg-blue-50 p-3"><HiOutlineDocumentText className="mx-auto text-2xl text-[#025da0]" /><p className="mt-2 text-xs font-bold">Documents</p></div><div className="rounded-xl bg-violet-50 p-3"><HiOutlineChatAlt2 className="mx-auto text-2xl text-violet-700" /><p className="mt-2 text-xs font-bold">Messages</p></div><div className="rounded-xl bg-emerald-50 p-3"><HiOutlineBell className="mx-auto text-2xl text-emerald-700" /><p className="mt-2 text-xs font-bold">Updates</p></div></div>
              <div className="mt-4 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">Current step</p><p className="mt-1 font-bold text-slate-800">Classification review</p><p className="mt-1 text-xs text-slate-500">Your selected business activities are being reviewed.</p></div>
            </div>
          </div>
        </div>
      </section>

        <section className="py-10 max-md:px-2 mb-[5rem]">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto  max-md:px-3">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center max-md:text-start">
              Simplify your budgeting with our transparent and straightforward
              business pricing plan, designed to support your growth.
            </p>
          </div>
          <PackageCard2 />
          <div className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            <strong className="text-slate-900">Refund and cancellation summary:</strong> You may request cancellation before substantive preparation begins. Completed work, third-party costs and government fees may be non-refundable. Review the full <Link className="font-bold text-[#025da0] underline" href="/legal/refund-policy">Refund Policy</Link> and <Link className="font-bold text-[#025da0] underline" href="/legal/terms">Terms</Link> before purchase.
          </div>
        </section>

      {/* after-payment timeline */}
      <section className="mx-auto mt-24 max-w-6xl px-4 max-md:mt-16">
        <div className="text-center"><p className="text-sm font-bold uppercase tracking-[.14em] text-[#025da0]">After checkout</p><h2 className="mt-2 text-4xl font-bold text-slate-800 max-md:text-3xl">Know what happens next.</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">Your receipt is immediate, and your account keeps every following step visible.</p></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
          ["1", "Payment confirmed", "Receive your receipt and account access."],
          ["2", "Information reviewed", "Your mark, owner details and activities are checked."],
          ["3", "Approve filing details", "Confirm classes, filing information and separate fees."],
          ["4", "Track online", "See documents, messages, status and required actions."],
        ].map(([number, title, description]) => <div key={number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#025da0] font-bold text-white">{number}</span><h3 className="mt-5 text-lg font-bold text-slate-800">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}</div>
      </section>

      {/* benefit section */}
      <section className="mt-24 max-md:mt-20">
        <div className="text-center flex flex-col gap-4 mb-16 max-md:mb-10 max-md:px-5">
          <h2 className="text-4xl max-md:text-3xl text-[#025da0] font-bold">
            Why Choose Us
          </h2>
          <p className="text-base text-slate-600 md:max-w-[50%] m-auto">
            Clear preparation, transparent communication and ongoing status
            updates help you make informed decisions throughout the process.
          </p>
          <Image
            src={"/images/curve-DplsLMf8.webp"}
            width={300}
            height={10}
            alt="curve line"
            className="m-auto max-md:w-56"
          />
        </div>
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
              <BenefitCard
                title={`Expertise You Can Trust`}
                description={`Our team of seasoned trademark professionals brings years of experience to ensure your brand
is protected with precision. We stay abreast of the latest legal developments to provide you with
expert guidance every step of the way.`}
                icon={`hand`}
              />
              <BenefitCard
                title={`Comprehensive Trademark Services
`}
                description={`We offer a full spectrum of trademark services, from name searches and registration to
monitoring and enforcement. Our all-inclusive approach ensures that all aspects of your
trademark needs are addressed efficiently and effectively.`}
                icon={`registered`}
              />
              <BenefitCard
                title={`Personalized Support for Your Brand`}
                description={`We understand that every brand is unique. Our personalized approach means we tailor our
services to fit your specific needs, providing dedicated support and customized solutions to
safeguard your intellectual property.`}
                icon={`scale`}
              />
              <BenefitCard
                title={`Fast and Reliable Registration Process
`}
                description={`Our streamlined registration process is designed to be quick and dependable, minimizing delays
and maximizing efficiency. We handle all the details to ensure a smooth experience from start to
finish, so you can focus on growing your business.`}
                icon={`trademark`}
              />
          </div>
          <div className="hidden justify-center xl:flex">
            <Image
              src={"/images/Attorney.png"}
              alt="Trademark professional reviewing an application"
              width={280}
              height={400}
              className="h-auto w-full max-w-[280px] rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* contact us section */}
      <section className="mt-28 bg-of-hero py-12 max-md:mt-20 max-md:py-16">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-2 lg:gap-16">
          <div className="flex w-full justify-end">
            <div>
              <h2 className="text-slate-700 font-semibold text-2xl">
                {`Before someone else files for your name, why don't you get it?`}
              </h2>
              <p className="text-slate-700 text-base mt-2 mb-6">
                {`Protect your brand before it's too late. Schedule a free
                consultation with a qualified legal professional to discuss your
                trademark needs and explore your options. Unsure of the next
                steps? We're here to guide you through every part of the
                process.`}
              </p>
            </div>
            {/* <Image
              src={"/images/assistant.webp"}
              alt="Trust Pilot"
              width={80}
              height={200}
              className="rounded-2xl md:ml-5"
            /> */}
          </div>
          <div className="flex w-full justify-start text-slate-800 lg:justify-center">
            <div>
              <p className="font-semibold text-lg mb-1">
                Call Now for a Free Consultation:
              </p>
              <Link
                href={"tel:+13104244909"}
                className="text-blue-700 font-semibold text-3xl"
              >
                +1 (310) 424 4909
              </Link>
              <p className="text-slate-800">
                All of our experts are based in the U.S.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-center mt-7 w-full">
          <Button
            color="primary"
            variant="shadow"
            radius="sm"
            onClick={() => handleOpenChat()}
            isLoading={chatLoader}
            className="px-7"
            startContent={<IoChatbubblesOutline className="text-2xl" />}
          >
            Live Chat
          </Button>
        </div>
      </section>

      {/* faq section */}
      <section className="mt-28 flex justify-center max-md:mt-20">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <div className="w-full">
            <div className="text-center flex flex-col gap-4 ">
              <h2 className="text-4xl text-[#025da0] font-bold">FAQs</h2>
              <p className="text-base text-slate-600">
                {`Protect Your Brand with Confidence - Expert Trademark Services Made Simple.`}
              </p>
              <Image
                src={"/images/curve-DplsLMf8.webp"}
                width={200}
                height={10}
                alt="curve line"
                className="m-auto"
              />
              <Image
                src={"/images/faq-image.jpg"}
                width={450}
                height={300}
                alt="curve line"
                className="m-auto mt-6"
              />
            </div>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-10">
            <p>
              {`Our FAQ section provides clear and concise answers to common questions about trademark registration and protection. Whether you're curious about the application process, fees, or how to handle trademark disputes, we've got you covered. Explore our FAQs to get quick and reliable information.`}
            </p>
            <div className="flex flex-col gap-2">
              <AccordionBox />
            </div>
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="flex flex-col gap-16 max-md:gap-14 mt-28 max-md:mt-20 bg-slate-50 py-24 max-md:py-20">
        <div className="text-center flex flex-col gap-4 max-md:px-5">
          <h2 className="text-4xl max-md:text-3xl text-[#025da0] font-bold">
            Trusted by clients in over 20 countries
          </h2>
          <p className="text-base text-slate-600">
            {`Collectively, Legal Trademark Office® attorneys have unparalleled trademark experience and great reviews.`}
          </p>
          <Image
            src={"/images/curve-DplsLMf8.webp"}
            width={300}
            height={10}
            alt="curve line"
            className="m-auto max-md:w-56"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="mx-auto w-full max-w-4xl px-4">
            <div className="grid w-full grid-cols-1 overflow-hidden rounded-xl bg-white shadow-md sm:grid-cols-3">
              <WhyChooseCard number={`12+`} title={`Years Experience`} />
              <WhyChooseCard number={`99%`} title={`Customer Approval`} />
              <WhyChooseCard number={`7k+`} title={`Trademarks Managed`} />
            </div>
          </div>
          <div className="mx-4 mt-10 grid grid-cols-2 gap-4 border-t-1 pt-9 sm:grid-cols-3 lg:mx-14 lg:grid-cols-6">
            <WhyChooseInfo
              image={`pi-01.png`}
              title={`Unlimited Customer Service`}
            />
            <WhyChooseInfo image={`pi-02.png`} title={`Simple Process`} />
            <WhyChooseInfo
              image={`pi-03.png`}
              title={`No Hidden Costs or Fees`}
            />
            <WhyChooseInfo
              image={`pi-04.png`}
              title={`100% Satisfaction Guaranteed`}
            />
            <WhyChooseInfo
              image={`pi-05.png`}
              title={`Best Trademark Search Platform`}
            />
            <WhyChooseInfo image={`pi-06.png`} title={`We're Affordable`} />
          </div>
        </div>
        <div className="flex-center max-md:mt-7">
          <Button
            color="primary"
            radius="sm"
            onClick={handleRegisterClick}
            isLoading={isLoading}
            className="w-full max-w-sm bg-primary-theme px-8 py-8 text-lg font-bold text-white shadow-lg shadow-blue-200 hover:bg-primary-hovered"
          >
            Start Your Application
          </Button>
        </div>
      </section>

      {/* testimonial section  */}
      <section className="flex-center max-md:flex-col gap-28 max-md:gap-10 mt-24 max-md:mt-16">
        <div className="flex">
          <div className="flex-center gap-2 flex-col">
            <h2 className="text-2xl font-bold text-slate-800">Excellent</h2>
            <Image
              src={"/images/trustpilot-5star.jpg"}
              alt="Trust Pilot"
              width={180}
              height={40}
            />
            <p className="text-xs text-slate-600 mb-1">Based on 142 reviews</p>
            <Image
              src={"/images/trustpilot-logo.jpg"}
              alt="Trust Pilot"
              width={110}
              height={20}
            />
          </div>
        </div>
        <div className="max-md:w-full">
          <TestimonialCarousel />
        </div>
      </section>

      {/* footer section */}
      <footer className="mt-28 max-md:mt-20 bg-footer w-full bg-no-repeat bg-cover relative">
        <div className="footer-overly"></div>
        <div className="pt-20 z-30 relative">
          <div className="flex-center">
            <div className="w-[1100px] max-md:w-full max-md:px-6 max-md:gap-9 flex-center max-md:flex-col">
              <div className="w-[50%] max-md:w-full">
                <Image
                  src={`/images/Legal-Trademark-White-Logo.png`}
                  alt="Legal Trademark"
                  width={200}
                  height={200}
                  className="max-md:w-[150px] max-md:h-auto"
                />
                <p className="mt-1 max-md:mt-0 text-slate-100 text-sm">
                  {`Secure your brand's future with Legal Trademark Office® tailored protection packages. Choose our DIY assisted service for a hands-on approach, or enlist our expert attorneys to handle your trademark filing with precision and care. Protect your uniqueness.`}
                </p>
              </div>
              <div className="w-[50%] max-md:w-full flex-center max-md:block">
                <div className="bg-[#fefefe] p-10 max-md:p-4 rounded-md shadow-lg">
                  <h2 className="text-slate-800 font-semibold text-lg ">
                    Call us at:
                    <Link
                      href="tel:+13104244909"
                      className="text-blue-600 font-semibold"
                    >
                      +1 (310) 424 4909
                    </Link>
                  </h2>
                  <p className="text-xs text-slate-700">
                    Mon-Fri 6:00 am - 5:00 pm
                  </p>
                  <div className="mt-4">
                    <h2 className="text-slate-800 font-semibold text-lg">
                      Email us for any support:
                    </h2>
                    <Link
                      href="mailto:support@legaltrademarkoffice.com"
                      className="text-blue-600 font-semibold"
                    >
                      support@legaltrademarkoffice.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 border-t-1 border-slate-700 py-6 max-md:px-6">
            <div className="text-slate-300 flex-center max-md:items-start gap-1">
              <LuCopyright className=" text-lg" />
              <p>
                Copyright & all rights reserved by{" "}
                <Link href={"/"} className=" underline">
                  Legal Trademark Office
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {dashboardOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="dashboard-preview-title" className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) setDashboardOpen(false); }}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-3xl bg-[#f7f9fc] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-wide text-[#025da0]">Customer account preview</p><h2 id="dashboard-preview-title" className="mt-1 text-xl font-bold text-slate-900">NORTH & PINE</h2></div><button type="button" aria-label="Close dashboard preview" onClick={() => setDashboardOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xl font-bold text-slate-700">×</button></div>
            <div className="grid gap-5 p-5 lg:grid-cols-[1.35fr_.65fr]">
              <div className="space-y-5"><div className="rounded-2xl bg-gradient-to-br from-blue-950 to-[#025da0] p-6 text-white"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-blue-200">Application progress</p><h3 className="mt-2 text-2xl font-bold">Classification review</h3><p className="mt-1 text-sm text-blue-100">Updated today at 10:24 AM</p></div><span className="self-start rounded-full bg-white/15 px-4 py-2 text-xs font-bold">45% complete</span></div><div className="mt-6 h-2 overflow-hidden rounded-full bg-white/20"><div className="h-full w-[45%] rounded-full bg-emerald-400" /></div></div><div className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-bold text-[#025da0]">Next action</p><h3 className="mt-1 text-xl font-bold text-slate-900">Confirm your business activities</h3><p className="mt-2 text-sm leading-6 text-slate-600">Review the preliminary classification summary before your consultation.</p><button className="mt-4 rounded-xl bg-[#025da0] px-5 py-3 text-sm font-bold text-white">Review classification</button></div><div className="grid gap-3 sm:grid-cols-3">{[[HiOutlineDocumentText,"4 documents"],[HiOutlineChatAlt2,"1 new message"],[HiOutlineBell,"Notifications on"]].map(([Icon,label]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4"><Icon className="text-2xl text-[#025da0]" /><p className="mt-3 text-sm font-bold text-slate-800">{label}</p></div>)}</div></div>
              <div className="space-y-5"><div className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="font-bold text-slate-900">Application details</h3><dl className="mt-4 space-y-3 text-sm">{[["Reference","LTO-28419"],["Mark type","Business name"],["Package","Premium"],["USPTO serial","After filing"]].map(([term,value]) => <div key={term} className="flex justify-between gap-3 border-b border-slate-100 pb-3"><dt className="text-slate-500">{term}</dt><dd className="text-right font-bold text-slate-800">{value}</dd></div>)}</dl></div><div className="rounded-2xl border border-violet-200 bg-violet-50 p-5"><p className="text-sm font-bold text-violet-800">Available when relevant</p><h3 className="mt-1 text-xl font-bold text-slate-900">Specimen review</h3><p className="mt-2 text-sm leading-6 text-slate-600">Prepare one proof-of-use example before the next filing stage.</p></div></div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default LandingPage;
