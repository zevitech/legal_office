"use client";

import React, { useState } from "react";
import LandingHeader from "../ui/LandingHeader";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";
import { serviceList } from "@/constant";
import Image from "next/image";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegisterClick = () => {
    setIsLoading(true);
    router.push("/trademark-register");
  };
  return (
    <>
      {/* hero section */}
      <section className="relative w-full">
        <div className="heroBg absolute"></div>
        {/* <div className="heroBgAfter absolute"></div> */}
        <LandingHeader />
        <div className="flex-center mt-8">
          <div className="flex flex-col gap-5 max-w-[1000px]">
            <h1 className="text-slate-800 text-5xl leading-tight font-bold text-center">
              Register a trademark for your Business Name, Slogan, or Logo
              Starting at
            </h1>
            <h1 className="text-slate-700 text-2xl font-bold text-center">
              <span className="text-[44px] text-[#025da0]">
                $35 + USPTO Filing Fee
              </span>
            </h1>
            <p className="text-slate-700 mt-4 text-center max-w-[80%] m-auto">
              Start by filling out our simple trademark questionnaire,
              Affordable Rates, Expert Legal Support, Get your serial number of
              trade mark registration once your trademark application is filed
              with us!
            </p>
          </div>
          {/* <div className="w-[50%] flex-center">
          <div>
            <p className="max-w-[500px] mb-5 text-slate-800">
              Protect your name, logo or slogan now! We make the process quick,
              easy and simple for you to ensure proper filing.
            </p>
            <div className="flex justify-start">
              <ul className="flex flex-col gap-3 w-max">
                {serviceList.map((list) => (
                  <li key={list.id} className="flex gap-2 items-center w-max">
                    <FaCheckCircle className="text-[#006fee]" />
                    <span className="text-sm text-slate-600">{list.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div> */}
        </div>
        <div className="flex-center mt-16">
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
        <div className="flex-center mt-12">
          <div className="flex-center gap-6">
            <Image
              src={"/images/trustpilot-logo.webp"}
              alt="Trustpilot Review"
              width={100}
              height={40}
              className="w-24 h-10"
            />
            <Image
              src={"/images/Untitled-design-1.webp"}
              alt="Google Review"
              width={110}
              height={40}
              className="w-24 h-16"
            />
            <Image
              src={"/images/accredited-business.jpg"}
              alt="trustpilot"
              width={110}
              height={40}
              className="w-24 h-10"
            />
            <Image
              src={"/images/Seal_of_the_United_States_Patent.png"}
              alt="Seal of the United States patient"
              width={110}
              height={40}
              className="w-20 h-20"
            />
            <Image
              src={
                "/images/Advisor-logo_2-line_Profile-V2-e1589299562467-removebg-preview.webp"
              }
              alt="Forbes"
              width={110}
              height={40}
              className="w-24 h-10"
            />
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default LandingPage;
