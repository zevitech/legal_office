import React from "react";

const FieldContainer = ({ children }) => {
  return (
    <div className="bg-white p-8 border-t-2 border-t-indigo-700 flex flex-col gap-3 mb-5">
      {children}
    </div>
  );
};

export default FieldContainer;
