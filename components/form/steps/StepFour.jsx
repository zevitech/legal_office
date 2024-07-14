"use client";

import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import SmallLabel from "../SmallLabel";
import { Button, Checkbox } from "@nextui-org/react";
import ButtonContainer from "../ButtonContainer";
import { useRouter } from "next/navigation";
import { IoTimerOutline } from "react-icons/io5";
import Image from "next/image";

const StepFour = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRushProcessing, setIsRushProcessing] = useState(false);

  // handle form submission
  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    // after submit validate the form

    return router.push("/trademark-register/payment");
  };

  return (
    <section className="w-[70%] max-md:w-[95%] m-auto mt-16">
      <form
        action=""
        method="post"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-slate-500 font-semibold text-2xl mb-5">
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
              <IoTimerOutline className="text-2xl" />
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
              <span className="text-orange-600 font-semibold">$49.00 USD</span>
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
          >
            Next
          </Button>
        </ButtonContainer>
      </form>
    </section>
  );
};

export default StepFour;
