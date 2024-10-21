import React from "react";
import Header from "@/components/ui/Header";
import { Button, Input, Textarea } from "@nextui-org/react";
import TMButton from "@/components/ui/TMButton";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FooterSection from "@/components/sections/FooterSection";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { MdQuestionAnswer } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { FaSquarePhone } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title:
    "Contact Us - Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-contactBg w-full h-[90vh] max-md:h-auto max-md:py-[100px] bg-no-repeat bg-cover bg-bottom flex-center px-20 max-md:px-5">
          <div className="col-flex gap-6">
            <h1 className="text-4xl max-md:text-3xl font-bold text-white">
              Contact Us Today for Brighter Tomorrow
            </h1>
            <p className="text-slate-100 text-lg text-center max-w-[700px] m-auto max-md:text-start">
              {`Connect with us today to pave the path for a brighter, more
              promising tomorrow. Your inquiries and feedback are the building
              blocks of our shared success. Let's make a difference together.`}
            </p>
            <div className="flex-center gap-10 mt-5 max-md:mt-0">
              <TMButton px="80px" py="30px" text={"Trademark Now"} />
            </div>
          </div>
        </section>

        {/* contact form */}
        <section className="py-28 max-md:py-16">
          <form
            method="POST"
            className="w-[950px] max-md:w-full flex flex-col gap-9 p-10 max-md:p-5 m-auto rounded-lg relative z-20"
          >
            <div className="flex-center gap-9 max-md:flex-col max-md:gap-7">
              <Input
                type="text"
                label="Enter Full Name"
                labelPlacement="outside"
                startContent={
                  <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="text-slate-200"
                isRequired
                radius="sm"
                size="lg"
              />
              <Input
                type="email"
                label="Enter Email Address"
                labelPlacement="outside"
                startContent={
                  <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="text-slate-200"
                isRequired
                radius="sm"
                size="lg"
              />
            </div>
            <div className="flex-center gap-9 max-md:flex-col max-md:gap-7">
              <Input
                type="number"
                label="Enter Your Phone Number"
                labelPlacement="outside"
                startContent={
                  <FaSquarePhone className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="text-slate-200"
                isRequired
                radius="sm"
                size="lg"
              />
              <Input
                type="text"
                label="Enter Your Question"
                labelPlacement="outside"
                startContent={
                  <BsFillQuestionSquareFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="text-slate-200"
                isRequired
                radius="sm"
                size="lg"
              />
            </div>
            <div className="flex-center">
              <Textarea
                type="text"
                label="Enter Details Here"
                labelPlacement="outside"
                startContent={
                  <MdQuestionAnswer className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                className="text-slate-200"
                isRequired
                radius="sm"
                size="lg"
              />
            </div>
            <div className="flex justify-end">
              <Button
                color="primary"
                size="lg"
                endContent={
                  <BsFillSendFill className="text-2xl text-slate-200 pointer-events-none flex-shrink-0" />
                }
                className="py-8 px-20 max-md:w-full"
              >
                Send Message
              </Button>
            </div>
          </form>
        </section>

        <section className="bg-[#E9EFF3] py-20 relative max-md:px-5">
          <div>
            <div className="flex-center gap-20 max-md:flex-col max-md:gap-10">
              <div className="max-w-lg">
                <h1 className="text-color-primary font-bold text-2xl">
                  {`Before someone else files for your name, why don't you get it?`}
                </h1>
                <p className="text-base text-slate-600 mt-4">
                  {`
                    Protect your brand before it's too late. Schedule a free consultation with a qualified legal professional to discuss your trademark needs and explore your options. Unsure of the next steps? We're here to guide you through every part of the process.
                    `}
                </p>
              </div>
              <div className="text-slate-700">
                <h4 className="text-xl font-normal mb-7 max-md:font-bold max-md:mb-1">
                  Call Now for a Free Consultation:
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex-center gap-10 -m-5 max-md:flex-col max-md:gap-3 max-md:-mt-0">
                    <Link href="tel:+1(209)8135108" className="flex-center">
                      <Image
                        width={70}
                        height={70}
                        alt="call icon"
                        src={`/images/footer-call-icon.png`}
                        className="object-contain"
                      />
                      <h4 className="text-lg font-bold text-color-primary">
                        +1 (209) 813 5108
                      </h4>
                    </Link>
                    <div className="text-slate-500 text-xs max-md:mb-4">
                      <p>Mon-Fri: 5 a.m.-7 p.m. PT</p>
                      <p>Weekends: 7 a.m.-4 p.m. PT</p>
                    </div>
                  </div>
                </div>
                <p className="mt-5">All of our experts are based in the U.S.</p>
              </div>
            </div>

            <div className="flex-center gap-10 absolute bottom-[-30px] left-1/2 -translate-x-1/2 max-md:flex-col max-md:gap-4 max-md:relative">
              <Button
                as={Link}
                href="/contact-us"
                className="px-[80px] py-[30px] font-semibold text-color-primary w-fit capitalize border-[#027DD6] bg-white max-md:w-full"
                radius="md"
                variant="bordered"
              >
                contact now
              </Button>
              <TMButton px="80px" py="30px" text={"Trademark Now"} />
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
