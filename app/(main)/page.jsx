import React from "react";
import Header from "@/components/ui/Header";
import StatisticCountBox from "@/components/ui/StatisticCountBox";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
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
import SimilarMarks from "@/components/sections/SimilarMarks";

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
        <section className="bg-homeBanner w-full h-[88vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[800px] max-md:w-full col-flex gap-10 -mt-20 max-md:mt-10">
            <div className="flex gap-2 max-md:gap-1">
              <div className="flex items-start">
                <Image
                  width={130}
                  height={130}
                  alt="'"
                  src={`/images/header-left.png`}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl max-md:text-3xl font-bold text-white text-center leading-normal">
                {`Secure Your Brand's Identity - Name, Logo & More! Starting at
                Just $49 + USPTO Filing Fee`}
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
            <div className="flex-center gap-4 max-md:flex-col">
              <div className="relative w-[650px] max-md:w-full">
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
        <section className="flex-center gap-16 max-md:gap-7 py-10 max-md:flex-wrap">
          <StatisticCountBox text={`Trademarks since 2009`} number={200000} />
          <div className="block max-md:hidden">
            <StatisticCountBox text={`Happy Customers`} number={120000} />
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

        {/* attorney section */}
        <section className="relative">
          <div className="bg-[#DFEAF1] h-[530px] absolute w-full top-0"></div>
          <div className="flex-between gap-7 max-md:gap-1 max-w-5xl m-auto pt-24 max-md:pt-20 pb-16 relative">
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
              <h1 className="text-4xl max-md:text-3xl text-slate-700">
                <span className="font-bold text-color-primary">{`Attorneys with`}</span>
                <span className="font-normal">{` You Every Step of the Way`}</span>
              </h1>
              <p className="text-slate-600 text-base text-center">
                {`At Legal Trademark Office, our experienced attorneys have represented a wide range of businesses, from Amazon sellers and clothing designers to professional service providers. We understand the unique needs of every business and are dedicated to ensuring your brand is protected with expert legal guidance.`}
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
          <div className="flex-center gap-10 max-md:flex-col">
            <AttorneyCard
              name={`Luez. kafe`}
              details={`Luez has extensive experience in trademark law and is committed to helping businesses protect their intellectual property, With over 7 years of legal experience.`}
              imageName={`attorney-1.png`}
            />
            <AttorneyCard
              name={`James Clarke`}
              details={`James is a seasoned intellectual property attorney who has represented a diverse range of clients, from small businesses to international corporations. His strategic approach ensures your trademark is secure and fully compliant.`}
              imageName={`attorney-2.png`}
            />
            <AttorneyCard
              name={`Sophia Green`}
              details={`With over 10 years of legal experience, Sophia specializes in helping startups secure their trademarks and grow their brand with confidence. She's known for her attention to detail and client-focused approach.`}
              imageName={`attorney-3.png`}
            />
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
              details={`Our expert attorneys will guide you through preparing the necessary documentation and filing your trademark application with the U.S. Patent and Trademark Office (USPTO). We'll ensure your application meets all legal requirements.`}
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
              details={`After filing, we'll keep track of your application's progress and respond to any office actions or requests for additional information from the USPTO. Our goal is to help secure your trademark efficiently and effectively.`}
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
            <h1 className="text-color-primary text-3xl font-bold">
              Trademark registration start from
            </h1>
            <div className="flex-between max-md:items-start max-md:justify-start w-full max-md:flex-col">
              <div className="flex items-end max-md:items-start max-md:mb-5">
                <h1 className="text-8xl max-md:text-6xl font-bold text-[#505050]">
                  $49
                </h1>
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
                  <TbWorld className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>File in 180+ countries</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <IoMdTime className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Finish application in 5 minutes</span>
                </li>
                <li className="text-slate-700 flex items-center gap-3">
                  <FaRegUser className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>Attorney-led filing</span>
                </li>
                <li className="text-slate-700 flex items-start gap-3">
                  <FaShieldHeart className="text-[20px] max-md:w-[20px]" />{" "}
                  <span>{`World's most trusted trademark service`}</span>
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
              <h1 className="text-color-primary text-2xl font-bold">
                Provisional Patent filing starts from
              </h1>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3 max-md:my-5">
                  <h1 className="text-5xl font-bold text-[#505050]">
                    $500 <span className="text-xl">to</span> $800
                  </h1>
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
                Copyright Filing Starts from
              </h1>
              <div className="col-flex w-full">
                <div className="flex items-end mb-3 max-md:my-5">
                  <h1 className="text-5xl font-bold text-[#505050]">$189</h1>
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
        <section className="pt-16 pb-12 px-20 max-md:px-0 mb-20 max-md:mb-0 bg-[#E9EFF3]">
          <BrandCarousel />
        </section>

        {/* explore trademark */}
        <section className="py-20 max-md:px-5">
          <div className="flex-center gap-16 max-md:flex-col-reverse max-md:gap-6">
            <div className="max-w-2xl max-md:w-full col-flex gap-7">
              <h1 className="text-4xl max-md:text-3xl text-slate-700">
                <span className="font-normal">{`Search Your `}</span>
                <span className="font-bold text-color-primary">{`Brand Name `}</span>
                <span className="font-normal">{`Availability`}</span>
              </h1>
              <div className="col-flex gap-3 text-lg text-slate-700">
                <p>
                  Search to see if your business name, slogan, or logo is
                  available for trademark registration. Ensure your brand is
                  unique and protected.
                </p>
              </div>
              <div className="flex-center gap-4 max-md:flex-col">
                <div className="relative w-[600px] max-md:w-full shadow-md rounded-lg">
                  <input
                    className="p-6 rounded-lg  text-sm w-full outline-blue-600"
                    type="text"
                    placeholder="Search Trademark Here..."
                  />
                  <CiSearch className="absolute top-1/2 -translate-y-1/2 right-7 text-3xl text-slate-400" />
                </div>
                <Button
                  className="py-[35px] px-14 font-semibold bg-color-primary text-white max-md:w-full"
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
        <section className="py-10 max-md:px-2">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto  max-md:px-3">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center max-md:text-start">
              Legal Trademark Office® attorneys have provided representation for
              a diverse range of businesses, including Amazon sellers, clothing
              designers, professional service providers, and more.
            </p>
          </div>
          <div className="max-w-4xl max-md:w-full m-auto pt-20 max-md:pt-5">
            <PackagesSection />
          </div>
        </section>

        {/* testimonial section */}
        <section className="pt-20 pb-8 pl-20 max-md:pl-5 max-md:px-5">
          <TestimonialSection />
        </section>

        {/* blog section */}
        <section className="pb-20 max-md:px-5">
          <div className="flex-center max-md:justify-start">
            <HeaderText text1="Recommended " text2="learning resources" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 mt-16 max-md:mt-7 max-md:gap-7">
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
          <div className="flex-center mt-10 max-md:mt-5">
            <Button
              className="py-[35px] px-14 font-semibold bg-color-primary text-white max-md:w-full shadow-lg"
              radius="md"
            >
              Explore learning center
            </Button>
          </div>
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
