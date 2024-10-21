import React from "react";

const HeaderText = ({ text1, text2 }) => {
  return (
    <h1 className="text-4xl max-md:text-3xl text-slate-700">
      <span className="font-normal">{text1}</span>{" "}
      <span className="font-bold text-color-primary">{text2}</span>
    </h1>
  );
};

export default HeaderText;
