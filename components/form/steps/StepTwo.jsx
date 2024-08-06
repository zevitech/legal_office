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
  const [classification, setClassification] = useState("");

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepOneData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // store the data to state and foreword to next step
    dispatch(saveStepTwo({ classification }));
    return router.push("/trademark-register/step-3");
  };

  return (
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16 max-md:mt-10">
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
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
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
            className="px-10"
          >
            Next
          </Button>
        </ButtonContainer>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700">
            <IoMdLock className="text-lg" />
            <p>{`Click on "Next" to save your application`}</p>
          </div>
          <p className="text-sm text-slate-500 mb-16">
            Once you have received your search(es) and our specialists have
            curated your Trademark application, Trademark Genius will collect
            and pay the government-discounted TEAS Standard electronic filing
            fee of $350.
          </p>
        </div>
      </form>
    </section>
  );
};

export default StepTwo;
