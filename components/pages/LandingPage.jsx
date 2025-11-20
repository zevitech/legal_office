"use client";

import React, { useEffect, useState } from "react";
import LandingHeader from "../ui/LandingHeader";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TestimonialCarousel from "../ui/TestimonialCarousel";
import HowWorkCard from "../ui/HowWorkCard";
import { AiOutlineDoubleRight } from "react-icons/ai";
import BenefitCard from "../ui/BenefitCard";
import AccordionBox from "../ui/AccordionBox";
import Link from "next/link";
import { LuCopyright } from "react-icons/lu";
import ClientSection from "../ui/ClientSection";
import WhyChooseCard from "../ui/WhyChooseCard";
import WhyChooseInfo from "../ui/WhyChooseInfo";
import { FaAnglesDown } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import HeaderText from "../ui/HeaderText";
import PackageCard2 from "../ui/PackageCard2";

const LandingPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);

  const handleRegisterClick = () => {
    setIsLoading(true);
    router.push("/trademark-register");
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
                Register a trademark for your Business Name, Slogan, or Logo
                Starting at
              </h1>
              <h1 className="text-slate-700 text-2xl font-bold text-center">
                <span className="text-[44px]  max-md:text-2xl text-[#025da0]">
                  $49 + Federal Office Filing Fee
                </span>
              </h1>
              <p className="text-slate-700 mt-4 text-center max-w-[80%] max-md:max-w-full px-2 m-auto">
                Start by filling out our simple trademark questionnaire,
                Affordable Rates, Expert Legal Support, Get your serial number
                of trademark registration once your trademark application is
                filed with us!
              </p>
            </div>
          </div>
          <div className="flex-center mt-16 max-md:mt-10 w-[80%] m-auto">
            <Button
              color="primary"
              radius="sm"
              onClick={handleRegisterClick}
              isLoading={isLoading}
              className="bg-gradient-to-tr to-[#0b72e7] from-blue-700 text-white text-lg animate-expand hover:animate-none px-28 max-md:px-20 py-8 shadow-lg shadow-blue-200"
            >
              Trademark Now
            </Button>
          </div>
        </div>
        <div className="flex-center mt-12">
          <div className="flex-center gap-6 max-md:gap-3">
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
            <Image
              src={"/images/Seal_of_the_United_States_Patent.png"}
              alt="Seal of the United States patient"
              width={110}
              height={40}
              className="w-20 h-20 max-md:w-14 max-md:h-auto"
            />
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

      {/* how it's work section */}
      <section className="flex-center mt-24 max-md:mt-20 max-md:w-full">
        <div className="flex flex-col gap-16 max-md:gap-8">
          <div className="text-center flex flex-col gap-4  max-md:px-3">
            <h1 className="text-4xl text-[#025da0] font-bold max-md:text-3xl">
              Register your U.S. Trademark in 3 easy steps
            </h1>
            <p className="text-base text-slate-600 md:max-w-[50%] m-auto">
              Legal Trademark Office® attorneys have provided representation for
              a diverse range of businesses, including Amazon sellers, clothing
              designers, professional service providers, and more.
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
                title={` Conduct a Trademark Search`}
                description={`Before you apply, our team will perform a comprehensive search to ensure your desired trademark isn't already in use. This step helps avoid potential conflicts and strengthens your application`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4 max-md:hidden" />
              <FaAnglesDown className="text-3xl text-[#025da0] font-thin animate-down-to-r mt-4 md:hidden" />
              <HowWorkCard
                step={2}
                title={` Prepare and File Your Application`}
                description={`Our expert attorneys will guide you through preparing the necessary documentation and filing your trademark application with the U.S. Patent and Trademark Office. We'll ensure your application meets all legal requirements.`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4 max-md:hidden" />
              <FaAnglesDown className="text-3xl text-[#025da0] font-thin animate-down-to-r mt-4 md:hidden" />
              <HowWorkCard
                step={3}
                title={`Monitor and Respond to Office Actions`}
                description={`After filing, we'll keep track of your application's progress and respond to any office actions or requests for additional information from the Federal Office. Our goal is to help secure your trademark efficiently and effectively.`}
              />
            </div>
          </div>
          <div className="flex-center max-md:w-[80%] max-md:m-auto max-md:mt-6">
            <Button
              color="primary"
              radius="sm"
              onClick={handleRegisterClick}
              isLoading={isLoading}
              className="bg-gradient-to-tr to-[#0b72e7] from-blue-700 text-white text-lg animate-bounce hover:animate-none px-28 py-8 shadow-lg shadow-blue-200"
            >
              Trademark Now
            </Button>
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
        </section>

      {/* benefit section */}
      <section className="mt-24 max-md:mt-20">
        <div className="text-center flex flex-col gap-4 mb-16 max-md:mb-10 max-md:px-5">
          <h1 className="text-4xl max-md:text-3xl text-[#025da0] font-bold">
            Why Choose Us
          </h1>
          <p className="text-base text-slate-600 md:max-w-[50%] m-auto">
            Trademark applicants represented by attorneys are 50% more likely to
            successfully register than those who go it alone.
          </p>
          <Image
            src={"/images/curve-DplsLMf8.webp"}
            width={300}
            height={10}
            alt="curve line"
            className="m-auto max-md:w-56"
          />
        </div>
        <div className=" max-md:ml-0 flex-center gap-24 md:mr-5 max-md:gap-0">
          <div className="flex flex-col gap-8  max-md:gap-6">
            <div className="flex max-md:flex-col gap-8  max-md:gap-6">
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
            </div>
            <div className="flex max-md:flex-col gap-8 max-md:gap-6">
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
          </div>
          <div className="max-md:hidden">
            <Image
              src={"/images/Attorney.png"}
              alt=""
              width={300}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* contact us section */}
      <section className=" mt-28 max-md:mt-20 max-md:py-16 bg-of-hero">
        <div className="flex max-md:flex-col justify-center gap-20 max-md:gap-5 pt-12 max-md:pt-0">
          <div className="w-[500px] max-md:w-full flex justify-end max-md:justify-center max-md:px-4">
            <div>
              <h1 className="text-slate-700 font-semibold text-2xl">
                {`Before someone else files for your name, why don't you get it?`}
              </h1>
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
          <div className="w-[500px] max-md:w-full max-md:px-4 text-slate-800 flex justify-center max-md:justify-start">
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
        <div className="flex-center w-full m-auto pb-10 mt-3 max-md:mt-7 max-md:pb-0">
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
      <section className="flex-center mt-28 max-md:mt-20 ">
        <div className="flex max-md:flex-col gap-20 max-md:gap-10">
          <div className="w-[500px] max-md:w-[90%] max-md:m-auto">
            <div className="text-center flex flex-col gap-4 ">
              <h1 className="text-4xl text-[#025da0] font-bold">FAQs</h1>
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
          <div className="w-[600px] max-md:w-[90%] max-md:m-auto flex flex-col gap-10">
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
          <h1 className="text-4xl max-md:text-3xl text-[#025da0] font-bold">
            Trusted by clients in over 20 countries
          </h1>
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
          <div className="flex-center">
            <div className="bg-white flex-center max-md:flex-col shadow-md rounded-md">
              <WhyChooseCard number={`12+`} title={`Years Experience`} />
              <WhyChooseCard number={`99%`} title={`Customer Approval`} />
              <WhyChooseCard number={`7k+`} title={`Trademarks Managed`} />
            </div>
          </div>
          <div className="flex justify-center border-t-1 mx-14 max-md:mx-0 mt-10 pt-9 overflow-hidden">
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
            className="bg-gradient-to-tr to-[#0b72e7] from-blue-700 text-white text-lg animate-bounce hover:animate-none px-28 py-8 shadow-lg shadow-blue-200 max-md:w-[80%]"
          >
            Trademark Now
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
                  <h1 className="text-slate-800 font-semibold text-lg ">
                    Call us at:
                    <Link
                      href="tel:+13104244909"
                      className="text-blue-600 font-semibold"
                    >
                      +1 (310) 424 4909
                    </Link>
                  </h1>
                  <p className="text-xs text-slate-700">
                    Mon-Fri 6:00 am - 5:00 pm
                  </p>
                  <div className="mt-4">
                    <h1 className="text-slate-800 font-semibold text-lg">
                      Email us for any support:
                    </h1>
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
    </>
  );
};

export default LandingPage;
