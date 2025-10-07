"use client";

import Package from "../Package";
import React, { useEffect, useState } from "react";
import axios from "axios";
import NormalLabel from "../NormalLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { saveStepThree } from "@/features/formSlice";
import { _35_USD, _135_USD, _235_USD } from "@/constant/packages";
import PageLoader from "@/components/pages/PageLoader";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { SystemStepThreeData } from "@/constant/form2.0/system-step-three-data";

const StepThree = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const stepTwoData = useSelector((state) => state.form.stepTwo);
  const stepOneData = useSelector((state) => state.form.stepOne);

  // page authorization | redirect if previous step has no data
  if (Object.keys(stepTwoData).length === 0) {
    return router.push(process.env.NEXT_PUBLIC_APP_URL + "/trademark-register");
  }

  // handle form submission
  const handleNext = async (data) => {
    const packageName = data.planName;
    const price = data.price;

    if (data.id === 1) {
      setIsLoading1(true);
    } else if (data.id === 2) {
      setIsLoading2(true);
    } else if (data.id === 3) {
      setIsLoading3(true);
    }

    dispatch(saveStepThree({ packageName, price })); // store data to state

    // Send step 3 data to email endpoint
    const stepThreeData = {
      ...stepOneData,
      ...stepTwoData,
      packageName,
      price,
      zoho_step: 3,
    };

    try {
      const endPoint = process.env.NEXT_PUBLIC_API_URL + "/save-data";
      await axios.post(endPoint, stepThreeData);
      console.log("Step 3 data sent successfully");
    } catch (error) {
      console.log("Error sending step 3 data:", error);
    }

    return router.push("/trademark-register/step-4");
  };

  return (
    <main className="system-page-standard-layout flex flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="font-inria md:text-[48px] text-[30px] text-heading-color font-bold w-full text-center">
          Choose Your Plan
        </h1>

        <p className="text-paragraph-color md:text-[26px] text-[26px] w-full text-center">
          Best Plans For{" "}
          <span className="text-primary-theme-color">
            Trademark Registration
          </span>
        </p>
      </div>

      <div className="w-full flex max-lg:flex-col justify-center lg:items-end items-center gap-8 py-12">
        {SystemStepThreeData.map((data) => (
          <Card
            key={data.id}
            className={`p-4 lg:w-[400px] md:w-[600px] w-full h-full flex flex-col gap-4 items-center ${
              data.id == 1 || data.id == 3
                ? "lg:h-[1100px]"
                : "bg-primary-theme lg:h-[1150px]"
            }`}
          >
            <CardHeader className="w-full flex flex-col items-center">
              <div
                className={`w-[128px] h-[42px] border-2  rounded-[10px] font-semibold  flex items-center justify-center ${
                  data.id == 1 || data.id == 3
                    ? "border-primary-theme text-primary-theme"
                    : " border-white text-white"
                }`}
              >
                {data.planName}
              </div>
              <h1
                className={`font-semibold text-[60px]  ${
                  data.id == 1 || data.id == 3
                    ? "text-heading-color"
                    : " text-white"
                }`}
              >
                {data.planPrice}
              </h1>
              <p
                className={`text-[15px] ${
                  data.id == 1 || data.id == 3
                    ? "text-paragraph-color"
                    : "text-white/70"
                }`}
              >
                {data.planSubtext}
              </p>
            </CardHeader>

            <CardBody className="w-full flex items-center justify-center flex-col gap-8">
              {data.OfferedDetails.map((detail, index) => (
                <div className="w-full flex gap-2" key={index}>
                  <FaCircleCheck
                    className={`text-[20px] translate-y-1 text-[#2DC937]`}
                  />

                  <div className="flex w-full gap-2 flex-col">
                    <h1
                      className={`text-[16px] ${
                        data.id == 1 || data.id == 3 ? "" : " text-white"
                      }`}
                    >
                      {detail.title}
                    </h1>
                    <p
                      className={`text-[12px] ${
                        data.id == 1 || data.id == 3 ? "" : " text-white/70"
                      }`}
                    >
                      {detail.description}
                    </p>
                  </div>
                </div>
              ))}

              {data.NotOfferedDetails &&
                data.NotOfferedDetails.length > 0 &&
                data.NotOfferedDetails.map((detail, index) => (
                  <div className="w-full flex gap-2" key={index}>
                    <IoMdCloseCircle
                      className={`text-[20px] translate-y-1 text-black/50`}
                    />

                    <div className="flex w-full gap-2 flex-col">
                      <h1 className="text-[16px] text-black/50">
                        {detail.title}
                      </h1>
                      <p className="text-[12px] text-black/50">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                ))}
            </CardBody>

            <CardFooter>
              <Button
                className={`w-full h-[50px] rounded-lg font-inria ${
                  data.id == 1 || data.id == 3
                    ? "bg-primary-theme text-white"
                    : "bg-white text-heading-color"
                }`}
                isLoading={
                  data.id === 1
                    ? isLoading1
                    : data.id === 2
                    ? isLoading2
                    : isLoading3
                }
                onClick={() => handleNext(data)}
              >
                SELECT
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default StepThree;
