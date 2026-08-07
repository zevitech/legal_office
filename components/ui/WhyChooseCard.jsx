import React from "react";

const WhyChooseCard = ({ number, title }) => {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2 border-b-1 px-3 py-8 text-center last:border-b-0 sm:border-b-0 sm:border-l-1 sm:first:border-l-0 sm:py-10">
      <p className="text-[#025da0] font-semibold text-4xl max-md:text-3xl">
        {number}
      </p>
      <h3 className="text-slate-700 font-semibold text-lg">{title}</h3>
    </div>
  );
};

export default WhyChooseCard;
