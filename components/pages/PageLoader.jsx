import React from "react";
import { FaSpinner } from "react-icons/fa6";

const PageLoader = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 bottom-0 backdrop-brightness-50 backdrop-blur-[2px] flex-center z-[99999]">
      <FaSpinner className=" animate-spin font-bold text-5xl text-blue-900" />
    </div>
  );
};

export default PageLoader;
