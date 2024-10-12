import Image from "next/image";
import React from "react";

const StepCard = ({ icon, header, details }) => {
  return (
    <div className="w-[320px] first:w-[270px] h-[275px] flex-col flex-center items-center">
      <Image alt="icon" src={`/images/${icon}`} width={60} height={60} />
      <h1 className="text-base font-semibold text-slate-800 text-center mt-4 mb-3">
        {header}
      </h1>
      <p className="text-sm text-slate-700 text-center">{details}</p>
    </div>
  );
};

export default StepCard;
