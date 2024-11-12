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
import { BiSearch } from "react-icons/bi";
import SimilarMarksInter from "@/components/sections/SimilarMarksInter";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import RebonCard from "@/components/sections/RebonCard";

export const metadata = {
  title: "International Trademark | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-itBanner w-full h-[90vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[800px] max-md:w-full col-flex gap-10 -mt-20 max-md:mt-0">
            <div className="col-flex gap-5">
              <h1 className="text-[40px] max-md:text-3xl font-bold text-white text-center leading-normal capitalize">
                {`protect your brand internationally by filling just few information.`}
              </h1>
              <p className="text-slate-100 text-center text-lg">
                {`Protect your brand across borders with our streamlined process. Simply fill out a few essential details, and our team will manage everything from application to international compliance, ensuring your intellectual property remains secure worldwide.`}
              </p>
              <div className="flex-center mt-2">
                <TMButton
                  px="120px"
                  py="30px"
                  text={"Start Filling Now"}
                  animatre
                />
              </div>
            </div>
          </div>
        </section>

        {/* similar marks section */}
        <section className="py-28 max-md:py-16 max-md:px-5">
          <SimilarMarksInter />
        </section>

        {/* why Choose us */}
        <section className="pt-24 pb-10 bg-[#ECF0F2] max-md:pt-16">
          <WhyChooseUs />
        </section>

        {/* rebon card section */}
        <section className="py-28 bg-[#ECF0F2] max-md:pt-20 max-md:pb-0">
          <RebonCard
            header={`Start International Trademark Registration Now!`}
          />
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

        {/* pricing section */}
        <section className="flex-center gap-7 max-md:gap-10 pt-32 max-md:pt-5 pb-10 max-md:flex-col max-md:px-5">
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

        {/* testimonial section */}
        <section className="pt-20 pb-8 pl-20 max-md:pl-5 max-md:px-5">
          <TestimonialSection />
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
