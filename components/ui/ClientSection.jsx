import Image from "next/image";
import React from "react";

const ClientSection = () => {
  return (
    <div className="flex-center bg-slate-100">
      <div className="flex-center py-3 max-md:flex-col">
        <h1 className="text-lg font-medium text-slate-700 max-md:text-lg md:w-[400px] max-md:w-auto max-md:text-center py-3">
          {`Ensure that competitors don't infringe on your most vital assets. 100%
          Satisfaction Guaranteed.`}
        </h1>
        <Image
          src={"/images/comp-logos.png"}
          alt="Forbes"
          width={550}
          height={50}
          className="border-l-1 max-md:border-none h-[65px] border-slate-300 pl-9 ml-7 max-md:ml-0 py-3 max-md:py-0 max-md:pb-3 max-md:w-[90%] max-md:h-auto max-md:m-auto"
        />
      </div>
    </div>
  );
};

export default ClientSection;
