"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PrimaryButton = ({ text, animate, size }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const animation = animate && !isLoading ? "animate-expand" : "";
  const handleButton = () => {
    setIsLoading(true);
    router.push("/trademark-register");
  };

  return (
    <div>
      <Button
        isLoading={isLoading}
        variant="shadow"
        onClick={handleButton}
        className={`rounded-md bg-color-primary text-white ${animation} ${
          size === "sm" && `text-xs`
        } ${size === "md" && `px-7 py-5 font-medium`} ${
          size === "lg" && `px-12 py-6 font-semibold`
        } ${size === "xl" && `px-16 py-6 font-semibold`} ${
          size === "2xl" && `w-[90%] py-8 text-xl font-bold`
        }`}
      >
        {text}
      </Button>
    </div>
  );
};

export default PrimaryButton;
