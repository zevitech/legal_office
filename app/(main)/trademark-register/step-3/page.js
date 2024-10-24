import FormHero from "@/components/form/FormHero";
import SystemHeroSection from "@/components/form/form2.0/system-hero-section";
import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepThree from "@/components/form/steps/StepThree";
import StepTwo from "@/components/form/steps/StepTwo";
import FooterSection from "@/components/sections/FooterSection";
import Header from "@/components/ui/Header";
import React from "react";

export const metadata = {
  title: "Step 3 - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <main className="mb-10">
      <Header />
      <SystemHeroSection />
      <SystemStepProgressTracker />
      <StepThree />
      <FooterSection />
    </main>
  );
};

export default page;
