"use client";

import Package from "../Package";
import React, { useEffect, useState } from "react";
import NormalLabel from "../NormalLabel";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@nextui-org/react";
import { FaSpinner } from "react-icons/fa6";
import { useRouter } from "next/router";
import { saveStepThree } from "@/features/formSlice";
import { _35_USD, _135_USD, _235_USD } from "@/constant/packages";
import PageLoader from "@/components/PageLoader";

const StepThree = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const stepTwoData = useSelector((state) => state.form.stepTwo);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepTwoData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // handle form submission
  const handleNext = ({ packageName, price }) => {
    setIsLoading(true);
    dispatch(saveStepThree({ packageName, price })); // store data to state

    return router.push("/trademark-register/step-4");
  };

  return (
    <>
      <section className="m-auto w-full flex flex-col gap-9 max-md:gap-4 mt-16 max-md:mt-10">
        {isLoading && <PageLoader />}
        <div className="flex flex-col gap-3 m-auto w-[700px] px-4 max-md:w-auto">
          <h1 className="text-slate-600 font-semibold text-3xl max-md:text-2xl">
            Choose a Package
          </h1>
          <NormalLabel
            text={`All packages include lifetime customer support and our 100% satisfaction guaranteed.`}
          />
        </div>
        <div className="flex justify-center max-md:flex-col max-md:items-center gap-7 pb-11">
          <Package
            price={35}
            packageName={`Basic`}
            complementaryTreat={`+ USPTO Fee $350/Class*`}
            rows={_35_USD}
            handleNext={handleNext}
          />
          <Package
            price={135}
            packageName={`Standard`}
            complementaryTreat={`+ USPTO Fee $350/Class*`}
            rows={_135_USD}
            badge={true}
            handleNext={handleNext}
          />
          <Package
            price={235}
            packageName={`Premium`}
            complementaryTreat={`+ USPTO Fee $350/Class*`}
            rows={_235_USD}
            handleNext={handleNext}
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
    </>
  );
};

export default StepThree;
