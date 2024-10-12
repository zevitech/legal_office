import React from "react";
import Header from "@/components/ui/Header";
import StatisticCountBox from "@/components/ui/StatisticCountBox";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import { similarMarks } from "@/constant";
import AttorneyCard from "@/components/ui/AttorneyCard";
import StepCard from "@/components/ui/StepCard";
import Link from "next/link";
import { FaArrowRightLong, FaShieldHeart } from "react-icons/fa6";
import { TbWorld } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import BrandCarousel from "@/components/ui/BrandCarousel";
import PackagesSection from "@/components/sections/PackagesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import LearningCard from "@/components/ui/LearningCard";
import FooterSection from "@/components/sections/FooterSection";
import SimilarMarks from "@/components/sections/similarMarks";

export const metadata = {
  title: "Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-homeBanner w-full h-[85vh] bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[800px] col-flex gap-10 -mt-24">
            <div className="flex gap-1">
              <div className="flex items-start">
                <Image
                  width={130}
                  height={130}
                  alt="'"
                  src={`/images/header-left.png`}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold text-white text-center leading-normal">
                Register a trademark for your Business Name, Slogan, or Logo
                Starting at
              </h1>
              <div className="flex items-end">
                <Image
                  width={130}
                  height={130}
                  alt="'"
                  src={`/images/header-right.png`}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex-center gap-4">
              <div className="relative w-[650px]">
                <input
                  className="p-6 rounded-lg  text-sm w-full outline-blue-600"
                  type="text"
                  placeholder="Search Trademark Here..."
                />
                <CiSearch className="absolute top-1/2 -translate-y-1/2 right-7 text-3xl text-slate-400" />
              </div>
              <Button
                className="py-[35px] px-14 font-semibold bg-color-primary text-white"
                radius="md"
              >
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Statistic Section */}
        <section className="flex-center gap-16 py-10">
          <StatisticCountBox text={`Trademarks since 2009`} number={200000} />
          <StatisticCountBox text={`Happy Customers`} number={120000} />
          <StatisticCountBox text={`Years in Service`} number={15} />
          <div className=" border-l-2 border-slate-600 pl-5">
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
        <section className="py-16 pb-24">
          <SimilarMarks />
        </section>

        {/* attorney section */}
        <section className="relative">
          <div className="bg-[#DFEAF1] h-[530px] absolute w-full top-0"></div>
          <div className="flex-between gap-7 max-w-5xl m-auto pt-24 pb-16 relative">
            <div className="flex items-end">
              <Image
                width={130}
                height={130}
                alt="'"
                src={`/images/meter-hand-icon.png`}
                className="object-contain"
              />
            </div>
            <div className="col-flex justify-center items-center gap-4">
              <HeaderText text2="attorneys with" text1="You on every step" />
              <p className="text-slate-600 text-base text-center">
                Legal Trademark Office® attorneys have provided representation
                for a diverse range of businesses, including Amazon sellers,
                clothing designers, professional service providers, and more.
              </p>
            </div>
            <div className="flex items-end">
              <Image
                width={130}
                height={130}
                alt="'"
                src={`/images/hammer-icon.png`}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-center gap-10">
            <AttorneyCard
              name={`Luez. kafe`}
              details={`Legal Trademark Office® attorneys have provided representation`}
              imageName={`attorney-1.png`}
            />
            <AttorneyCard
              name={`Martiz cort`}
              details={`Legal Trademark Office® attorneys have provided representation`}
              imageName={`attorney-2.png`}
            />
            <AttorneyCard
              name={`Sam William`}
              details={`Legal Trademark Office® attorneys have provided representation`}
              imageName={`attorney-3.png`}
            />
          </div>
        </section>

        {/* trusted by section */}
        <section className="py-20">
          <div className="flex-center gap-20">
            <div className="max-w-lg col-flex gap-7">
              <HeaderText
                text1="Trusted by Leading "
                text2="Attorneys Nationwide"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ipsum cupiditate laboriosam quasi suscipit ullam praesentium
                  molestias ratione exercitationem eveniet fuga.
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, a.
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
        <section className="pb-20">
          <div className="flex-center gap-20">
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
                <p>Insure your trademark for just $99.</p>
                <p>
                  {`We guarantee that your trademark will get registered, or we'll
                  refund our legal fees.*`}
                </p>
              </div>
              <TMButton px="70px" py="30px" text={"Start Now"} />
            </div>
          </div>
        </section>

        {/* steps section */}
        <section className="pb-20 pt-10">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto">
            <HeaderText
              text1="Register your U.S."
              text2="Trademark in 3 easy steps"
            />
            <p className="text-slate-500 text-base text-center">
              Legal Trademark Office® attorneys have provided representation for
              a diverse range of businesses, including Amazon sellers, clothing
              designers, professional service providers, and more.
            </p>
          </div>
          <div className="flex-center gap-3 mt-8">
            <StepCard
              icon={`search-icon.png`}
              header={`Conduct a Trademark Search`}
              details={`Before you apply, our team will perform a comprehensive search to ensure your desired trademark isn't already in use. This step helps avoid potential conflicts and strengthens your application`}
            />
            <div className="mt-20">
              <Image
                alt="step indicator"
                src={`/images/step-indicator.png`}
                width={80}
                height={80}
              />
            </div>
            <StepCard
              icon={`form_fill.png`}
              header={`Prepare and File Your Application`}
              details={`Our expert attorneys will guide you through preparing the necessary documentation and filing your trademark application with the U.S. Patent and Trademark Office (USPTO). We'll ensure your application meets all legal requirements.`}
            />
            <div className="mt-20">
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
              details={`After filing, we'll keep track of your application's progress and respond to any office actions or requests for additional information from the USPTO. Our goal is to help secure your trademark efficiently and effectively.`}
            />
          </div>
          <div className="flex-center gap-10 mt-10">
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
        <section className="flex-center gap-7 pt-10 pb-24">
          <div className="w-[600px] bg-[#E9EFF3] px-8 py-9 col-flex items-center gap-8 rounded-lg relative">
            <h1 className="text-color-primary text-3xl font-bold">
              Trademark registration start from
            </h1>
            <div className="flex-between w-full">
              <div className="flex items-end">
                <h1 className="text-8xl font-bold text-[#505050]">$99</h1>
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
              <ul className="col-flex gap-5 w-[60%] text-[15px]">
                <li className="text-slate-700 flex items-center gap-3">
                  <TbWorld className="text-[20px]" />{" "}
                  <span>File in 180+ countries</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <IoMdTime className="text-[20px]" />{" "}
                  <span>Finish application in 5 minutes</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <FaRegUser className="text-[20px]" />{" "}
                  <span>Attorney-led filing</span>
                </li>
                <li className="text-slate-700 flex items-start gap-3">
                  <FaShieldHeart className="text-[20px]" />{" "}
                  <span>{`World's most trusted trademark service`}</span>
                </li>
              </ul>
              <Image
                alt="satisfied user"
                src={`/images/satisfied-user.png`}
                width={250}
                height={250}
                className="object-contain absolute bottom-0 right-0"
              />
            </div>
          </div>
          <div className="w-[500px] col-flex gap-8">
            <div className="bg-[#D8EEFD] px-8 py-5 col-flex gap-3 rounded-lg">
              <h1 className="text-color-primary text-3xl font-bold">
                Patent filing starts from
              </h1>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3">
                  <h1 className="text-5xl font-bold text-[#505050]">$199</h1>
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
              <h1 className="text-[#00A976] text-3xl font-bold">
                Patent filing starts from
              </h1>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3">
                  <h1 className="text-5xl font-bold text-[#505050]">$199</h1>
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

        {/* registered brands */}
        <section className="pt-16 pb-12 px-20 mb-20 bg-[#E9EFF3]">
          <BrandCarousel />
        </section>

        {/* explore trademark */}
        <section className="py-20">
          <div className="flex-center gap-16">
            <div className="max-w-2xl col-flex gap-7">
              <HeaderText
                text1="Explore trademarks filed by"
                text2="competing companies"
              />
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  Search for when trademark owners file, abandon, or renew
                  trademarks for free.
                </p>
              </div>

              <div className="flex-center gap-4">
                <div className="relative w-[600px] shadow-md rounded-lg">
                  <input
                    className="p-6 rounded-lg  text-sm w-full outline-blue-600"
                    type="text"
                    placeholder="Search Trademark Here..."
                  />
                  <CiSearch className="absolute top-1/2 -translate-y-1/2 right-7 text-3xl text-slate-400" />
                </div>
                <Button
                  className="py-[35px] px-14 font-semibold bg-color-primary text-white"
                  radius="md"
                >
                  Search
                </Button>
              </div>
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
        <section className="py-10">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center">
              Legal Trademark Office® attorneys have provided representation for
              a diverse range of businesses, including Amazon sellers, clothing
              designers, professional service providers, and more.
            </p>
          </div>
          <div className="max-w-4xl m-auto pt-20">
            <PackagesSection />
          </div>
        </section>

        {/* testimonial section */}
        <section className="pt-20 pb-8 pl-20">
          <TestimonialSection />
        </section>

        {/* recommended section */}
        <section className="pb-20">
          <div className="flex-center">
            <HeaderText text1="Our" text2="Happy Customers" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 mt-16">
            <LearningCard
              image={`rlp-1.png`}
              header={`What's the cost to Register a Trademark?`}
              details={`The cost can vary drastically from one application to another. The bare minimum...`}
            />
            <LearningCard
              image={`rlp-2.png`}
              header={`What's the cost to Register a Trademark?`}
              details={`The cost can vary drastically from one application to another. The bare minimum...`}
            />
            <LearningCard
              image={`rlp-3.png`}
              header={`What's the cost to Register a Trademark?`}
              details={`The cost can vary drastically from one application to another. The bare minimum...`}
            />
            <LearningCard
              image={`rlp-1.png`}
              header={`What's the cost to Register a Trademark?`}
              details={`The cost can vary drastically from one application to another. The bare minimum...`}
            />
          </div>
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
