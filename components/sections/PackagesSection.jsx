"use client";

import { Tabs, Tab } from "@nextui-org/react";
import PackageTab from "../ui/PackageTab";
import { basic, standard, premium } from "@/constant/packages";

export default function PackagesSection() {
  return (
    <div className="flex w-full flex-col justify-center bg-white shadow-md rounded-lg">
      <Tabs aria-label="Options" className="w-full package-tab">
        <Tab key="Basic" title="Basic" className="">
          <PackageTab
            packageName={`Basic`}
            services={basic}
            details={""}
            amount={`49`}
          />
        </Tab>
        <Tab key="Standard" title="Standard" className="">
          <PackageTab
            packageName={`Standard`}
            services={standard}
            details={""}
            amount={`149`}
          />
        </Tab>
        <Tab key="Premium" title="Premium" className="">
          <PackageTab
            packageName={`Premium`}
            services={premium}
            details={""}
            amount={`249`}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
