import React from "react";
import Header from "@/components/ui/Header";
import Image from "next/image";
import HeaderText from "@/components/ui/HeaderText";
import TMButton from "@/components/ui/TMButton";
import AttorneyCard from "@/components/ui/AttorneyCard";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FooterSection from "@/components/sections/FooterSection";
import BusinessStructure from "@/components/sections/BusinessStructure";
import RebonCard from "@/components/sections/RebonCard";
import PackageCard from "@/components/ui/PackageCard";
import RevivalPriceSection from "@/components/sections/RevivalPriceSection";
import PackageCard2 from "@/components/ui/PackageCard2";

export const metadata = {
  title: "International Trademark | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main className="bg-slate-100">
        {/* Hero Section */}
        <section className="bg-freeSearch w-full h-[90vh] max-md:h-auto max-md:py-28 max-md:px-5 bg-no-repeat bg-cover bg-bottom flex-center">
          <div className="w-[1000px] max-md:w-full col-flex gap-10 -mt-20 max-md:mt-0">
            <div className="col-flex gap-5">
              <h1 className="text-[40px] max-md:text-3xl font-bold text-white text-start leading-normal capitalize">
                {`Revive & Protect Your Trademark - Get Back What's Yours!`}
              </h1>
              <div className="text-slate-200 text-start text-lg max-md:text-base">
                <p>
                  {` Has your trademark fallen into inactive status? Don't worry; our
                expert team specializes in trademark revival, ensuring that your
                brand's identity remains protected and legally secure. We offer
                comprehensive guidance to reactivate your trademark quickly and
                efficiently.`}
                </p>
                <p>{`Let us help you reclaim your brand's legal rights and secure your identity in the marketplace.`}</p>
              </div>
              <div className="flex mt-2 gap-7">
                <TMButton px="80px" py="30px" text={"Start Now"} />
                <TMButton
                  px="80px"
                  py="30px"
                  color={`transparent`}
                  text={"Contact Us"}
                />
              </div>
            </div>
          </div>
        </section>

        {/* trademark filing */}
        <section className="py-32 max-md:py-16 max-md:px-5">
          <div className="flex-center gap-20 max-md:flex-col max-md:gap-8 ">
            <div className="">
              <Image
                width={500}
                height={500}
                alt="partners"
                src={`/images/trademark-revival.jpg`}
                className="object-contain rounded-xl"
              />
            </div>
            <div className="max-w-lg col-flex gap-7">
              <ul className="col-flex gap-7 max-md:gap-5">
                <li className="flex gap-3 items-start">
                  <Image
                    width={40}
                    height={40}
                    alt="rectangle"
                    src={`/images/tr-1.png`}
                    className="object-contain"
                  />
                  <div className="">
                    <h1 className="text-2xl max-md:text-xl font-semibold">
                      Trademark Revival Filing
                    </h1>
                    <p className="text-base mt-2">
                      Expert assistance in filing the necessary documents to
                      revive and secure your trademark status.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Image
                    width={40}
                    height={40}
                    alt="rectangle"
                    src={`/images/tr-2.png`}
                    className="object-contain"
                  />
                  <div className="">
                    <h1 className="text-2xl max-md:text-xl font-semibold">
                      Guided Revival Process
                    </h1>
                    <p className="text-base mt-2">
                      Our specialists guide you through every step of the
                      trademark revival, ensuring clarity and support
                      throughout.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <Image
                    width={40}
                    height={40}
                    alt="rectangle"
                    src={`/images/tr-3.png`}
                    className="object-contain"
                  />
                  <div className="">
                    <h1 className="text-2xl max-md:text-xl font-semibold">
                      Fast & Reliable
                    </h1>
                    <p className="text-base mt-2">
                      We make the process quick and hassle-free so that your
                      brand can regain its legal protection without delay.
                    </p>
                  </div>
                </li>
              </ul>
              <TMButton px="70px" py="30px" text={"Start Now"} />
            </div>
          </div>
        </section>

        {/* rebon card section */}
        <section className="pb-28 max-md:pb-0">
          <RebonCard header={`Ready to Revive and Secure Your Trademark?`} />
        </section>

        {/* attorney section */}
        <section className="relative pb-28">
          <div className="bg-[#DFEAF1] h-[530px] absolute w-full top-0"></div>
          <div className="flex-between gap-7 max-md:gap-1 max-w-5xl m-auto pt-24 max-md:pt-20 pb-16 relative">
            <div className="flex items-end">
              <Image
                width={130}
                height={130}
                alt="'"
                src={`/images/meter-hand-icon.png`}
                className="object-contain"
              />
            </div>
            <div className="col-flex justify-center items-center gap-4">
              <h1 className="text-4xl max-md:text-3xl text-slate-700">
                <span className="font-bold text-color-primary">{`Attorneys with`}</span>
                <span className="font-normal">{` You Every Step of the Way`}</span>
              </h1>
              <p className="text-slate-600 text-base text-center">
                {`At Legal Trademark Office, our experienced attorneys have represented a wide range of businesses, from Amazon sellers and clothing designers to professional service providers. We understand the unique needs of every business and are dedicated to ensuring your brand is protected with expert legal guidance.`}
              </p>
            </div>
            <div className="flex items-end">
              <Image
                width={130}
                height={130}
                alt="'"
                src={`/images/hammer-icon.png`}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex-center gap-10 max-md:flex-col">
            <AttorneyCard
              name={`Luez. kafe`}
              details={`Luez has extensive experience in trademark law and is committed to helping businesses protect their intellectual property, With over 7 years of legal experience.`}
              imageName={`attorney-1.png`}
            />
            <AttorneyCard
              name={`James Clarke`}
              details={`James is a seasoned intellectual property attorney who has represented a diverse range of clients, from small businesses to international corporations. His strategic approach ensures your trademark is secure and fully compliant.`}
              imageName={`attorney-2.png`}
            />
            <AttorneyCard
              name={`Sophia Green`}
              details={`With over 10 years of legal experience, Sophia specializes in helping startups secure their trademarks and grow their brand with confidence. She's known for her attention to detail and client-focused approach.`}
              imageName={`attorney-3.png`}
            />
          </div>
        </section>

        {/* packages section */}
        <section className="py-16 max-md:py-8 max-md:px-5">
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
