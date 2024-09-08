import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl px-24 max-md:px-12 max-sm:px-8 m-auto">
      {children}
    </div>
  );
};

export default Container;
