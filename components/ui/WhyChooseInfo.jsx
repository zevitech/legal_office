import Image from "next/image";
import React from "react";

const WhyChooseInfo = ({ image, title }) => {
  return (
    <div className="w-full px-2 sm:px-5 lg:border-r-1 lg:last:border-none">
      <Image
        src={"/images/" + image}
        width={35}
        height={35}
        alt="icon"
        className="m-auto mb-4 max-md:w-6"
      />
      <p className="break-words text-center text-sm max-md:text-xs">{title}</p>
    </div>
  );
};

export default WhyChooseInfo;
