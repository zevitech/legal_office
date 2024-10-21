"use client";

import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { allFAQ } from "@/constant/faqs";

const FaqAccordion = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title:
      "text-2xl font-semibold max-md:font-medium text-slate-600 max-md:text-lg max-md:py-4",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center border-b-1",
    indicator: "text-medium",
    content: "text-xl px-2 max-md:text-sm",
  };

  return (
    <div className="flex-center">
      <Accordion
        showDivider={false}
        className="p-2 flex flex-col gap-7 max-md:gap-6 bg-transparent shadow-none border-none rounded-none w-[80%] max-md:w-full"
        variant="shadow"
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
