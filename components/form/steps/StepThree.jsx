"use client";

import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import BoldLabel from "../BoldLabel";
import NormalLabel from "../NormalLabel";
import SmallLabel from "../SmallLabel";
import TinyWarning from "../TinyWarning";
import InputField from "../InputField";
import RadioGroupField from "../RadioGroupField";
import { Radio, RadioGroup, Input, Button, Textarea } from "@nextui-org/react";
import ContainerTab from "../ContainerTab";
import GroupContainer from "../GroupContainer";
import ButtonContainer from "../ButtonContainer";
import { useRouter } from "next/navigation";
import Package from "../Package";
import { _35_USD, _135_USD, _235_USD } from "@/constant/packages";

const StepThree = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [classification, setClassification] = useState("");

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // after submit validate the form

    return router.push("/trademark-register/step-3");
  };

  return (
    <section className=" m-auto w-full flex flex-col gap-11 mt-16">
      <div className="flex flex-col gap-3 m-auto w-[700px]">
        <h1 className="text-slate-600 font-semibold text-3xl">
          Choose a Package
        </h1>
        <NormalLabel
          text={`All packages include lifetime customer support and our 100% satisfaction guaranteed.`}
        />
      </div>
      <div className="flex justify-center gap-7 pb-11">
        <Package
          price={`35`}
          packageName={`Basic`}
          complementaryTreat={`+ USPTO Fee $350/Class*`}
          rows={_35_USD}
        />
        <Package
          price={`135`}
          packageName={`Standard`}
          complementaryTreat={`+ USPTO Fee $350/Class*`}
          rows={_135_USD}
          badge={true}
        />
        <Package
          price={`235`}
          packageName={`Premium`}
          complementaryTreat={`+ USPTO Fee $350/Class*`}
          rows={_235_USD}
        />
      </div>

      {/*previous button */}
      <div className="w-[90%] m-auto float-right">
        <Button
          color="secondary"
          variant="shadow"
          onClick={() => router.back()}
        >
          Previous
        </Button>
      </div>
    </section>
  );
};

export default StepThree;
