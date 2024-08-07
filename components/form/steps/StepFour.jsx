"use client";

import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import SmallLabel from "../SmallLabel";
import { Button, Checkbox } from "@nextui-org/react";
import ButtonContainer from "../ButtonContainer";
import { useRouter } from "next/navigation";
import { IoTimerOutline } from "react-icons/io5";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { saveStepFour } from "@/features/formSlice";

const StepFour = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const rushAmount = 49;
  const [isLoading, setIsLoading] = useState(false);
  const [isRushProcessing, setIsRushProcessing] = useState(false);
  const stepThreeData = useSelector((state) => state.form.stepThree);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepThreeData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      isRushProcessing,
      rushAmount: isRushProcessing ? rushAmount : 0,
      previous: true,
      receipt_ID: Math.floor(Math.random() * 900000 + 100000),
    };
    dispatch(saveStepFour(data)); // store data to state

    return router.push("/trademark-register/payment");
  };

  return (
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16 max-md:mt-10">
      <form
        action=""
        method="post"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-slate-700 font-semibold text-2xl mb-5">
          Add rush processing to expedite your application
        </h1>
        <div className="relative">
          <Image
            src={`/images/optional-bagde.png`}
            alt="optional badge"
            width={80}
            height={10}
            className="absolute right-[-5px] top-[-5px]"
          />
          <FieldContainer>
            <h1 className="text-[#03589c] font-medium text-2xl">
              {`You're nearly finished!`}
            </h1>
            <h1 className="text-[#03589c] font-medium text-lg  ">
              {`Do you need your order processed faster?`}
            </h1>
            <div className="flex gap-4 text-slate-700 mt-6 mb-3">
              <IoTimerOutline className="text-2xl max-md:text-5xl" />
              <div>
                <p className="text-slate-700 text-sm font-bold">
                  RUSH PROCESSING.
                </p>
                <p className="text-slate-700 text-sm font-bold">
                  COMPLETED NEXT DAY WHEN TIME IS OF THE ESSENCE.
                </p>
              </div>
            </div>

            <SmallLabel
              text={`We know time is critical. With Rush Processing, we will complete your search results by the next business day, and file the application immediately after you have approved it.`}
            />
            <Checkbox
              isSelected={isRushProcessing}
              onValueChange={setIsRushProcessing}
              size="md"
            >
              <span className="text-orange-600">*</span>24-hour Expedited
              Processing (Next Business Day):{" "}
              <span className="text-orange-600 font-semibold">
                ${rushAmount}.00 USD
              </span>
            </Checkbox>
          </FieldContainer>
        </div>

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
        <p className="text-sm max-md:text-xs text-slate-500 mb-16 mt-7">
          Once your search results have been reviewed and our specialists have
          curated your trademark application, Legal Trademark Office will
          collect the necessary fees and pay the discounted TEAS Standard
          electronic filing fee of $350 on your behalf.
        </p>
      </form>
    </section>
  );
};

export default StepFour;
