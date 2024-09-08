import React from "react";
import Header from "@/components/ui/Header";
import StatisticCountBox from "@/components/ui/StatisticCountBox";

const page = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        {/* Statistic Section */}
        <section className="flex-center gap-5">
          <StatisticCountBox text={`Trademarks since 2009`} number={200000} />
          <StatisticCountBox text={`Happy Customers`} number={120000} />
          <StatisticCountBox text={`Years in Service`} number={15} />
          <div></div>
          <div></div>
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
