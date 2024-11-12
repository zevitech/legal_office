"use client";

import Image from "next/image";
import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import SmallLabel from "../SmallLabel";
import { Button, Checkbox } from "@nextui-org/react";
import ButtonContainer from "../ButtonContainer";
import { useRouter } from "next/navigation";
import { IoTimerOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { saveStepFour } from "@/features/formSlice";
import { FaCreditCard } from "react-icons/fa6";

const StepFour = () => {
  const rushAmount = 29;
  const govermentFeesAmount = 350;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRushProcessing, setIsRushProcessing] = useState(false);
  const [isGovermentFeesProcessing, setIsGovermentFeesProcessing] =
    useState(false);
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
      govermentFeesAmount: isGovermentFeesProcessing ? govermentFeesAmount : 0,
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
          Add Rush Processing and Additional Government Fees
        </h1>

        <div className="relative mt-4">
          <Image
            src={`/images/optional-bagde.png`}
            alt="optional badge"
            width={80}
            height={10}
            className="absolute right-[-5px] top-[-5px]"
          />
          <FieldContainer>
            <div className="flex items-center gap-4 text-slate-700 mt-6 mb-3">
              <FaCreditCard className="text-2xl max-md:text-5xl" />

              <p className="text-slate-700 text-sm font-bold uppercase">
                Federal Filing Fee (1 - Class) $350
              </p>
            </div>

            <p className="font-bold text-[14px]">Disclaimer</p>

            <SmallLabel
              text={`The package includes the government fee of $350 for the registration of one mandatory class for your trademark. Our expert paralegals will review your case to determine the optimal number of classes needed to fully protect your business name, logo, or slogan. Additional government fees may apply for each additional class identified during the paralegal team's review. You will be informed about additional classes before proceeding. Our goal is to ensure comprehensive protection for your intellectual property, and our team will guide you through the process with transparency and expertise.`}
            />
            <Checkbox
              isSelected={isGovermentFeesProcessing}
              onValueChange={setIsGovermentFeesProcessing}
              size="md"
              className="mt-4"
            >
              Federal fee:{" "}
              <span className="text-primary-theme font-semibold">
                ${govermentFeesAmount}.00 USD
              </span>
            </Checkbox>
          </FieldContainer>
        </div>

        <div className="relative">
          <Image
            src={`/images/optional-bagde.png`}
            alt="optional badge"
            width={80}
            height={10}
            className="absolute right-[-5px] top-[-5px]"
          />
          <FieldContainer>
            <div className="flex gap-4 items-center text-slate-700 mt-6 mb-3">
              <IoTimerOutline className="text-2xl max-md:text-5xl" />

              <p className="text-slate-700 text-sm font-bold uppercase">
                Rush Processing.
              </p>
            </div>

            <SmallLabel
              text={`We know time is critical. With Rush Processing, we will complete your search results by the next business day, and file the application immediately after you have approved it.`}
            />
            <Checkbox
              isSelected={isRushProcessing}
              onValueChange={setIsRushProcessing}
              size="md"
              className="mt-4"
            >
              24-hour Expedited Processing (Next Business Day):{" "}
              <span className="text-primary-theme font-semibold">
                ${rushAmount}.00 USD
              </span>
            </Checkbox>
          </FieldContainer>
        </div>

        {/* next or previous button */}
        <ButtonContainer>
          <Button
            onClick={() => router.back()}
            className="h-[60px] bg-white w-full md:w-[165px] rounded-[5px] text-primary-theme border-2 border-primary-theme font-inria font-bold text-[20px]"
          >
            Previous
          </Button>

          <Button
            className="h-[60px] w-full md:w-[165px] bg-primary-theme rounded-[5px] text-white font-inria font-bold text-[20px]"
            type="submit"
            isLoading={isLoading}
          >
            Next
          </Button>
        </ButtonContainer>

        <p className="text-md max-md:text-sm text-slate-800 mb-16 mt-7 font-medium">
          <span className="text-red-500 font-bold">Note:</span> Once your search
          results have been reviewed and our specialists have curated your
          trademark application, Legal Trademark Office will collect the
          necessary fees and pay the discounted TEAS Standard electronic filing
          fee of $350 on your behalf.
        </p>
      </form>
    </section>
  );
};

export default StepFour;
