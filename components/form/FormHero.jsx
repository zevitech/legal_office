import { Progress } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const FormHero = ({ step }) => {
  return (
    <section
      className={`w-full flex-center bg-formHero bg-center bg-cover relative ${
        step ? `h-[40vh] max-md:h-[250px]` : `h-[30vh] max-md:h-[180px]`
      } `}
    >
      <div className="formOverly"></div>
      <div className="px-2 py-3 flex-col flex gap-3 max-md:gap-0 absolute">
        <h1 className="text-4xl max-md:text-2xl font-semibold capitalize text-white text-center max-md:mb-3">
          official US trademark register
        </h1>
        <div className="text-base max-md:text-sm text-slate-100 flex max-md:flex-col gap-2 max-md:block max-md:px-2 max-md:text-center">
          Still have questions?
          <Link
            href="tel:+14083893630"
            className="font-bold text-[#ff812a] uppercase max-md:px-1"
          >
            Call +1 (408) 389-3630
          </Link>
          or
          <button
            href=""
            className="font-bold text-[#ff812a] uppercase max-md:px-1"
          >
            live chat
          </button>
          with us for real-time support.
        </div>
        {step && (
          <div className="mt-2 flex-center max-md:mt-0 px-3">
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
