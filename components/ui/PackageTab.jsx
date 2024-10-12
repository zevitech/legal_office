import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import TMButton from "./TMButton";
import { Button } from "@nextui-org/react";
import { FaArrowRightLong } from "react-icons/fa6";

const PackageTab = ({ packageName, services, details, amount }) => {
  return (
    <div className="text-slate-700">
      <h1 className="font-medium text-2xl text-center">
        Trademark <span className="text-color-primary">logo and name</span> with
        expert registration service.
      </h1>
      <div className="bg-[#E9EFF3] p-7 -m-[4px] mt-8">
        <h4 className="text-xs uppercase font-semibold">for just</h4>
        <div className="flex items-center mt-3 gap-3">
          <h1 className="text-8xl font-bold text-[#273B4A]">${amount}</h1>
          <span className="mb-4">+ USPTO Fee $350/Class* </span>
        </div>
      </div>
      <div className="py-10 px-7 flex-between">
        <div className="w-[55%] pr-10">
          <h1 className="font-medium text-lg">
            Save up to 5% with{" "}
            <span className="text-color-primary">Subscribe to Save</span>
          </h1>
          <ul className="mt-5 col-flex gap-4">
            {services.map((item, index) => (
              <li key={index} className="text-slate-700 flex gap-3">
                <span className="w-[25px] h-[25px]">
                  <FaCheckCircle className="text-[25px]  text-green-600" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-l-1 w-[45%] pl-10">
          <h1 className="font-medium text-lg">
            About <span className="text-color-primary">{packageName}</span>{" "}
            Package
          </h1>
          <p className="pt-4">{details}</p>
        </div>
      </div>
      <div className="p-5">
        <TMButton
          full={true}
          px="30px"
          py="30px"
          text={"Get Start Trademark"}
        />
        <Button
          color="primary"
          variant="light"
          endContent={
            <FaArrowRightLong className="text-color-primary text-[17px]" />
          }
          className="w-full mt-5 font-normal"
          size="lg"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default PackageTab;
