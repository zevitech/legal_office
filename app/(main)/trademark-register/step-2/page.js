import FormHero from "@/components/form/FormHero";
import StepTwo from "@/components/form/steps/StepTwo";
import React from "react";

const page = () => {
  return (
    <main className="">
      <FormHero step={2} />
      <StepTwo />
    </main>
  );
};

export default page;
