"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { allFAQ } from "@/constant/faqs";

const FaqAccordion = () => {
  const itemClasses = {
    base: "w-full rounded-2xl border border-blue-100 bg-white px-5 shadow-sm",
    title:
      "text-lg font-semibold text-slate-800 md:text-xl",
    trigger:
      "min-h-20 py-4 data-[hover=true]:bg-blue-50/50",
    indicator: "text-xl text-[#027DD6]",
    content: "pb-6 text-base leading-7 text-slate-600 md:text-lg",
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Accordion
        showDivider={false}
        className="flex flex-col gap-4 bg-transparent p-0 shadow-none"
        itemClasses={itemClasses}
        defaultExpandedKeys={["0"]}
      >
        {allFAQ.map(({ key, question, answer }, index) => (
          <AccordionItem key={index} title={question}>
            {answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
