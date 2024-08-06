"use client";

import React, { useState } from "react";
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
      <section className="relative w-full ">
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
        </div>
        <div className="flex-center mt-16">
          <Button
            color="primary"
            radius="sm"
            onClick={handleRegisterClick}
            isLoading={isLoading}
            className="bg-gradient-to-tr to-[#0b72e7] from-blue-700 text-white text-lg animate-expand hover:animate-none px-28 py-8 shadow-lg shadow-blue-200"
          >
            Trademark Now
          </Button>
        </div>
        <div className="flex-center mt-12">
          <div className="flex-center gap-6">
            <Image
              src={"/images/trustpilot-logo.webp"}
              alt="Trustpilot Review"
              width={110}
              height={40}
              className="w-26 h-12"
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
      <section className="flex-center mt-24">
        <div className="flex flex-col gap-16">
          <div className="text-center flex flex-col gap-4">
            <h1 className="text-4xl text-[#025da0] font-bold">
              How Legal Trademark Works
            </h1>
            <p className="text-base text-slate-600">
              Get your trademark registered in just 3 easy steps using our
              simple online questionnaire.
            </p>
            <Image
              src={"/images/curve-DplsLMf8.webp"}
              width={300}
              height={10}
              alt="curve line"
              className="m-auto"
            />
          </div>
          <div className="flex-center">
            <div className="flex gap-4">
              <HowWorkCard
                step={1}
                title={`Complete Our Online Questionnaire`}
                description={`All information gathered is confidential and secured.`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4" />
              <HowWorkCard
                step={2}
                title={`We Review & Prepare the Application for Submission`}
                description={`Our specialists review for any missing information, conduct a Direct-Hit search and ensure the application is ready for quick and easy processing.`}
              />
              <AiOutlineDoubleRight className="text-3xl text-[#025da0] font-thin animate-left-to-r mt-4 " />
              <HowWorkCard
                step={3}
                title={`Application is Filed`}
                description={`The application is electronically with filed the USPTO for examination. You will be notified with all status updates and additional handling.`}
              />
            </div>
          </div>
          <div className="flex-center">
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

      {/* benefit section */}
      <section className="mt-24">
        <div className="ml-28 flex-between gap-32">
          <div className="flex flex-col gap-14 ">
            <div className="flex gap-14">
              <BenefitCard
                title={`Protects from Infringements`}
                description={`Registering your trademark gives you special rights. It means only you can use your mark, and others can't copy it.`}
                icon={`hand`}
              />
              <BenefitCard
                title={`Trademark Certified`}
                description={`By registering your trademark, you get official certification that your brand is real, proving its authenticity and making it more credible.`}
                icon={`registered`}
              />
            </div>
            <div className="flex gap-14">
              <BenefitCard
                title={`Secure Your Brand`}
                description={`When you register your trademark, you gain legal rights. It means you can protect your brand and maintain its integrity.`}
                icon={`scale`}
              />
              <BenefitCard
                title={`Secure Your Brand`}
                description={`When you register your trademark, you gain legal rights. It means you can protect your brand and maintain its integrity.`}
                icon={`trademark`}
              />
            </div>
          </div>
          <div className="">
            <Image
              src={"/images/marks-in-laptop.webp"}
              alt=""
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* contact us section */}
      <section className="bg-[#025da0] mt-28">
        <div className="flex-center gap-14">
          <div className="w-[500px] flex justify-end items-center">
            <div>
              <h1 className="text-slate-100 font-semibold text-3xl">
                Consult Our Experts
              </h1>
              <p className="text-slate-200 text-base mt-2 mb-6">
                Get the perfect guidance from our consultants.
              </p>
              <Button
                color="secondary"
                variant="shadow"
                radius="sm"
                onClick={handleRegisterClick}
                isLoading={isLoading}
              >
                Get Expert Help
              </Button>
            </div>
          </div>
          <Image
            src={"/images/expert-cta.png"}
            alt="Trust Pilot"
            width={150}
            height={300}
          />
          <div className="w-[500px] text-slate-200">
            <p className="font-semibold mb-1">Call an agent at: </p>
            <Link
              href={"tel:+12098135108"}
              className="text-slate-100 font-semibold text-3xl"
            >
              +1 (209) 813 5108
            </Link>
            <div className="mt-3 mb-5 text-sm">
              <p>Mon-Fri: 5 a.m.-7 p.m. PT</p>
              <p>Weekends: 7 a.m.-4 p.m. PT</p>
            </div>
            <p>All of our experts are based in the U.S.</p>
          </div>
        </div>
      </section>

      {/* faq section */}
      <section className="flex-center mt-28 ">
        <div className="flex gap-20">
          <div className="w-[500px]">
            <div className="text-center flex flex-col gap-4">
              <h1 className="text-4xl text-[#025da0] font-bold">FAQs</h1>
              <p className="text-base text-slate-600">
                {`Everything you need to know about the trademark. Can't find the
                answer you're looking for? Chat with our friendly team!`}
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
          <div className="w-[600px] flex flex-col gap-10">
            <p>
              Trademark Genius does not operate as a law firm. No information on
              our website is to be used as legal advice. Each situation can be
              affected by individual circumstances. We do not guarantee the
              approval of the USPTO, that the trademark will be protected from
              infringement or that any ensuing litigation will lead to a
              desirable outcome.
            </p>
            <div className="flex flex-col gap-2">
              <AccordionBox />
            </div>
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="flex flex-col gap-16 mt-28 bg-slate-50 py-24">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl text-[#025da0] font-bold">Why Choose Us</h1>
          <p className="text-base text-slate-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque,
            neque. adipisicing elit.
          </p>
          <Image
            src={"/images/curve-DplsLMf8.webp"}
            width={300}
            height={10}
            alt="curve line"
            className="m-auto"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-center gap-8">
            <WhyChooseCard
              number={`3500`}
              title={`Businesses`}
              description={`We've helped startups and entrepreneurs realize their dreams by protecting their mark.`}
            />
            <WhyChooseCard
              number={`8000`}
              title={`Consultations`}
              description={`We pride ourselves as a holistic platform for round-the-clock consultations.`}
            />
            <WhyChooseCard
              number={`4000`}
              title={`Trademark Applications`}
              description={`We've trademarked over 3500 businesses and we're still keeping count.`}
            />
          </div>
          <div className="flex justify-center border-t-1 mx-14 mt-10 pt-9">
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
        <div className="flex-center">
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
      </section>

      {/* testimonial section  */}
      <section className="flex-center gap-28 mt-24">
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
        <TestimonialCarousel />
      </section>

      {/* footer section */}
      <footer className="mt-28 bg-footer w-full bg-no-repeat bg-cover relative">
        <div className="footer-overly"></div>
        <div className="pt-20 z-30 relative">
          <div className="flex-center">
            <div className="w-[1100px] flex-center">
              <div className="w-[50%]">
                <Image
                  src={`/images/legal-trademark-logo.webp`}
                  alt="Legal Trademark"
                  width={200}
                  height={200}
                />
                <p className="mt-1 text-slate-400 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  dolorum praesentium nemo possimus dolore blanditiis ratione
                  quos, doloremque necessitatibus asperiores labore commodi rem
                  eius dicta molestiae vel, quae excepturi provident saepe sunt
                  facere! Tempore consectetur illum ad suscipit ipsum voluptate.
                </p>
              </div>
              <div className="w-[50%] flex-center">
                <div className="bg-slate-900 p-10 rounded-md bg-opacity-80">
                  <h1 className="text-slate-300 font-semibold text-lg ">
                    Call us at:{" "}
                    <Link
                      href="tel:+12098135108"
                      className="text-blue-600 font-semibold"
                    >
                      +1 209 813 5108
                    </Link>
                  </h1>
                  <p className="text-xs text-slate-300">
                    Mon-Fri 6:00 am - 5:00 pm
                  </p>
                  <div className="mt-4">
                    <h1 className="text-slate-300 font-semibold text-lg">
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
          <div className="mt-14 border-t-1 border-slate-700 py-6">
            <div className="text-slate-300 flex-center gap-1">
              <LuCopyright className=" text-lg" />
              <p>
                Copyright & all rights reserved by{" "}
                <Link href={"/"} className="text-blue-800">
                  Legal Trademark Office{" "}
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
