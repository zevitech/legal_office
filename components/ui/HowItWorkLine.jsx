import React from "react";

const HowItWorkLine = ({ step, details }) => {
  return (
    <div className="w-[800px] max-md:w-full rounded-md flex bg-white m-auto gap-10 max-md:gap-4">
      <div className="bg-lineCard w-20 max-md:w-16 h-20 max-md:h-16 flex-center rounded-bl-md rounded-tl-md text-white font-bold text-2xl">
        {step}
      </div>
      <p className="text-lg max-md:text-base font-semibold flex-center text-slate-700">
        {details}
      </p>
    </div>
  );
};

export default HowItWorkLine;
