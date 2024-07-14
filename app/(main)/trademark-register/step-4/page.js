import FormHero from "@/components/form/FormHero";
import StepFour from "@/components/form/steps/StepFour";
import StepThree from "@/components/form/steps/StepThree";
import StepTwo from "@/components/form/steps/StepTwo";
import React from "react";

export const metadata = {
  title: "Step 4 - Trademark Register | USPTO",
};

const page = () => {
  return (
    <main className="mb-10">
      <FormHero step={4} />
      <StepFour />
    </main>
  );
};

export default page;
