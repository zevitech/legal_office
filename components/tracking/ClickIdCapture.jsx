"use client";

import { useEffect } from "react";
import { captureClickIds } from "@/utils/tracking";

/**
 * Captures gclid / wbraid / gbraid on first load of any page so the ad click
 * survives navigation through the funnel and the payment redirect.
 * Renders nothing.
 */
const ClickIdCapture = () => {
  useEffect(() => {
    captureClickIds();
  }, []);

  return null;
};

export default ClickIdCapture;
