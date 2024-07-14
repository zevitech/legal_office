import FormHero from "@/components/form/FormHero";
import StepThree from "@/components/form/steps/StepThree";
import StepTwo from "@/components/form/steps/StepTwo";
import React from "react";

export const metadata = {
  title: "Step 3 - Choose your package | Trademark Register | USPTO",
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
