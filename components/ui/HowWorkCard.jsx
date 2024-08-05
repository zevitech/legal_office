import React from "react";

const HowWorkCard = ({ step, title, description }) => {
  return (
    <div className="flex flex-col max-w-[260px] text-center">
      <div className="bg-shield flex-center text-center text-slate-100 text-2xl font-semibold">
        {step}
      </div>
      <h1 className="text-slate-700 text-lg font-semibold mt-4 mb-2">
        {title}
      </h1>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default HowWorkCard;
