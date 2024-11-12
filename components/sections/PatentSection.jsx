import Image from "next/image";
import Link from "next/link";
import React from "react";
import TMButton from "../ui/TMButton";

const PatentSection = () => {
  return (
    <div>
      <div className="flex-center gap-20 max-md:gap-6 max-md:flex-col">
        <div className="max-w-xl">
          <h1 className="text-[#6B9FC4] font-medium text-xl">Patent</h1>
          <p className="text-slate-700 font-bold text-3xl pt-2 pb-4">
            We Are Professional From 14 Years to this works.
          </p>
          <div className="relative">
            <Image
              width={700}
              height={700}
              alt="icon"
              src={`/images/patent-group.png`}
              className="object-contain w-full"
            />
            <Link
              href={`#`}
              className="absolute font-semibold text-slate-800 px-6 py-2 backdrop-blur-md rounded-full border-1.5 border-slate-300 capitalize bottom-10 left-12"
            >
              get patent now
            </Link>
          </div>
        </div>
        <div className="max-w-lg">
          <div className="flex-center gap-5 mb-5 max-md:flex-col-reverse">
            <div className="w-1/2 max-md:hidden">
              <Image
                width={600}
                height={600}
                alt="icon"
                src={`/images/patent-group-2.png`}
                className="object-contain w-full"
              />
            </div>
            <div className="col-flex gap-5 w-1/2 max-md:w-full">
              <Image
                width={600}
                height={600}
                alt="icon"
                src={`/images/patent-group-3.png`}
                className="object-contain w-full"
              />
              <div>
                <h1 className="text-lg font-semibold text-slate-700">
                  Good talented Patent Services with Us
                </h1>
                <p className="text-sm font-normal">
                  {` Our powerful search feature helps you quickly locate the
                  information you need. Whether you're seeking guidance on
                  trademark registration, patent applications, or legal advice,
                  simply type in your query, and we'll provide relevant results
                  to match your needs.`}
                </p>
              </div>
            </div>
          </div>
          <TMButton
            py="30px"
            px="50px"
            full={true}
            text={"Start Your Registration Process"}
          />
        </div>
      </div>
    </div>
  );
};

export default PatentSection;
