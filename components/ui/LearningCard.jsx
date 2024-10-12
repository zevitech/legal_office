import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const LearningCard = ({ image, header, details }) => {
  return (
    <div className="w-[500px] h-[550px] bg-white shadow-lg rounded-lg p-6">
      <Image
        width={400}
        height={400}
        alt="Image"
        src={`/images/${image}`}
        className="object-cover w-full h-[60%] rounded-lg"
      />
      <h1 className="text-xl font-bold text-slate-800 mt-5">{header}</h1>
      <p className="text-lg text-slate-600 mt-6">{details}</p>
      <Button
        variant="bordered"
        color="primary"
        className="font-bold mt-3 px-14 py-7"
      >
        Read More
      </Button>
    </div>
  );
};

export default LearningCard;
