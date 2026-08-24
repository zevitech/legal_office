import React from "react";
import Header from "@/components/ui/Header";
import StatisticCountBox from "@/components/ui/StatisticCountBox";
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
  title: "Legal Trademark Office | US Based trademark register website.",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
  alternates: {
    canonical: "https://www.legaltrademarkoffice.com/",
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
                alt="quote"
                src="/images/header-left.png"
                className="absolute -top-6 -left-6 object-contain"
              />

              {/* Heading */}
              <h1 className="text-4xl max-md:text-3xl font-bold text-white leading-normal">
                {`Secure Your Brand's Identity - Name, Logo, Slogan & More! Starting at
                Just $49 + Federal Office Filing Fee`}
              </h1>

              {/* Bottom Right Quote */}
              <Image
                width={40}
                height={40}
                alt="quote"
                src="/images/header-right.png"
                className="absolute -bottom-6 -right-6 object-contain"
              />
            </div>

            <Searchbar />
          </div>
        </section>

        {/* Statistic Section */}
        <section className="flex-center gap-16 max-md:gap-7 py-10 max-md:flex-wrap">
          <StatisticCountBox text={`Trademarks since 2009`} number={2300} />
          <div className="block max-md:hidden">
            <StatisticCountBox text={`Happy Customers`} number={2300} />
          </div>
          <StatisticCountBox text={`Years in Service`} number={15} />
          <div className="hidden max-md:block">
            <StatisticCountBox text={`Happy Customers`} number={120000} />
          </div>
          <div className=" border-l-2 border-slate-600 pl-5 max-md:border-none">
            <p className="text-sm pb-2">
              Rated <span className="font-bold">4.8/5</span> by 1000+ users
            </p>
            <div className="flex items-center gap-2">
              <Image
                width={130}
                height={50}
                alt="shopperapproved"
                src={`/images/shopperapproved.png`}
                className="object-contain"
              />
              <Image
                width={120}
                height={30}
                alt="google rating"
                src={`/images/google-rating.png`}
                className="object-contain"
              />
            </div>
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
                text1="Trusted by Leading "
                text2="Attorneys Nationwide"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  {`At Legal Trademark Office, we are proud to be trusted by attorneys across the country. Our services provide unmatched expertise in trademark law, helping businesses and legal professionals secure their intellectual property with ease and confidence.`}
                </p>
                <p>
                  {`From startups to established businesses, our team has built a reputation for delivering exceptional trademark registration services, trusted by legal experts nationwide.`}
                </p>
              </div>
              <TMButton
                px="100px"
                py="30px"
                text={"Learn Why Attorneys Trust Us"}
              />
            </div>
            <div className="">
              <Image
                width={500}
                height={500}
                alt="'"
                src={`/images/trusted-by-attorney.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Trademark Insurance section */}
        <section className="pb-20 max-md:px-5">
          <div className="flex-center gap-20 max-md:flex-col max-md:gap-7">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="'"
                src={`/images/trademark-insurance.png`}
                className="object-contain"
              />
            </div>
            <div className="max-w-lg col-flex gap-7">
              <HeaderText
                text1="Peace of mind promise with"
                text2="Trademark Insurance"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>{`Insure your trademark for just $49.`}</p>
                <p>
                  {`With Trademark Insurance, we guarantee that your trademark will get registered, or we'll refund your legal fees.* Protect your brand with confidence and secure your future.`}
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
              Legal Trademark Office® attorneys have provided representation for
              a diverse range of businesses, including Amazon sellers, clothing
              designers, professional service providers, and more.
            </p>
          </div>
          <div className="flex-center gap-3 mt-8 max-md:flex-col">
            <StepCard
              icon={`search-icon.png`}
              header={`Conduct a Trademark Search`}
              details={`Before you apply, our team will perform a comprehensive search to ensure your desired trademark isn't already in use. This step helps avoid potential conflicts and strengthens your application`}
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
              header={`Prepare and File Your Application`}
              details={`Our expert attorneys will guide you through preparing the necessary documentation and filing your trademark application with the U.S. Patent and Trademark Office (Federal Office). We'll ensure your application meets all legal requirements.`}
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
              header={`Monitor and Respond to Office Actions`}
              details={`After filing, we'll keep track of your application's progress and respond to any office actions or requests for additional information from the Federal Office. Our goal is to help secure your trademark efficiently and effectively.`}
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
        <section className="flex-center gap-7 max-md:gap-10 pt-10 max-md:pt-5 pb-24 max-md:flex-col max-md:px-5">
          <div className="w-[600px] max-md:w-full bg-[#E9EFF3] px-8 py-9 col-flex items-center gap-8 rounded-lg relative">
            <h2 className="text-color-primary text-3xl font-bold">
              Trademark registration start from
            </h2>
            <div className="flex-between max-md:items-start max-md:justify-start w-full max-md:flex-col">
              <div className="flex items-end max-md:items-start max-md:mb-5">
                <p className="text-8xl max-md:text-6xl font-bold text-[#505050]">
                  $49
                </p>
                <span className="mb-4">+ Govt fee</span>
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
                  <span>Comprehensive Search</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <IoMdTime className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>7-Day Processing</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <FaRegUser className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Filing Prepared by Specialists</span>
                </li>
                <li className="text-slate-700 flex items-start gap-3">
                  <FaShieldHeart className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>100% Satisfaction Guarantee</span>
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
          </div>
          <div className="w-[500px] max-md:w-full col-flex gap-8 max-md:gap-10">
            <div className="bg-[#D8EEFD] px-8 py-5 col-flex gap-3 rounded-lg">
              <h2 className="text-color-primary text-2xl font-bold">
                Provisional Patent filing starts from
              </h2>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3 max-md:my-5">
                  <p className="text-5xl font-bold text-[#505050]">
                    $500 <span className="text-xl">to</span> $800
                  </p>
                  <span className="mb-4">+ Govt fee</span>
                </div>
                <TMButton
                  px="80px"
                  py="30px"
                  text={"Register Now"}
                  color={`#027DD6`}
                />
              </div>
            </div>
            <div className="bg-[#D8FDF2] px-8 py-5 col-flex gap-3 rounded-lg">
              <h2 className="text-[#00A976] text-3xl font-bold">
                Copyright Filing Starts from
              </h2>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3 max-md:my-5">
                  <p className="text-5xl font-bold text-[#505050]">$189</p>
                  <span className="mb-4">+ Govt fee</span>
                </div>
                <TMButton
                  px="80px"
                  py="30px"
                  text={"Register Now"}
                  color={`#00A976`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* explore trademark */}
        <section className="py-20 max-md:px-5">
          <div className="flex-center gap-16 max-md:flex-col-reverse max-md:gap-6">
            <div className="max-w-2xl max-md:w-full col-flex gap-7">
              <h2 className="text-4xl max-md:text-3xl text-slate-700">
                <span className="font-normal">{`Search Your `}</span>
                <span className="font-bold text-color-primary">{`Brand Name `}</span>
                <span className="font-normal">{`Availability`}</span>
              </h2>
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  Search to see if your business name, slogan, or logo is
                  available for trademark registration. Ensure your brand is
                  unique and protected.
                </p>
              </div>
              <Searchbar />
            </div>
            <div className="">
              <Image
                width={400}
                height={400}
                alt="'"
                src={`/images/search-mocup.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* packages - tab */}
        <section className="py-10 max-md:px-2 mb-[5rem]">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto  max-md:px-3">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center max-md:text-start">
              Simplify your budgeting with our transparent and straightforward
              business pricing plan, designed to support your growth.
            </p>
          </div>
          <PackageCard2 />
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
