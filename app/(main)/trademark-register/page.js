import SystemHeroSection from "@/components/form/form2.0/system-hero-section";
import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepOne from "@/components/form/steps/StepOne";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import React from "react";

const page = () => {
  return (
    <main className="">
      <Header />
      <SystemHeroSection />

      {/* TAG - 1001 */}
      <SystemStepProgressTracker p_value={25} />

      <StepOne />
      <FooterSection />
    </main>
  );
};

export default page;
