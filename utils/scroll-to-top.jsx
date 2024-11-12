"use client";

import React from "react";

import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop = () => {
  const scrollToTopHandler = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      {/* BACK TO SCROLL */}
      <div
        onClick={scrollToTopHandler}
        className="!w-[40px] !h-[40px] bg-white border-2 border-primary-50 rounded-full sm:hidden flex-center"
      >
        <IoIosArrowUp className="text-primary text-[18px]" />
      </div>
    </>
  );
};

export default ScrollToTop;
