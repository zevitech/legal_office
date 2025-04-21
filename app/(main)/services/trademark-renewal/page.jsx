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
import HowItWorkLine from "@/components/ui/HowItWorkLine";
import PackageCard from "@/components/ui/PackageCard";
import PackageCard2 from "@/components/ui/PackageCard2";

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
        <section className="bg-renewal w-full h-[90vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[1000px] max-md:w-full col-flex gap-10 -mt-20 max-md:mt-0">
            <div className="col-flex gap-5">
              <h1 className="text-[40px] max-md:text-3xl font-bold text-white text-start leading-normal capitalize">
                {`Renew & Protect Your Trademark - Get Back What's Yours!`}
              </h1>
              <div className="text-slate-200 text-start text-lg max-md:text-base">
                <p>
                  {`Maintain control over your brand with our renewal and protection services. We ensure your trademark stays active, preventing unauthorized use and helping you reclaim your brand's rights.`}
                </p>
                <p>{`Let us help you reclaim your brand's legal rights and secure your identity in the marketplace.`}</p>
              </div>
              <div className="flex mt-2 gap-7">
                <TMButton px="80px" py="30px" text={"Start Now"} />
                <TMButton
                  px="80px"
                  py="30px"
                  color={`transparent`}
                  text={"Contact Us"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* why Choose us - business formation*/}
        <section className="bg-[#ECF0F2] py-32 max-md:px-5 max-md:py-16">
          <div className="text-slate-800 max-w-[1100px] m-auto pb-10 max-md:pb-5">
            <h1 className="text-lg max-md:text-base">
              Briefly explain the importance of proper business formation.
            </h1>
            <p className="text-3xl font-semibold max-md:text-2xl">
              Why Choose Us for Business Formation?
            </p>
          </div>
          <div className="col-flex gap-5">
            <div className="flex-center gap-5 max-md:gap-0 h-[180px] max-md:h-auto max-md:flex-col">
              <div className="w-[300px] h-full p-5 bg-white max-md:bg-transparent rounded-lg flex-center flex-col gap-5 max-md:gap-2 text-slate-700">
                <Image
                  width={70}
                  height={100}
                  alt="'"
                  src={`/images/bf-1.png`}
                  className="object-contain"
                />
                <h2 className="text-lg font-semibold ">Legal Compliance</h2>
              </div>
              <div className="w-[700px] max-md:w-full bg-white rounded-lg p-10 max-md:p-5 h-full hover:bg-[#0085FF] hover:text-white transition-all ">
                <p className="">
                  {`Ensuring your business is properly formed helps you meet all legal requirements, from licenses to permits and industry regulations. This foundation not only minimizes the risk of penalties but also builds credibility, helping your business operate smoothly and responsibly.`}
                </p>
              </div>
            </div>
            <div className="flex-center gap-5 max-md:gap-0 h-[180px] max-md:h-auto flex-row-reverse max-md:flex-col">
              <div className="w-[300px] h-full p-5 bg-white max-md:bg-transparent rounded-lg flex-center flex-col gap-5 max-md:gap-2 text-slate-700">
                <Image
                  width={70}
                  height={100}
                  alt="'"
                  src={`/images/bf-2.png`}
                  className="object-contain"
                />
                <h2 className="text-lg font-semibold ">Tax Benefits</h2>
              </div>
              <div className="w-[700px] max-md:w-full hover:bg-white rounded-lg p-10 max-md:p-5 h-full bg-[#0085FF] text-white  hover:text-slate-800 transition-all ">
                <p className="">
                  {`Choosing the right business structure can lead to significant tax savings. We guide you through options that maximize deductions and benefits, helping you reduce tax liability and keep more of your earnings, so you can reinvest in business growth.`}
                </p>
              </div>
            </div>
            <div className="flex-center gap-5 max-md:gap-0 h-[180px] max-md:h-auto max-md:flex-col">
              <div className="w-[300px] h-full p-5 bg-white max-md:bg-transparent rounded-lg flex-center flex-col gap-5 max-md:gap-2 text-slate-700">
                <Image
                  width={70}
                  height={100}
                  alt="'"
                  src={`/images/bf-3.png`}
                  className="object-contain"
                />
                <h2 className="text-lg font-semibold ">Liability Protection</h2>
              </div>
              <div className="w-[700px] max-md:w-full bg-white rounded-lg p-10 max-md:p-5 h-full hover:bg-[#0085FF] hover:text-white transition-all ">
                <p className="">
                  {`Proper business formation separates your personal and business assets, providing a vital layer of protection. If your business faces debts or lawsuits, your personal assets remain safeguarded, ensuring peace of mind and financial security for you and your family.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trademark Insurance section */}
        <section className="py-28 max-md:py-16 max-md:px-5 bg-white">
          <div className="flex-center gap-20 max-md:flex-col max-md:gap-7">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="'"
                src={`/images/tm-renewal.jpg`}
                className="object-contain rounded-xl"
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

        {/* attorney section */}
        <section className="relative pb-28">
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

        {/* packages - tab */}
        <section className="py-24 max-md:px-2 bg-slate-50">
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
