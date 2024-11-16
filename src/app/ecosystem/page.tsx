import EcosystemGrid from "@/components/EcosystemGrid";
import React from "react";
import { promises as fs } from "fs";
import { StartupDataType } from "@/lib/utils";

const StartupPages = async () => {
  // const startupData = await JSON.stringify(data);

  const file = await fs.readFile(
    process.cwd() + "/public/startupdata.json",
    "utf8"
  );
  const data: StartupDataType[] = JSON.parse(file);

  return (
    <div>
      <section className="p-10">
        <EcosystemGrid startups={data} />
      </section>
    </div>
  );
};

export default StartupPages;
