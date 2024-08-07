import React from "react";

const WhyChooseCard = ({ number, title, description }) => {
  return (
    <div className="w-[330px] flex flex-col gap-5 max-md:gap-1 max-md:text-center">
      <h1 className="text-[#025da0] font-semibold text-5xl max-md:text-3xl">
        {number}+
      </h1>
      <h1 className="text-slate-800 font-semibold text-2xl">{title}</h1>
      <p className="text-slate-700 pt-1">{description}</p>
    </div>
  );
};

export default WhyChooseCard;
