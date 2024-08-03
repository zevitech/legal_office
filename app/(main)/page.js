import React from "react";
import LandingPage from "@/components/pages/LandingPage";
import { NextUIProvider } from "@nextui-org/react";

const page = () => {
  return (
    <main>
      <NextUIProvider>
        <LandingPage />
      </NextUIProvider>
    </main>
  );
};

export default page;
