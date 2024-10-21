import Image from "next/image";
import React from "react";
import TMButton from "./TMButton";

const PackageCard = ({ packageName, subHeading, price, list }) => {
  return (
    <div className="shadow-lg py-8 px-7 max-md:px-5 max-md:py-6 bg-white rounded-md w-[350px] max-md:w-full h-[450px] flex flex-col justify-between hover:shadow-none transition-all">
      <div className=" text-center">
        <h1 className="text-2xl text-slate-700 font-semibold">{packageName}</h1>
        {subHeading && (
          <p className="text-xs text-slate-500 mt-2">{subHeading}</p>
        )}
      </div>
      <div className="flex justify-center items-end">
        <span className="text-base">$</span>
        <h1 className="text-6xl text-slate-800 font-bold">{price}</h1>
      </div>
      <ul className="flex flex-col gap-3">
        {list.map((item, index) => (
          <li className="flex items-center gap-3 text-sm" key={index}>
            <Image
              width={20}
              height={20}
              alt=" "
              src={`/images/check-icon-filled.png`}
              className="object-contain mt-1"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex-center">
        <TMButton px="120px" py="30px" text={"Get Started"} />
      </div>
    </div>
  );
};

export default PackageCard;
