import Image from "next/image";
import React from "react";

const ReviewCard = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 max-w-52">
      <Image
        src={"/images/trustpilot-5star.jpg"}
        alt="Trust Pilot"
        width={80}
        height={20}
      />
      <h5 className="text-sm font-bold text-slate-700 capitalize">{title}</h5>
      <p className="text-slate-600 text-xs capitalize">{description}</p>
    </div>
  );
};

export default ReviewCard;
