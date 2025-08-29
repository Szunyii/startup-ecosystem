import EcosystemGrid from "@/components/EcosystemGrid";
import React from "react";
import data from "@/data/startupdata.json"

const StartupPages = async () => {


  return (
    <div>
      <section className="p-10">
        <EcosystemGrid startups={data} />
      </section>
    </div>
  );
};

export default StartupPages;
