import React from "react";

const ContainerTab = ({ children }) => {
  return (
    <div className="bg-white p-5 pb-0 flex flex-col gap-3 ml-10">
      {children}
    </div>
  );
};

export default ContainerTab;
