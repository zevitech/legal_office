import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import FooterSection from "@/components/sections/FooterSection";
import ExpandableText from "@/components/ui/ExpandableText";

export const metadata = {
  title: "About Legal Trademark Office LLC | Filing Support",
  description:
    "Meet Legal Trademark Office LLC, a Virginia trademark filing-support company helping customers prepare and submit U.S. trademark applications.",
  alternates: { canonical: "/about-us" },
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
                <p className="text-[55px] max-md:text-4xl font-normal text-[#027DD6] text-center">
                  Know About
                </p>
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
                  text={`Legal Trademark Office LLC is a Virginia limited liability company focused on U.S. trademark filing support. We help customers turn their brand, ownership, goods or services, and filing-basis information into an organized application for review before submission.
Our service plans are built around clear preparation times and defined support. Customers approve their filing information and any separate USPTO class fees before filing. When a matter requires individualized legal advice or representation, attorney involvement is offered only through a separate written engagement after appropriate review.`}
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

        {/* customer confidence section */}
        <section className="bg-[#E9EFF3] py-20 max-md:py-16 shadow-inner-md">
          <div className="mx-auto grid max-w-5xl gap-5 px-5 md:grid-cols-3">
            {[
              ["Virginia LLC", "A registered U.S. filing-support company"],
              ["Clear package scope", "Know the service work included before checkout"],
              ["Approval before filing", "Review application details and separate USPTO fees"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl bg-white p-7 text-center shadow-sm">
                <h2 className="text-xl font-bold text-color-primary">{title}</h2>
                <p className="mt-3 leading-6 text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* experience partners */}
        <section className="pt-32 max-md:pt-20 mb-[8rem]">
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
                  Choose filing support that helps organize the information
                  needed for a U.S. trademark application and keeps the next
                  step clear.
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
                    <span>Application Preparation</span>
                  </li>
                  <li className="text-slate-600 font-bold flex items-center gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/rectangle-icon.png`}
                      className="object-contain"
                    />
                    <span>Customer Review Before Submission</span>
                  </li>
                  <li className="text-slate-600 font-bold flex items-center gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/rectangle-icon.png`}
                      className="object-contain"
                    />
                    <span>Application Status Updates</span>
                  </li>
                </ul>
              </div>
              <TMButton px="70px" py="30px" text={"Start Now"} />
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
