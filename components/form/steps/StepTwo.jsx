"use client";

import React, { useEffect, useState } from "react";
import FieldContainer from "../FieldContainer";
import BoldLabel from "../BoldLabel";
import SmallLabel from "../SmallLabel";
import { Button, Textarea } from "@nextui-org/react";
import ButtonContainer from "../ButtonContainer";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { saveStepTwo } from "@/features/formSlice";
import { IoMdLock } from "react-icons/io";

const StepTwo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const stepOneData = useSelector((state) => state.form.stepOne);
  const [isLoading, setIsLoading] = useState(false);
  const [trademarkClassification, setTrademarkClassification] = useState("");
  const [validation, setValidation] = useState(false);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepOneData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // PREVIOUS BUTTON HANDLER
  const handlePrevious = () => {
    router.back();
  };

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // if not validate, return or stop
    if (!trademarkClassification) {
      setValidation(true);
      setIsLoading(false);
      return;
    }

    // store the data to state and foreword to next step
    dispatch(saveStepTwo({ trademarkClassification }));
    return router.push("/trademark-register/step-3");
  };

  return (
    <main className="system-page-standard-layout flex flex-col gap-4">
      <div className="w-full flex flex-col gap-1">
        <h1 className="font-inria text-heading-color text-[24px] w-full">
          TRADEMARK CLASSIFICATION
        </h1>
        <p>
          Enter the products or services you plan to sell using your trademark
          (i.e.: clothing, coffee shops, restaurants, retail stores, etc).
        </p>
      </div>

      <div className="w-full h-full flex flex-col gap-8">
        <Textarea
          label="Trademark Classification Description"
          variant="bordered"
          labelPlacement="outside"
          placeholder={`i.e.: clothing, coffee shops, restaurants, retail stores...`}
          radius="sm"
          className="w-full"
          maxRows={12}
          minRows={12}
          value={trademarkClassification}
          onChange={(e) => setTrademarkClassification(e.target.value)}
          errorMessage={`Please provide a description of your goods or services.`}
          isInvalid={validation}
        />

        {/* BUTTONS AND CAPCHA */}
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <IoMdLock className="text-[14px] -translate-y-[2px]" />

            <p className="text-[14px] font-semibold">{`Click on "Next" to save your application`}</p>
          </div>

          <div className="w-full flex max-md:flex-col max-md:gap-4 md:justify-between">
            {/* PREVIOUS BUTTON */}
            <Button
              onClick={handlePrevious}
              className="h-[60px] bg-white w-full md:w-[165px] rounded-[5px] text-primary-theme border-2 border-primary-theme font-inria font-bold text-[20px]"
            >
              Previous
            </Button>

            {/* SUBMIT BUTTON */}
            <Button
              onClick={handleFormSubmit}
              className="h-[60px] w-full md:w-[165px] bg-primary-theme rounded-[5px] text-white font-inria font-bold text-[20px]"
              isLoading={isLoading}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StepTwo;
