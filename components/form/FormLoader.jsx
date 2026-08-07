"use client";

import React from "react";
import { Oval } from "react-loader-spinner";

// Brand blue — keep in sync with --primary-theme in app/globals.css
const BRAND_COLOR = "#027dd6";

/**
 * Full-screen blocking loader shown while a funnel step saves data.
 * Without this the page looks frozen after "Continue" and users click twice.
 */
const FormLoader = ({
  isVisible,
  message = "Saving your application...",
  subMessage = "Please don't close or refresh this page.",
}) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-4 bg-white/85 backdrop-blur-sm"
    >
      <Oval
        height={58}
        width={58}
        color={BRAND_COLOR}
        secondaryColor="#cfe6f8"
        strokeWidth={4}
        strokeWidthSecondary={4}
        visible
        ariaLabel="loading"
      />
      <div className="px-6 text-center">
        <p className="text-[16px] font-semibold text-heading-color">{message}</p>
        <p className="mt-1 text-[13px] text-slate-500">{subMessage}</p>
      </div>
    </div>
  );
};

export default FormLoader;
