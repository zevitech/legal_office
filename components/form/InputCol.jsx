import React from "react";

const InputCol = ({ children }) => {
  return (
    <div className="flex gap-7">
      {React.Children.map(children, (child) => (
        <div className="flex-1">{child}</div>
      ))}
    </div>
  );
};

export default InputCol;
