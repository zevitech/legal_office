"use client";

import React from "react";
import CountUp from "react-countup";

const StatisticCountBox = ({ text, number }) => {
  return (
    <div className="col-flex justify-center">
      <CountUp start={0} end={number} delay={0}>
        {({ countUpRef }) => (
          <div className="text-4xl font-semibold">
            <span ref={countUpRef} /> <span>+</span>
          </div>
        )}
      </CountUp>
      <p className="text-gray-800 text-sm pt-2">{text}</p>
    </div>
  );
};

export default StatisticCountBox;
