import FormHero from "@/components/form/FormHero";
import StepOne from "@/components/form/steps/StepOne";
import React from "react";

const page = () => {
  return (
    <main className="">
      <FormHero step={1} />
      <StepOne />
    </main>
  );
};

export default page;
