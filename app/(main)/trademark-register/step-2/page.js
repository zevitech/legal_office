import FormHero from "@/components/form/FormHero";
import StepTwo from "@/components/form/steps/StepTwo";
import React from "react";

export const metadata = {
  title: "Step 2 - Trademark Register | USPTO",
};

const page = () => {
  return (
    <main className="">
      <FormHero step={2} />
      <StepTwo />
    </main>
  );
};

export default page;
