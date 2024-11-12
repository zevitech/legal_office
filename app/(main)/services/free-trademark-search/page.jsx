import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import FooterSection from "@/components/sections/FooterSection";
import PatentSection from "@/components/sections/PatentSection";
import CounterBoxTR from "@/components/ui/CounterBoxTR";
import TestimonialSection from "@/components/sections/TestimonialSection";
import BusinessStructure from "@/components/sections/BusinessStructure";
import Searchbar from "@/components/pages/home/search-bar";

export const metadata = {
  title: "Free Trademark Search | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const Page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-contactBg bg-fixed w-full h-[88vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[800px] max-md:w-full col-flex gap-10 -mt-20 max-md:mt-0">
            <div className="flex gap-3 max-md:gap-1">
              <h1 className="text-4xl max-md:text-3xl font-bold text-white text-center leading-normal">
                {`Secure Your Brand's Identity - Name, Logo, Slogan & More! Starting at
                Just $49 + USPTO Filing Fee`}
              </h1>
            </div>

            <Searchbar />
          </div>
        </section>

        {/* patent section */}
        <section className="py-28 max-md:px-4 max-md:py-16">
          <PatentSection />
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

        {/* business structure */}
        <section className="py-32 bg-slate-50 max-md:py-16 max-md:px-5">
          <BusinessStructure />
        </section>

        {/* testimonial section */}
        <section className="pb-8 pt-32 max-md:pt-16 pl-20 max-md:px-5">
          <TestimonialSection />
        </section>

        {/* footer section */}
        <FooterSection />
      </main>
    </>
  );
};

export default Page;
