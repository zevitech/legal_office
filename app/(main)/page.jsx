import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import StepCard from "@/components/ui/StepCard";
import Link from "next/link";
import { FaArrowRightLong, FaShieldHeart } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import FooterSection from "@/components/sections/FooterSection";
import SimilarMarks from "@/components/sections/SimilarMarks";
import { BiSearch } from "react-icons/bi";
import Searchbar from "@/components/pages/home/search-bar";
import PackageCard2 from "@/components/ui/PackageCard2";

export const metadata = {
  title: "Trademark Registration Support | Legal Trademark Office",
  description:
    "Start U.S. trademark registration with specialist application preparation, clear service plans from $49, and guided support for names, logos, and slogans.",
  alternates: {
    canonical: "https://www.legaltrademarkoffice.com/",
  },
  openGraph: {
    url: "https://www.legaltrademarkoffice.com/",
    title: "Trademark Registration Support | Legal Trademark Office",
    description:
      "Start U.S. trademark registration with specialist preparation, clear service plans from $49, and guided filing support.",
    images: [{
      url: "/images/hero-banner.jpg",
      width: 1200,
      height: 630,
      alt: "Trademark registration support for U.S. businesses",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trademark Registration Support | Legal Trademark Office",
    description:
      "Start U.S. trademark registration with specialist preparation and clear service plans from $49.",
    images: ["/images/hero-banner.jpg"],
  },
};

const page = () => {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero-banner.jpg"
        fetchPriority="high"
      />
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="relative bg-homeBanner w-full h-[80vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex items-center justify-center">
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Content */}
          <div className="relative z-10 w-[800px] max-md:w-full flex flex-col gap-10 -mt-20 max-md:mt-0 text-center px-6">
            <div className="relative">
              {/* Top Left Quote */}
              <Image
                width={40}
                height={40}
                alt=""
                src="/images/header-left.png"
                className="absolute -top-6 -left-6 object-contain"
              />

              {/* Heading */}
              <h1 className="text-4xl max-md:text-3xl font-bold text-white leading-normal">
                U.S. Trademark Registration Support for Your Name, Logo or
                Slogan
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90 max-md:text-base">
                Start with a $49 service plan and specialist application
                preparation. The USPTO filing fee is $350 per class and is paid
                separately.
              </p>

              {/* Bottom Right Quote */}
              <Image
                width={40}
                height={40}
                alt=""
                src="/images/header-right.png"
                className="absolute -bottom-6 -right-6 object-contain"
              />
            </div>

            <Searchbar />
          </div>
        </section>

        {/* Value Section */}
        <section aria-label="Trademark registration service highlights" className="border-b border-slate-200 bg-white px-5 py-8">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ["Plans from $49", "Clear service fees"],
              ["Specialist preparation", "Organized application details"],
              ["Approval before filing", "Review before submission"],
              ["Application updates", "Stay informed after filing"],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-xl bg-slate-50 p-5 text-center">
                <p className="font-bold text-slate-800">{title}</p>
                <p className="mt-1 text-sm text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* similar marks section */}
        <section className="py-16 max-md:pt-10 pb-24 max-md:px-5">
          <SimilarMarks />
        </section>

        {/* filing support section */}
        <section className="bg-[#DFEAF1] px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-[112px_minmax(0,1fr)_112px] items-center gap-8 max-md:grid-cols-1 max-md:gap-5">
              <div className="flex justify-center max-md:hidden" aria-hidden="true">
                <Image
                  width={112}
                  height={112}
                  alt=""
                  src={`/images/meter-hand-icon.png`}
                  className="h-28 w-28 object-contain"
                />
              </div>
              <div className="col-flex items-center gap-5 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-color-primary">
                  Trademark filing assistance
                </p>
                <h2 className="text-3xl font-bold leading-tight text-slate-800 md:text-4xl">
                  <span className="font-bold text-color-primary">{`Professional Filing Support`}</span>
                  <span className="font-normal">{` at Every Step`}</span>
                </h2>
                <p className="max-w-2xl text-base leading-7 text-slate-700 md:text-lg">
                  {`Our team helps organize your application details, prepare filing information, and keep you informed throughout the trademark submission process.`}
                </p>
              </div>
              <div className="flex justify-center max-md:hidden" aria-hidden="true">
                <Image
                  width={112}
                  height={112}
                  alt=""
                  src={`/images/hammer-icon.png`}
                  className="h-28 w-28 object-contain"
                />
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  title: "Application Preparation",
                  details:
                    "We help organize your mark, ownership, and goods or services information so your application is prepared clearly and accurately.",
                  Icon: FaShieldHeart,
                },
                {
                  title: "Filing Coordination",
                  details:
                    "Our filing team coordinates the submission process and helps you understand what information is needed at each stage.",
                  Icon: FaRegUser,
                },
                {
                  title: "Case Updates",
                  details:
                    "Stay informed about important application activity, document requests, and next steps as your filing progresses.",
                  Icon: IoMdTime,
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="flex min-w-0 flex-col rounded-2xl border border-white/80 bg-white p-7 shadow-[0_14px_40px_rgba(15,55,85,0.10)] md:min-h-[300px] md:p-8"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9F5FD] text-color-primary"
                    aria-hidden="true"
                  >
                    <item.Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold leading-snug text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {item.details}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* trusted by section */}
        <section className="py-20 max-md:px-5">
          <div className="flex-center gap-20 max-md:gap-5 max-md:flex-col-reverse">
            <div className="max-w-lg max-md:w-full col-flex gap-7">
              <HeaderText
                text1="A Clearer Filing Experience for"
                text2="Business Owners"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  {`Turn your brand information into an organized trademark application with a service plan that matches your preferred preparation speed and level of support.`}
                </p>
                <p>
                  {`From an initial federal search through application preparation and filing coordination, our specialists help make each step easier to understand and complete.`}
                </p>
              </div>
              <TMButton
                px="100px"
                py="30px"
                text={"Start Your Application"}
              />
            </div>
            <div className="">
              <Image
                width={500}
                height={500}
                alt="Business owner reviewing trademark registration support"
                src={`/images/trusted-by-attorney.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Service plan section */}
        <section className="pb-20 max-md:px-5">
          <div className="flex-center gap-20 max-md:flex-col max-md:gap-7">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="Trademark service plan support"
                src={`/images/trademark-insurance.png`}
                className="object-contain"
              />
            </div>
            <div className="max-w-lg col-flex gap-7">
              <HeaderText
                text1="Choose the Support That Fits"
                text2="Your Brand"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  {`Select the search depth, preparation speed, review level, and monitoring period that fit your filing needs. Each package shows exactly what our service includes before you begin.`}
                </p>
              </div>
              <TMButton px="70px" py="30px" text={"Start Now"} />
            </div>
          </div>
        </section>

        {/* steps section */}
        <section className="pb-20 pt-10 max-md:px-5">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto">
            <HeaderText
              text1="Register your U.S."
              text2="Trademark in 3 easy steps"
            />
            <p className="text-slate-500 text-base text-center max-md:text-start max-md:text-sm">
              Move from an initial search to an organized application and stay
              informed after submission with a straightforward filing process.
            </p>
          </div>
          <div className="flex-center gap-3 mt-8 max-md:flex-col">
            <StepCard
              icon={`search-icon.png`}
              header={`Search and Prepare`}
              details={`Begin with a federal trademark search and provide the ownership, mark, and goods or services details needed to prepare your application.`}
            />
            <div className="mt-20 max-md:mt-0 max-md:rotate-[-111deg] ">
              <Image
                alt="step indicator"
                src={`/images/step-indicator.png`}
                width={80}
                height={80}
                className=" max-md:scale-x-[-1]"
              />
            </div>
            <StepCard
              icon={`form_fill.png`}
              header={`Review and Approve`}
              details={`Our specialists organize your application details for review. You confirm the information and approve the application before submission.`}
            />
            <div className="mt-20 max-md:mt-0 max-md:rotate-[130deg]">
              <Image
                alt="step indicator"
                src={`/images/step-indicator-2.png`}
                width={90}
                height={90}
              />
            </div>
            <StepCard
              icon={`user-group.png`}
              header={`Submit and Stay Informed`}
              details={`We coordinate filing with the USPTO and provide application updates, document requests, and clear next-step information as the filing progresses.`}
            />
          </div>
          <div className="flex-center gap-10 max-md:gap-4 mt-10 max-md:mt-2">
            <TMButton px="80px" py="30px" text={"Start Now"} />
            <Button
              as={Link}
              href="/contact-us"
              className="px-[50px] py-[30px] font-semibold text-color-primary w-fit capitalize border-[#027DD6]"
              radius="md"
              variant="bordered"
              endContent={
                <FaArrowRightLong className="text-color-primary text-[20px]" />
              }
            >
              contact us
            </Button>
          </div>
        </section>

        {/* pricing section */}
        <section className="flex-center pt-10 max-md:pt-5 pb-24 max-md:px-5">
          <div className="w-full max-w-4xl bg-[#E9EFF3] px-8 py-9 col-flex items-center gap-8 rounded-lg relative overflow-hidden">
            <h2 className="text-color-primary text-3xl font-bold">
              Start Trademark Registration Support From
            </h2>
            <div className="flex-between max-md:items-start max-md:justify-start w-full max-md:flex-col">
              <div className="flex items-end max-md:items-start max-md:mb-5">
                <p className="text-8xl max-md:text-6xl font-bold text-[#505050]">
                  $49
                </p>
                <span className="mb-4 ml-2">service fee</span>
              </div>
              <TMButton
                px="80px"
                py="30px"
                text={"Register Now"}
                color={`#003D68`}
              />
            </div>
            <div className="flex-between w-full mt-3">
              <ul className="col-flex gap-5 w-[60%] max-md:w-[90%] text-[15px] max-md:relative max-md:z-10">
                <li className="text-slate-700 flex items-center gap-3">
                  <BiSearch className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Federal Trademark Search</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <IoMdTime className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>7-Business-Day Preparation</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <FaRegUser className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Filing Prepared by Specialists</span>
                </li>
                <li className="text-slate-700 flex items-start gap-3">
                  <FaShieldHeart className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Clear Package Scope</span>
                </li>
              </ul>
              <Image
                alt="satisfied user"
                src={`/images/satisfied-user.png`}
                width={300}
                height={250}
                className="object-contain absolute bottom-0 right-0 z-0 max-md:w-[140px]"
              />
            </div>
            <p className="w-full text-sm font-medium text-slate-600">
              USPTO government filing fee: $350 per class, paid separately from
              every service plan.
            </p>
          </div>
        </section>

        {/* explore trademark */}
        <section className="py-20 max-md:px-5">
          <div className="flex-center gap-16 max-md:flex-col-reverse max-md:gap-6">
            <div className="max-w-2xl max-md:w-full col-flex gap-7">
              <h2 className="text-4xl max-md:text-3xl text-slate-700">
                <span className="font-normal">{`Start with a `}</span>
                <span className="font-bold text-color-primary">{`Trademark Search`}</span>
              </h2>
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  Explore potentially related federal filings for your business
                  name, slogan, or logo, then continue with specialist review
                  and application preparation.
                </p>
              </div>
              <Searchbar />
            </div>
            <div className="">
              <Image
                width={400}
                height={400}
                alt="Federal trademark search preview"
                src={`/images/search-mocup.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* packages - tab */}
        <section id="packages" className="py-10 max-md:px-2 mb-[5rem] scroll-mt-24">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto  max-md:px-3">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center max-md:text-start">
              Compare preparation speed, search depth, review level, and
              monitoring options. Every listed package price is a service fee;
              USPTO filing fees are paid separately.
            </p>
          </div>
          <PackageCard2 />
        </section>

        {/* Customer confidence section */}
        <section className="bg-white px-5 py-16">
          <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm md:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-color-primary">
              Customer confidence
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-800">
              Clear terms. Confident next steps.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Review how we handle your information, service refunds, and the
              terms that apply before you select a trademark registration plan.
            </p>
            <nav aria-label="Customer policies" className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                ["Privacy Policy", "/legal/privacy", "How your information is handled"],
                ["Refund Policy", "/legal/refund-policy", "Review cancellation and refund terms"],
                ["Terms of Service", "/legal/terms", "Understand the terms for using our service"],
              ].map(([label, href, detail]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-[#027DD6] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#027DD6]"
                >
                  <span className="font-bold text-color-primary">{label}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{detail}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        {/* footer section */}
        <FooterSection description="Prepare your U.S. trademark application with clear service packages, specialist filing support, and updates that help you move forward with confidence." />
      </main>
    </>
  );
};

export default page;
