import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FcProcess } from "react-icons/fc";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FiBookOpen } from "react-icons/fi";
import { definition } from "@/constant/faqs";
import { applicationProcess } from "@/constant/faqs";
import { basicQuestions } from "@/constant/faqs";

const AccordionBox = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center border-b-1",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <Accordion
      showDivider={false}
      className="p-2 flex flex-col gap-1 w-full"
      variant="shadow"
      itemClasses={itemClasses}
    >
      <AccordionItem
        key="1"
        aria-label="Definitions"
        startContent={<FiBookOpen className="text-primary" />}
        title={
          <h1 className="text-slate-600 text-lg font-semibold">Definitions</h1>
        }
      >
        <div className="w-[90%] m-auto">
          <Accordion>
            {definition.map(({ key, question, answer }) => (
              <AccordionItem key={key} title={question}>
                {answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="The application process"
        startContent={<FcProcess className="text-warning" />}
        title={
          <h1 className="text-slate-600 text-lg font-semibold">
            The application process
          </h1>
        }
      >
        <div className="w-[90%] m-auto">
          <Accordion>
            {applicationProcess.map(({ key, question, answer }) => (
              <AccordionItem key={key} title={question}>
                {answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AccordionItem>
      <AccordionItem
        key="3"
        aria-label="Basic Questions"
        startContent={<RiQuestionnaireLine className="text-danger" />}
        title={
          <h1 className="text-slate-600 text-lg font-semibold">
            Basic Questions
          </h1>
        }
      >
        <div className="w-[90%] m-auto">
          <Accordion>
            {basicQuestions.map(({ key, question, answer }) => (
              <AccordionItem key={key} title={question}>
                {answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionBox;
