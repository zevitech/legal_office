import React from "react";

const WhyChooseCard = ({ number, title }) => {
  return (
    <div className="w-[330px] flex flex-col gap-5 max-md:gap-1 text-center my-10 max-md:my-0 max-md:py-10 border-l-1 max-md:border-b-1">
      <h1 className="text-[#025da0] font-semibold text-4xl max-md:text-3xl">
        {number}
      </h1>
      <h1 className="text-slate-700 font-semibold text-lg">{title}</h1>
    </div>
  );
};

export default WhyChooseCard;
