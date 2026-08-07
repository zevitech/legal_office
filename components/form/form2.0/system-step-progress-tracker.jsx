"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { Progress } from "@nextui-org/react";
import {
  SystemStepProgressTrackerStepsData,
  SystemStepProgressTrackerStepsDefaultSloganData,
  SystemStepProgressTrackerStepsDefaultSubTextData,
} from "@/constant/form2.0/system-step-progress-tracker-data";

const SystemStepProgressTracker = ({ p_value }) => {
  const pathname = usePathname();

  const currentStep = SystemStepProgressTrackerStepsData.find(
    (step) => step.path === pathname
  );

  return (
    <section className="mx-auto my-8 w-[92%] max-w-6xl rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex w-full flex-col gap-6 p-5 md:p-8">
        <div className="w-full flex flex-col items-center gap-2">
          <h1 className="font-inria text-heading-color md:text-[24px] text-[20px] md:leading-[24px] leading-[20px] font-bold">
            {currentStep
              ? currentStep.title
              : SystemStepProgressTrackerStepsDefaultSloganData}
          </h1>
          <p className="text-center text-sm text-slate-600 md:text-base">
            {currentStep
              ? currentStep.subtext
              : SystemStepProgressTrackerStepsDefaultSubTextData}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2" aria-label="Application steps">
          {SystemStepProgressTrackerStepsData.map((step, index) => {
            const activeIndex = SystemStepProgressTrackerStepsData.findIndex(
              (item) => item.path === pathname,
            );
            const isComplete = index < activeIndex;
            const isActive = index === activeIndex;
            return (
              <div key={step.path} className="text-center">
                <div
                  className={`mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    isComplete || isActive
                      ? "bg-primary-theme text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {isComplete ? "✓" : index + 1}
                </div>
                <p className={`hidden text-xs sm:block ${isActive ? "font-semibold text-slate-900" : "text-slate-500"}`}>
                  {step.shortTitle}
                </p>
              </div>
            );
          })}
        </div>

        <Progress
          aria-label="Steps"
          size="lg"
          value={p_value}
          color="success"
          className="w-full"
          classNames={{
            indicator: "bg-primary-theme",
          }}
        />
      </div>
    </section>
  );
};

export default SystemStepProgressTracker;
