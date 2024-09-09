import React from "react";
import Header from "@/components/ui/Header";
import StatisticCountBox from "@/components/ui/StatisticCountBox";
import Image from "next/image";

export const metadata = {
  title: "Legal Trademark Office | US Based trademark register website",
  description:
    "At Legal Trademark Office, we offer expert trademark registration services to protect your business name, logo, and brand identity. Get started today!",
};

const page = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        {/* Statistic Section */}
        <section className="flex-center gap-20">
          <StatisticCountBox text={`Trademarks since 2009`} number={200000} />
          <StatisticCountBox text={`Happy Customers`} number={120000} />
          <StatisticCountBox text={`Years in Service`} number={15} />
          <div className=" border-l-2 border-slate-600 pl-5">
            <p className="text-sm pb-2">
              Rated <span className="font-bold">4.8/5</span> by 1000+ users
            </p>
            <div className="flex items-center gap-2">
              <Image
                width={130}
                height={50}
                alt="shopperapproved"
                src={`/images/shopperapproved.png`}
                className="object-contain"
              />
              <Image
                width={120}
                height={30}
                alt="google rating"
                src={`/images/google-rating.png`}
                className="object-contain"
              />
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
    </>
  );
};

export default page;
