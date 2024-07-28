import React from "react";

const InputCol = ({ children }) => {
  return (
    <div className="flex max-md:flex-col gap-7 max-md:gap-4">
      {React.Children.map(children, (child) => (
        <div className="flex-1">{child}</div>
      ))}
    </div>
  );
};

export default InputCol;
