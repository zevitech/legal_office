import React from "react";

const FormHero = ({ step }) => {
  return (
    <section className="w-full flex-center bg-formHero bg-center bg-cover h-[40vh] ">
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

        <div className="mt-5"></div>
      </div>
    </section>
  );
};

export default FormHero;
