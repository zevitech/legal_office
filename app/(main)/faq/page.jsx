import React from "react";
import Header from "@/components/ui/Header";
import { Button, Input, Textarea } from "@nextui-org/react";
import TMButton from "@/components/ui/TMButton";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FooterSection from "@/components/sections/FooterSection";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillQuestionSquareFill, BsPhoneFill } from "react-icons/bs";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { BiPhoneCall } from "react-icons/bi";
import { FaSquarePhone } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata = {
  title: "FAQ's - Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-faqBg w-full h-[90vh] max-md:h-auto max-md:py-[100px] bg-no-repeat bg-cover bg-bottom flex-center px-20 max-md:px-5">
          <div className="col-flex gap-6">
            <h1 className="text-5xl font-bold text-white max-md:text-center">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-100 text-lg text-center max-w-[700px] m-auto">
              {`Protect Your Brand with Confidence - Expert Trademark Services Made Simple.`}
            </p>
            <div className="flex-center gap-10 mt-5">
              <TMButton px="80px" py="30px" text={"Trademark Now"} />
            </div>
          </div>
        </section>

        {/* faq section */}
        <section className="pb-32 pt-16">
          <FaqAccordion />
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
