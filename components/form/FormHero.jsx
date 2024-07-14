import { Progress } from "@nextui-org/react";
import React from "react";

const FormHero = ({ step }) => {
  return (
    <section
      className={`w-full flex-center bg-formHero bg-center bg-cover ${
        step ? `h-[40vh]` : `h-[30vh]`
      } `}
    >
      <div className="px-2 py-3 flex-col flex gap-3">
        <h1 className="text-4xl font-semibold capitalize text-white text-center">
          official US trademark register
        </h1>
        <div className="text-base text-slate-100 flex gap-2">
          Still have questions?
          <a
            href="tel:123456789"
            className="font-bold text-orange-500 uppercase"
          >
            Call (123) 456-789
          </a>
          or
          <a href="" className="font-bold text-orange-500 uppercase">
            live chat
          </a>
          with us for real-time support.
        </div>
        {step && (
          <div className="mt-2 flex-center">
            <Progress
              size="lg"
              radius="sm"
              classNames={{
                base: "max-w-md",
                track: "drop-shadow-md ",
                indicator: "bg-gradient-to-tr from-pink-500 to-orange-500",
                label: "tracking-wider font-medium text-default-600",
                value: "text-foreground/60 text-slate-50 font-semibold",
              }}
              label=" "
              value={step * 25}
              showValueLabel={true}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default FormHero;
