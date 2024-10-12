"use client";

import { Tabs, Tab } from "@nextui-org/react";
import PackageTab from "../ui/PackageTab";
import { basic, standard, premium } from "@/constant/packages";

export default function PackagesSection() {
  return (
    <div className="flex w-full flex-col justify-center bg-white shadow-md rounded-lg">
      <Tabs aria-label="Options" className="w-full package-tab">
        <Tab key="photos" title="Photos" className="">
          <PackageTab
            packageName={`Basic`}
            services={basic}
            details={"lorem ispum dorol sit amet"}
            amount={`35`}
          />
        </Tab>
        <Tab key="music" title="Music" className="">
          <PackageTab
            packageName={`Standard`}
            services={standard}
            details={"lorem ispum dorol sit amet"}
            amount={`135`}
          />
        </Tab>
        <Tab key="videos" title="Videos" className="">
          <PackageTab
            packageName={`Premium`}
            services={premium}
            details={"lorem ispum dorol sit amet"}
            amount={`235`}
          />
        </Tab>
      </Tabs>
    </div>
  );
}
