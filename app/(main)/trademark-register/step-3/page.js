import FormHero from "@/components/form/FormHero";
import StepThree from "@/components/form/steps/StepThree";
import StepTwo from "@/components/form/steps/StepTwo";
import React from "react";

export const metadata = {
  title: "Step 3 - Register Trademark | Legal Trademark Office",
};

const page = () => {
  return (
    <main className="mb-10">
      <FormHero step={3} />
      <StepThree />
    </main>
  );
};

export default page;
