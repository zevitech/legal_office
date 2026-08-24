import React from "react";
import Header from "@/components/ui/Header";
import { Button, Input, Textarea } from "@nextui-org/react";
import TMButton from "@/components/ui/TMButton";
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
  title: "Trademark Filing Support Contact | Legal Trademark Office",
  description:
    "Send your trademark filing-support question to Legal Trademark Office LLC or start your U.S. trademark application online.",
  alternates: { canonical: "/contact-us" },
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
              Get Help with Your Trademark Filing
            </h1>
            <p className="text-slate-100 text-lg text-center max-w-[700px] m-auto max-md:text-start">
              Tell our filing-support team what you need, or start your
              application online and we will follow up using the details you
              provide.
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
                <h2 className="text-color-primary font-bold text-2xl">
                  Start your filing with a clear next step
                </h2>
                <p className="text-base text-slate-600 mt-4">
                  Choose a service plan, provide your mark and business details,
                  and review the prepared filing information before submission.
                  Our support team follows up after you begin.
                </p>
              </div>
              <div className="text-slate-700">
                <h4 className="text-xl font-normal mb-7 max-md:font-bold max-md:mb-1">
                  Customer Support:
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex-center gap-10 -m-5 max-md:flex-col max-md:gap-3 max-md:-mt-0">
                    <Link href="tel:+13104244909" className="flex-center">
                      <Image
                        width={70}
                        height={70}
                        alt="call icon"
                        src={`/images/footer-call-icon.png`}
                        className="object-contain"
                      />
                      <h4 className="text-lg font-bold text-color-primary">
                        +1 (310) 424 4909
                      </h4>
                    </Link>
                  </div>
                </div>
                <p className="mt-5">Legal Trademark Office LLC is organized in Virginia.</p>
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

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default page;
