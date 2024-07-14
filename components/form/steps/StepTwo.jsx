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

const StepTwo = () => {
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
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16">
      <form
        action=""
        method="post"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <FieldContainer>
          <BoldLabel text={`Trademark Classification`} />
          <SmallLabel
            text={`Start describing the goods and services related to your mark. ${process.env.NEXT_PUBLIC_APP_NAME} compare the description you provide and provides descriptions from the USPTO ID Manual for your considerations.`}
          />
          <Textarea
            variant="bordered"
            label="Please provide a description of your goods or services:"
            labelPlacement="outside"
            placeholder="Enter your description"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
          />
        </FieldContainer>

        {/* next or previous button */}
        <ButtonContainer>
          <Button
            color="secondary"
            variant="shadow"
            onClick={() => router.back()}
          >
            Previous
          </Button>
          <Button
            color="primary"
            variant="shadow"
            type="submit"
            isLoading={isLoading}
          >
            Next
          </Button>
        </ButtonContainer>
      </form>
    </section>
  );
};

export default StepTwo;
