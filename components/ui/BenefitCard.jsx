import Link from "next/link";
import React from "react";
import { BiChevronRight } from "react-icons/bi";
import { FaRegRegistered } from "react-icons/fa6";
import { GiScales } from "react-icons/gi";
import { PiTrademark } from "react-icons/pi";

import { TbHandStop } from "react-icons/tb";

const BenefitCard = ({ title, description, icon, ctaLabel = "Trademark Now" }) => {
  return (
    <div className="benefit-card flex h-full min-w-0 w-full flex-col bg-slate-50 p-6 hover:bg-white hover:shadow-medium sm:p-8">
      <h3 className="text-[20px] font-medium text-slate-600">{title}</h3>
      <p className="text-[14px] mt-2 mb-7 text-slate-500">{description}</p>
      <div className="mt-auto flex-between gap-3">
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
        <div className="flex-center min-w-0 gap-1 text-sm sm:gap-2 sm:text-base">
          <Link className="whitespace-nowrap" href={`/trademark-register`}>{ctaLabel}</Link>
          <BiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
