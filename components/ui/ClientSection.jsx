import Image from "next/image";
import React from "react";

const ClientSection = () => {
  return (
    <div className="flex-center bg-slate-100 mt-16">
      <div className="flex-center py-2">
        <h1 className="text-[20px] font-semibold text-slate-700 w-64 py-3">
          Loved and trusted by the industry leaders
        </h1>
        <Image
          src={"/images/comp-logos.png"}
          alt="Forbes"
          width={550}
          height={50}
          className="border-l-1 h-[65px] border-slate-300 pl-9 ml-7 py-3"
        />
      </div>
    </div>
  );
};

export default ClientSection;
