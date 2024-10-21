import React from "react";
import HeaderText from "../ui/HeaderText";
import TMButton from "../ui/TMButton";
import Image from "next/image";
import { similarMarks } from "@/constant";

const SimilarMarks = () => {
  return (
    <div className="flex-center gap-20 max-md:flex-col max-md:gap-10">
      <div className="max-w-lg col-flex gap-7 max-md:gap-6 max-md:w-full">
        <HeaderText text1="Search for" text2="similar marks" />
        <div className="col-flex gap-3 text-lg text-slate-700">
          <p>
            Before you start your filing process, you can search to ensure that
            your trademark is available and unique.
          </p>
          <p>
            <b>Trademarkia</b>{" "}
            {`is the world's largest search engine for
                Trademarks.`}
          </p>
        </div>
        <TMButton px="100px" py="30px" text={"Start searching trademarks"} />
      </div>
      <div className="flex flex-wrap gap-6 max-w-[550px] max-md:w-full">
        {similarMarks.map((item, index) => (
          <div
            className="w-[250px] h-[200px] max-md:w-full bg-white rounded-lg shadow-md col-flex items-center justify-center hover:shadow-none"
            key={index}
          >
            <Image
              width={80}
              height={80}
              alt={item.name}
              src={`/images/${item.flag}`}
              className="object-contain"
            />
            <h1 className="font-bold text-lg max-md:text-xl text-slate-700 my-2">
              {item.name}
            </h1>
            <p className="text-lg text-slate-700">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMarks;
