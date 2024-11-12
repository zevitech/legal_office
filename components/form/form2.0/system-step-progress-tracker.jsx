"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Progress } from "@nextui-org/react";
import {
  SystemStepProgressTrackerStepsData,
  SystemStepProgressTrackerStepsDefaultSloganData,
  SystemStepProgressTrackerStepsDefaultSubTextData,
} from "@/constant/form2.0/system-step-progress-tracker-data";

const SystemStepProgressTracker = ({ p_value }) => {
  const [value, setValue] = useState(p_value);

  const pathname = usePathname();

  const currentStep = SystemStepProgressTrackerStepsData.find(
    (step) => step.path === pathname
  );

  return (
    <section className="w-[90%] max-w-[1536px] mx-auto rounded-[10px] border border-border-color my-8">
      <div className="w-full flex flex-col items-center gap-8 py-12">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="font-inria text-heading-color md:text-[24px] text-[20px] md:leading-[24px] leading-[20px] font-bold">
            {currentStep
              ? currentStep.title
              : SystemStepProgressTrackerStepsDefaultSloganData}
          </h1>
          <p className="md:text-[16px] sm:text-[14px] text-[12px] md:leading-[16px] sm:leading-[14px] leading-[12px]">
            {currentStep
              ? currentStep.subtext
              : SystemStepProgressTrackerStepsDefaultSubTextData}
          </p>
        </div>

        <Progress
          aria-label="Steps"
          size="lg"
          value={value}
          color="success"
          className="w-[90%]"
          classNames={{
            indicator: "bg-primary-theme",
          }}
        />
      </div>
    </section>
  );
};

export default SystemStepProgressTracker;
