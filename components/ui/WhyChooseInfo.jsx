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
        className="m-auto mb-4"
      />
      <p className="text-center text-sm">{title}</p>
    </div>
  );
};

export default WhyChooseInfo;
