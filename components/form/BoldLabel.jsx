import React from "react";

const BoldLabel = ({ text }) => {
  return (
    <h1 className="text-lg max-md:text-base max-md:font-bold font-medium max-sm:font-semibold max-md:text-slate-600 text-slate-700 mb-2">
      {text}
    </h1>
  );
};

export default BoldLabel;
