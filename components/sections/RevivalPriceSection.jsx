import React from "react";
import TMButton from "../ui/TMButton";

const RevivalPriceSection = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-6xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 p-6 bg-gray-50">
            <h2 className="text-xl font-semibold pb-[60px] pt-5">Package</h2>
            <ul className="space-y-4 text-[15px]">
              <li>Review your application status and determine next steps</li>
              <li>
                We respond to either the Office Action or the Statement of Use
              </li>
              <li>
                You provide us the missing information required to complete the
                forms
              </li>
              <li>
                We submit the form and petition form directly on your behalf
              </li>
              <li>
                We will send you a confirmation receipt, saving you hours of
                hassle
              </li>
              <li>Service includes 1 Federal class fees**</li>
              <li className="pt-6">Delivery Time*</li>
              <li className="pt-4">Rush Service (need it quicker?)</li>
              <li className="pt-4">Conclusion</li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 pb-10 max-md:pb-5">
            <h2 className="text-xl mb-4 text-center bg-blue-900 text-white py-8 px-2">
              Revival due to failure to respond to an Office Action
            </h2>
            <ul className="space-y-8 text-center pt-3 px-4">
              <li>Yes</li>
              <li>Yes</li>
              <li>Yes</li>
              <li>Yes</li>
              <li>Yes</li>
              <li>
                No - if additional Federal fees are required, we will inform
                you.
              </li>
              <li>7 days</li>
              <li>Additional Fees Apply</li>
              <li>
                Once completed, the Federal Examiner will review the Office
                Action Response and determine if objections have been overcome.
              </li>
            </ul>
            <div className="text-center mt-6">
              <p className="text-2xl font-bold">$575</p>
              <div className="pt-5">
                <TMButton px="30px" py="3px" text={"Select"} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-gray-200 pb-10 max-md:pb-5">
            <h2 className="text-xl mb-4 text-center bg-blue-900 text-white py-8 px-2">
              Revival due to failure to file a Statement of Use
            </h2>
            <ul className="space-y-8 text-center pt-3 px-4">
              <li>Yes</li>
              <li>Yes</li>
              <li>No</li>
              <li>Yes</li>
              <li>Yes</li>
              <li>
                Yes** <p>(valued at $100 USD)</p>
              </li>
              <li>7 days</li>
              <li>Additional Fees Apply</li>
              <li>
                Once completed, your mark will typically go to registration,
                barring any other unforeseen circumstances
              </li>
            </ul>
            <div className="text-center mt-6">
              <p className="text-2xl font-bold">$675</p>
              <div className="pt-5">
                <TMButton px="30px" py="3px" text={"Select"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevivalPriceSection;
