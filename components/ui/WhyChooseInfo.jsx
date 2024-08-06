import Image from "next/image";
import React from "react";

const WhyChooseInfo = ({ image, title }) => {
  return (
    <div className="w-44 border-r-1 last:border-none px-5">
      <Image
        src={"/images/" + image}
        width={35}
        height={35}
        alt="icon"
        className="m-auto mb-4 max-md:w-6"
      />
      <p className="text-center text-sm max-md:text-xs">{title}</p>
    </div>
  );
};

export default WhyChooseInfo;
