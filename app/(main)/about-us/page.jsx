import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FooterSection from "@/components/sections/FooterSection";
import CounterBoxTR from "@/components/ui/CounterBoxTR";
import PackageCard from "@/components/ui/PackageCard";
import ExpandableText from "@/components/ui/ExpandableText";

export const metadata = {
  title:
    "About Us - Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-aboutBg w-full h-[120vh] max-md:h-auto bg-no-repeat bg-cover bg-bottom flex justify-center px-20 max-md:px-5">
          <div>
            <div className="flex gap-1 pt-[100px] pb-[90px]">
              <div className="flex items-start">
                <Image
                  width={100}
                  height={130}
                  alt="'"
                  src={`/images/header-left.png`}
                  className="object-contain max-md:w-[60px]"
                />
              </div>
              <div>
                <h1 className="text-[55px] max-md:text-4xl font-normal text-[#027DD6] text-center">
                  Know About
                </h1>
                <h1 className="text-[55px] max-md:text-4xl font-bold text-[#075A96] text-center">
                  Legal Trademark Office
                </h1>
                <p className="text-sm text-[#027DD6] text-center mt-5">
                  You have a name , brand and business to protect, and we can
                  help you
                </p>
              </div>
              <div className="flex items-end">
                <Image
                  width={100}
                  height={130}
                  alt="'"
                  src={`/images/header-right.png`}
                  className="object-contain mb-[-40px] max-md:w-[60px]"
                />
              </div>
            </div>
            <div className="flex-center gap-14 max-md:gap-5">
              <div>
                <Image
                  width={220}
                  height={220}
                  alt="Partners"
                  src={`/images/about-img-1.png`}
                  className="object-contain shadow-about rounded-3xl "
                />
              </div>
              <div className="flex flex-col gap-14 max-md:gap-5">
                <Image
                  width={220}
                  height={220}
                  alt="Partners"
                  src={`/images/about-img-2.png`}
                  className="object-contain shadow-about rounded-3xl "
                />
                <Image
                  width={220}
                  height={220}
                  alt="Partners"
                  src={`/images/about-img-3.png`}
                  className="object-contain shadow-about rounded-3xl "
                />
              </div>
              <div className="flex flex-col gap-14 max-md:gap-5">
                <Image
                  width={220}
                  height={220}
                  alt="Partners"
                  src={`/images/about-img-4.png`}
                  className="object-contain shadow-about rounded-3xl "
                />
                <Image
                  width={250}
                  height={250}
                  alt="Partners"
                  src={`/images/about-img-5.png`}
                  className="object-contain shadow-about rounded-3xl "
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-28 max-md:pb-10 pt-[240px] max-md:pt-16 max-md:px-5">
          <div className="flex-center gap-16 max-md:flex-col max-md:gap-7">
            <div className="max-w-xl max-md:w-full col-flex gap-5">
              <div>
                <p className="text-lg text-slate-600">About</p>
                <HeaderText text1=" " text2="Legal Trademark Office" />
              </div>
              <div className="col-flex gap-3 text-lg text-slate-600">
                <ExpandableText
                  text={`At Legal Trademark Office, we are dedicated to protecting your brand's identity and integrity. Our mission is to provide comprehensive trademark services that ensure your brand's uniqueness and value are safeguarded in an increasingly competitive marketplace. With years of expertise in trademark registration, we are committed to helping businesses of all sizes secure their intellectual property, ensuring that their brand's assets are protected for long-term success. Our team of skilled professionals offers personalized support, guiding you through each step of the trademark process with precision and care.
We understand that your brand is one of your most valuable assets, and we treat it as such. At Legal Trademark Office, we take a proactive approach to ensure that your trademark registration is handled efficiently, minimizing risks and maximizing protection. From initial consultation to registration, we provide a seamless experience backed by industry knowledge and legal expertise. Our goal is to be your trusted partner in securing your brand's future, giving you the confidence to focus on growth and innovation.`}
                />
              </div>
              <div className="flex items-center gap-10 mt-5 max-md:gap-5">
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
            </div>
            <div className="">
              <Image
                width={500}
                height={500}
                alt="female partner"
                src={`/images/about-img-female.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* statistic section */}
        <section className="bg-[#E9EFF3] py-20 max-md:py-16 shadow-inner-md">
          <div className="flex-center gap-36 max-md:flex-col max-md:gap-10">
            <CounterBoxTR
              number={12}
              text={`Years Experience`}
              symbol={`+`}
              icon={`Pressure.png`}
            />
            <CounterBoxTR
              number={99}
              text={`Customer Approval`}
              symbol={`%`}
              icon={`Chart.png`}
            />
            <CounterBoxTR
              number={7}
              text={`Trademark Managed`}
              symbol={`K`}
              icon={`Pipe_duotone.png`}
            />
          </div>
        </section>

        {/* experience partners */}
        <section className="pt-32 max-md:pt-20">
          <div className="flex-center gap-20 max-md:flex-col max-md:gap-10 max-md:px-5">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="partners"
                src={`/images/user-partner.png`}
                className="object-contain"
              />
            </div>
            <div className="max-w-lg col-flex gap-7 max-md:gap-5">
              <HeaderText
                text1=" "
                text2="Experienced Trademark Registration Partners!"
              />
              <div className="col-flex gap-6 text-lg text-slate-700">
                <p>
                  We help you protect your intellectual property from theft so
                  you can own the exclusive rights to your business names,
                  slogans, and other digital assets.
                </p>
                <ul className="col-flex gap-5">
                  <li className="text-slate-600 font-bold flex items-center gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/rectangle-icon.png`}
                      className="object-contain"
                    />
                    <span>Get ® Symbol on Logos</span>
                  </li>
                  <li className="text-slate-600 font-bold flex items-center gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/rectangle-icon.png`}
                      className="object-contain"
                    />
                    <span>Protect Against Infringement</span>
                  </li>
                  <li className="text-slate-600 font-bold flex items-center gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/rectangle-icon.png`}
                      className="object-contain"
                    />
                    <span>Build Goodwill & Trust</span>
                  </li>
                </ul>
              </div>
              <TMButton px="70px" py="30px" text={"Start Now"} />
            </div>
          </div>
        </section>

        {/* testimonial section */}
        <section className="pb-8 pt-32 max-md:pt-20 pl-20 max-md:px-5">
          <TestimonialSection />
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
