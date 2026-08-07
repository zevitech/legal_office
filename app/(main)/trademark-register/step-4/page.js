import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepFour from "@/components/form/steps/StepFour";
import FunnelShell from "@/components/form/FunnelShell";
import React from "react";

export const metadata = {
  title: "Step 4 - Register Trademark | Legal Trademark Office",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <FunnelShell>
      <SystemStepProgressTracker p_value={80} />
      <StepFour />
    </FunnelShell>
  );
};

export default page;
