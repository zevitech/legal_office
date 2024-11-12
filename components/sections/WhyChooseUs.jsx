import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="p-8 max-md:p-5">
      <div className="flex flex-col gap-10 items-center justify-center md:flex-row overflow-hidden m-auto">
        <div className="">
          <Image
            width={350}
            height={600}
            alt={"Expert"}
            src={`/images/wcu-main.png`}
            className="object-contain"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-blue-600 text-lg font- mb-2">Why Choose Us</h2>
          <h1 className="text-3xl max-md:text-2xl font-semibold text-slate-800 mb-6 max-w-2xl">
            What we are offering to you with this patent services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 p-7 rounded-lg hover:shadow-md ">
              <div className="flex items-center mb-2">
                <FaPlay className="fas fa-play text-blue-500 mr-2 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">
                  Comprehensive Patent Consultation
                </h3>
              </div>
              <p className="text-gray-600">
                {`Get expert guidance on your patent journey, from initial assessment to filing. Our team ensures you understand the process and have everything in place for a successful application.`}
              </p>
            </div>
            <div className="bg-slate-50 p-7 rounded-lg hover:shadow-md ">
              <div className="flex items-center mb-2">
                <FaPlay className="fas fa-play text-blue-500 mr-2 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">
                  Patent Application & Filing
                </h3>
              </div>
              <p className="text-gray-600">
                {`We handle the complexities of patent filing for you, ensuring accuracy and compliance. Our services streamline the application process, saving you time and effort.`}
              </p>
            </div>
            <div className="bg-slate-50 p-7 rounded-lg hover:shadow-md ">
              <div className="flex items-center mb-2">
                <FaPlay className="fas fa-play text-blue-500 mr-2 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">
                  International Patent Protection
                </h3>
              </div>
              <p className="text-gray-600">
                {`Safeguard your intellectual property across global markets. Our team navigates international laws to protect your patent rights, expanding your business potential worldwide.`}
              </p>
            </div>
            <div className="bg-slate-50 p-7 rounded-lg hover:shadow-md ">
              <div className="flex items-center mb-2">
                <FaPlay className="fas fa-play text-blue-500 mr-2 text-xl" />
                <h3 className="text-lg font-bold text-gray-800">
                  Patent Research & Analysis
                </h3>
              </div>
              <p className="text-gray-600">
                {`Receive in-depth research on existing patents to avoid infringement risks. Our analysis identifies unique opportunities, helping your innovation stand out in the market.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
