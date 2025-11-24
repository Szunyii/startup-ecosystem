import EcosystemGrid from "@/components/EcosystemGrid";
import React from "react";
import data from "@/data/startupdata.json";
import EcosístemGridMobile from "@/components/EcosystemGridMobile";

const StartupPages = async () => {
  return (
    <div className="w-full mt-5">
      <section className=" hidden lg:block">
        <EcosystemGrid startups={data} />
      </section>
      <section className="lg:hidden mt-4">
        <EcosístemGridMobile startups={data} />
      </section>
    </div>
  );
};

export default StartupPages;
