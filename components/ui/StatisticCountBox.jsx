"use client";

import React from "react";
import CountUp from "react-countup";

const StatisticCountBox = ({ text, number }) => {
  return (
    <div className="col-flex gap-2">
      <CountUp start={0} end={number} delay={0}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} /> <span>+</span>
          </div>
        )}
      </CountUp>
      <p className="text-gray-800 text-sm">{text}</p>
    </div>
  );
};

export default StatisticCountBox;
