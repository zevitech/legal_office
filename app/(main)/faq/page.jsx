import React from "react";
import Header from "@/components/ui/Header";
import TMButton from "@/components/ui/TMButton";
import FooterSection from "@/components/sections/FooterSection";
import FaqAccordion from "@/components/sections/FaqAccordion";

export const metadata = {
  title: "Trademark Filing Support FAQs | Legal Trademark Office",
  description:
    "Get clear answers about U.S. trademark filing support, service plans, application preparation and what happens after you get started.",
  alternates: { canonical: "/faq" },
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
              Trademark filing support made easier to understand, with a clear
              next step when you are ready to begin.
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
