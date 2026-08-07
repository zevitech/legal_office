import SystemStepProgressTracker from "@/components/form/form2.0/system-step-progress-tracker";
import StepOne from "@/components/form/steps/StepOne";
import FunnelShell from "@/components/form/FunnelShell";
import React from "react";

const page = () => {
  return (
    <FunnelShell>
      <SystemStepProgressTracker p_value={25} />
      <StepOne />
    </FunnelShell>
  );
};

export default page;
