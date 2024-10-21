import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import { whyChooseUs } from "@/constant";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FooterSection from "@/components/sections/FooterSection";
import SimilarMarks from "@/components/sections/SimilarMarks";

export const metadata = {
  title:
    "Services - Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-itBanner w-full h-[85vh] max-md:h-auto max-md:pt-[100px] bg-no-repeat bg-cover bg-bottom flex items-center px-20 max-md:px-5">
          <div className=" flex-between -mt-24 max-md:mt-0 max-md:flex-col">
            <div className="col-flex gap-6 max-md:gap-4 w-[600px] max-md:w-full">
              <h1 className="text-4xl max-md:text-3xl font-bold text-white">
                Protect Your Brand with Expert Trademark Services
              </h1>
              <p className="text-slate-100 text-lg">
                Comprehensive Trademark Registration, Monitoring, and
                Enforcement to Secure Your Business Identity
              </p>
              <div className="flex items-center gap-10 max-md:flex-col max-md:gap-1">
                <TMButton px="80px" py="30px" text={"Start Now"} />
                <Button
                  as={Link}
                  href="/contact-us"
                  className="px-[50px] py-[30px] font-semibold text-white w-fit capitalize"
                  radius="md"
                  variant="light"
                  endContent={
                    <FaArrowRightLong className="text-white text-[20px]" />
                  }
                >
                  contact us
                </Button>
              </div>
            </div>
            <Image
              width={700}
              height={700}
              alt="image-gallary"
              src={`/images/image-gallary.png`}
              className="object-contain absolute bottom-[-130px] max-md:bottom-[-40px] right-0 max-md:relative max-md:w-full"
            />
          </div>
        </section>

        {/* experience partners */}
        <section className="pt-40 max-md:pt-16 max-md:px-5">
          <div className="flex-center gap-20 max-md:flex-col-reverse max-md:gap-8 ">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="partners"
                src={`/images/user-partner.png`}
                className="object-contain"
              />
            </div>
            <div className="max-w-lg col-flex gap-7">
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

        {/* similar marks section */}
        <section className="py-28 max-md:px-5 max-md:py-20">
          <SimilarMarks />
        </section>

        {/* why choose us */}
        <section className="bg-[#E5F4FF] py-28 shadow-inner-md max-md:py-20 max-md:px-5">
          <div className="col-flex justify-center items-center gap-5 max-w-3xl m-auto !text-[#075A96]">
            <HeaderText text1=" " text2="Why Choose Us" />
            <p className=" text-base text-center">
              Trademark applicants represented by attorneys are 50% more likely
              to successfully register than those who go it alone.
            </p>
          </div>
          <div className="flex-center gap-10 mt-14 max-md:flex-col">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="w-[250px] max-md:w-full rounded-lg shadow-lg col-flex gap-5 p-6 text-center bg-slate-100 hover:shadow-none"
              >
                <Image
                  width={100}
                  height={100}
                  alt="icon"
                  src={`/images/${item.icon}`}
                  className="object-contain m-auto"
                />
                <h1 className="text-color-primary font-bold">{item.heading}</h1>
                <p className="text-slate-600 text-sm">{item.details}</p>
                <TMButton px="70px" py="30px" text={"Start Now"} />
              </div>
            ))}
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
