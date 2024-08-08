"use client";

import React, { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/app/store";

const GlobalProvider = ({ children }) => {
  // adding zendesk script
  useEffect(() => {
    const loadZendeskScript = () => {
      const script = document.createElement("script");
      script.id = "ze-snippet";
      script.src =
        "https://static.zdassets.com/ekr/snippet.js?key=c87da82e-ad58-45e6-8a3b-737fbcad8c30";
      script.async = true;
      script.onload = () => {
        console.log("Zendesk script loaded successfully");
      };
      script.onerror = (error) => {
        console.error("Error loading Zendesk script:", error);
      };
      document.body.appendChild(script);
    };

    loadZendeskScript();
  }, []);

  return (
    // wrap redux state provider
    <Provider store={store}>
      {/* wrap nextUI provider */}
      <NextUIProvider>{children}</NextUIProvider>
    </Provider>
  );
};

export default GlobalProvider;
