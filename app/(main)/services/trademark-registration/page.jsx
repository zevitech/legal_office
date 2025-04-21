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
import PackageCard2 from "@/components/ui/PackageCard2";

export const metadata = {
  title:
    "Trademark Registration - Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-strBanner bg-fixed w-full h-[90vh] max-md:h-auto max-md:pt-[100px] max-md:pb-[60px] bg-no-repeat bg-cover bg-bottom flex-center px-20 max-md:px-5">
          <div className="col-flex gap-6">
            <h1 className="text-4xl max-md:text-3xl font-bold text-white">
              Protect Your Brand with Expert Trademark Services
            </h1>
            <p className="text-slate-100 text-lg text-center max-w-[700px] m-auto max-md:text-start">
              Comprehensive Trademark Registration, Monitoring, and Enforcement
              to Secure Your Business Identity
            </p>
            <div className="flex-center gap-10 mt-5 max-md:flex-col max-md:gap-1 max-md:mt-0">
              <TMButton px="80px" py="30px" text={"Start Now"} />
              <Button
                as={Link}
                href="/contact-us"
                className="px-[50px] py-[30px] font-semibold text-white w-fit capitalize"
                radius="sm"
                variant="light"
                endContent={
                  <FaArrowRightLong className="text-white text-[20px]" />
                }
              >
                contact us
              </Button>
            </div>
          </div>
        </section>

        {/* statistic section */}
        <section className="bg-[#E9EFF3] py-20 max-md:py-16 shadow-inner-lg">
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
        <section className="pt-40 max-md:pt-20 max-md:px-5">
          <div className="flex-center gap-20 max-md:flex-col-reverse max-md:gap-10">
            <div className="max-w-lg col-flex gap-7">
              <h1 className="text-4xl font-bold text-slate-800">
                Protect Your Business From Infringement
              </h1>
              <div className="col-flex gap-6 text-lg ">
                <ul className="col-flex gap-5">
                  <li className="flex items-start gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/check-icon-filled.png`}
                      className="object-contain mt-1"
                    />
                    <div>
                      <h1 className="text-lg font-bold text-slate-800">
                        Get ® Symbol on Logos
                      </h1>
                      <p className="max-w-[400px] text-sm mt-1 text-slate-500">
                        File a case against anyone infringing upon your rights
                        through trademark registration
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/check-icon-filled.png`}
                      className="object-contain mt-1"
                    />
                    <div>
                      <h1 className="text-lg font-bold text-slate-800">
                        Protect & Verify Domain Name
                      </h1>
                      <p className="max-w-[400px] text-sm mt-1 text-slate-500">
                        {`We help you verify that your domain name isn't similar
                        to someone's copyrighted trademark`}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Image
                      width={20}
                      height={20}
                      alt="rectangle"
                      src={`/images/check-icon-filled.png`}
                      className="object-contain mt-1"
                    />
                    <div>
                      <h1 className="text-lg font-bold text-slate-800">
                        Differentiate Your Business
                      </h1>
                      <p className="max-w-[400px] text-sm mt-1 text-slate-500">
                        Trademark registration provides you with the evidence of
                        business ownership, creating trust
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <TMButton px="70px" py="30px" text={"Start Now"} />
            </div>
            <div className="">
              <Image
                width={500}
                height={500}
                alt="partners"
                src={`/images/user-partner.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* packages section */}
        <section className="pt-32 max-md:pt-20 max-md:px-5">
          <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto mb-14 max-md:mb-9">
            <HeaderText text1="Trademark" text2="Registration Packages" />
            <p className="text-slate-500 text-base text-center">
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
