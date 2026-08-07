import Image from "next/image";
import React from "react";

const ClientSection = () => {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-4 px-4 py-5 text-center lg:grid-cols-[.85fr_1.15fr] lg:text-left">
        <p className="text-base font-medium text-slate-700 lg:text-lg">
          {`Clear preparation, transparent pricing and continued support throughout your trademark journey.`}
        </p>
        <Image
          src={"/images/comp-logos.png"}
          alt="Forbes"
          width={550}
          height={50}
          className="mx-auto h-auto w-full max-w-[550px] object-contain lg:border-l-1 lg:border-slate-300 lg:pl-8"
        />
      </div>
    </div>
  );
};

export default ClientSection;
