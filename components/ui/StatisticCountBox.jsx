"use client";

import React from "react";
import CountUp from "react-countup";

const StatisticCountBox = ({ text, number }) => {
  return (
    <div className="col-flex justify-center">
      <CountUp start={0} end={number} delay={0} duration={5}>
        {({ countUpRef }) => (
          <div className="text-4xl max-md:text-3xl text-slate-800 font-semibold">
            <span ref={countUpRef} /> <span>+</span>
          </div>
        )}
      </CountUp>
      <p className="text-gray-800 text-sm pt-2 max-md:text-xs">{text}</p>
    </div>
  );
};

export default StatisticCountBox;
