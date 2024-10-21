"use client";

import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const CounterBoxTR = ({ text, number, symbol, icon }) => {
  return (
    <div className="col-flex justify-center text-center">
      <Image
        width={100}
        height={100}
        alt=""
        src={`/images/${icon}`}
        className="object-contain m-auto mb-5 max-md:mb-3"
      />
      <CountUp start={0} end={number} delay={0}>
        {({ countUpRef }) => (
          <div className="text-7xl font-bold text-[#075A96]">
            <span ref={countUpRef} /> <span>{symbol}</span>
          </div>
        )}
      </CountUp>
      <p className="text-[#075A96] text-xl pt-2">{text}</p>
    </div>
  );
};

export default CounterBoxTR;
