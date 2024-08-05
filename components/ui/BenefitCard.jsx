import Link from "next/link";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaRegRegistered } from "react-icons/fa6";
import { GiScales } from "react-icons/gi";
import { PiTrademark } from "react-icons/pi";

import { TbHandStop } from "react-icons/tb";

const BenefitCard = ({ title, description, icon }) => {
  return (
    <div className="w-[320px] p-8 bg-slate-50 hover:bg-white benefit-card hover:shadow-medium">
      <h1 className="text-2xl font-medium text-slate-600">{title}</h1>
      <p className="text-[15px] mt-2 mb-10 text-slate-500">{description}</p>
      <div className="flex-between">
        <div>
          {icon === "hand" && (
            <div className="bg-orange-500 p-3 rounded-md">
              <TbHandStop className="text-white text-2xl" />
            </div>
          )}
          {icon === "registered" && (
            <div className="bg-purple-700 p-3 rounded-md">
              <FaRegRegistered className="text-white text-2xl" />
            </div>
          )}
          {icon === "scale" && (
            <div className="bg-blue-700 p-3 rounded-md">
              <GiScales className="text-white text-2xl" />
            </div>
          )}
          {icon === "trademark" && (
            <div className=" bg-cyan-500 p-3 rounded-md">
              <PiTrademark className="text-white text-2xl" />
            </div>
          )}
        </div>
        <div className="flex-center gap-2">
          <Link href={`trademark-register`}>Trademark Now</Link>
          <BiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
