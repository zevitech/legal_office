"use client";

import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/app/store";

const GlobalProvider = ({ children }) => {
  return (
    // wrap redux state provider
    <Provider store={store}>
      {/* wrap nextUI provider */}
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default GlobalProvider;
