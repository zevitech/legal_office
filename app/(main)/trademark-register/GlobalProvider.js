import React from "react";
import { NextUIProvider } from "@nextui-org/react";

const GlobalProvider = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default GlobalProvider;
