import SystemHeroSection from "@/components/form/new/system-hero-section";
import StepOne from "@/components/form/steps/StepOne";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import React from "react";

const page = () => {
  return (
    <main className="">
      <Header />
      <SystemHeroSection />
      <StepOne />
      <FooterSection />
    </main>
  );
};

export default page;
