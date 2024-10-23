import FormHero from "@/components/form/FormHero";
import SystemHeroSection from "@/components/form/new/system-hero-section";
import StepTwo from "@/components/form/steps/StepTwo";
import Header from "@/components/ui/Header";
import React from "react";

export const metadata = {
  title: "Step 2 - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <main className="">
      <Header />
      <SystemHeroSection />
      <StepTwo />
    </main>
  );
};

export default page;
