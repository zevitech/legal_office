import React from "react";
import HeaderText from "../ui/HeaderText";

const BusinessStructure = () => {
  return (
    <div>
      <div className="col-flex justify-center items-center gap-5 max-w-4xl m-auto  mb-10">
        <HeaderText
          text1="Choose the Best Business Structure for Trademark Protection"
          text2=""
        />
        <p className="text-slate-500 text-lg text-center max-md:text-start max-md:text-base">
          {`Selecting the right business structure is crucial for protecting your revived trademark and ensuring long-term security for your brand. Explore the options to determine which structure aligns best with your business goals.`}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5">
        <div className="w-[550px] bg-white rounded-lg p-10 custom-shadow h-full hover:bg-[#0085FF] text-slate-700 hover:text-white transition-all">
          <h1 className="text-2xl max-md:text-lg max-md:pb-3 font-semibold">
            LLC (Limited Liability Company)
          </h1>
          <p className="">{`Ideal for small businesses seeking liability protection with minimal paperwork.`}</p>
        </div>

        <div className="w-[550px] bg-white rounded-lg p-10 custom-shadow h-full hover:bg-[#0085FF] text-slate-700 hover:text-white transition-all">
          <h1 className="text-2xl max-md:text-lg max-md:pb-3 font-semibold">
            Sole Proprietorship
          </h1>
          <p className="">{`A straightforward and cost-effective option for solo entrepreneurs looking to secure their brand.`}</p>
        </div>

        <div className="w-[550px] bg-white rounded-lg p-10 custom-shadow h-full hover:bg-[#0085FF] text-slate-700 hover:text-white transition-all">
          <h1 className="text-2xl max-md:text-lg max-md:pb-3 font-semibold">
            Corporation (C-Corp, S-Corp)
          </h1>
          <p className="">{`Suitable for larger businesses with shareholders who want a structured, scalable model.`}</p>
        </div>

        <div className="w-[550px] bg-white rounded-lg p-10 custom-shadow h-full hover:bg-[#0085FF] text-slate-700 hover:text-white transition-all">
          <h1 className="text-2xl max-md:text-lg max-md:pb-3 font-semibold">
            Non-Profit
          </h1>
          <p className="">{`Perfect for charitable organizations that require trademark protection under tax-exempt status.`}</p>
        </div>

        <div className="w-[550px] bg-white rounded-lg p-10 custom-shadow h-full hover:bg-[#0085FF] text-slate-700 hover:text-white transition-all">
          <h1 className="text-2xl max-md:text-lg max-md:pb-3 font-semibold">
            Partnership
          </h1>
          <p className="">{`Designed for businesses with multiple owners sharing brand responsibilities.`}</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessStructure;
