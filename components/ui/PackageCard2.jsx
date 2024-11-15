import {
  PackagesUpdatedData,
  SystemStepThreeData,
} from "@/constant/form2.0/system-step-three-data";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React from "react";
import { IoMdCloseCircle } from "react-icons/io";
import TMButton from "./TMButton";
import { FaCircleCheck } from "react-icons/fa6";

const PackageCard2 = () => {
  return (
    <div className="w-full flex max-lg:flex-col justify-center lg:items-end items-center gap-8 py-12">
      {PackagesUpdatedData.map((data) => (
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

            {data.id == 2 && (
              <span className="text-white font-semibold p-2 px-4 rounded-full mt-4">
                Recomended
              </span>
            )}

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
            <TMButton
              px="120px"
              py="30px"
              text={"Get Started"}
              color={data.id == 2 && "#fff"}
              full={true}
              blackText={data.id == 2 && true}
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PackageCard2;
