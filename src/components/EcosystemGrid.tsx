"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn, StartupDataType } from "@/lib/utils";
import StatupCard from "./StatupCard";

const stageCategory = ["Pre-Startup", "Startup", "Scaleup"];
const typeCategory = [
  "Govermental support",
  "Accelerators/Incubators",
  "Local investors",
  "HUBs",
  "Supporting programs",
  "Foreign investors",
  "Crowdfunding",
];

function EcosystemGrid(data: { startups: StartupDataType[] }) {
  const [selectedType, setSelectedType] = useState("Local investors");
  const [selectedStage, setSelectedStage] = useState("Pre-Startup");

  const filteredEntity = data.startups.filter(
    (el) => el.stage.includes(selectedStage) && el.type.includes(selectedType)
  );

  return (
    <section>
      {/* header */}
      <div className="p-4 flex items-center gap-4 border rounded-md mb-8 shadow-md">
        <div className="font-thin text-2xl mx-10 text-gray-400">
          Select Stage:
        </div>
        {stageCategory.map((stage, i) => (
          <Button
            value={stage}
            onClick={() => setSelectedStage(stage)}
            className={cn(
              "p-8 bg-transparent ring-2 text-neutral-700 font-bold group text-xl ring-primary hover:bg-primary/60 hover:ring-primary/60 relative hover:text-neutral-50",
              { "bg-primary text-neutral-50": stage === selectedStage }
            )}
            size="lg"
            key={i}
          >
            {stage}
            {stage === selectedStage && (
              <div className="after:content-[''] after:absolute after:left-1/2 after:bottom-[-12px] after:-translate-x-1/2 after:w-0 after:h-0 after:border-t-[10px] after:border-t-primary after:border-l-[10px] after:border-l-transparent after:border-r-[10px] group-hover:after:border-t-primary/60 after:border-r-transparent"></div>
            )}
          </Button>
        ))}
      </div>
      {/* content rész */}
      <div className="flex gap-2">
        {/* sidebar */}
        <div className="w-64 items-center p-4 gap-4 flex flex-col border rounded-md shadow-md">
          <h2 className="font-thin text-2xl mx-10 text-gray-400">
            Select Type:
          </h2>
          {typeCategory.map((type, i) => (
            <Button
              value={type}
              onClick={() => setSelectedType(type)}
              className={cn(
                "p-8 group w-full bg-transparent ring-2 text-neutral-700 text-md font-bold ring-primary hover:bg-primary/60 relative hover:text-neutral-50 hover:ring-primary/60",
                type === selectedType ? "bg-primary text-neutral-50" : ""
              )}
              size="lg"
              key={i}
            >
              {type}
              {selectedType === type && (
                <div className="after:content-[''] after:absolute after:top-1/2 after:right-[-22px] after:-translate-y-1/2 after:w-0 after:h-0 after:border-r-[10px] after:border-r-transparent after:border-t-[10px] after:border-t-transparent after:border-b-[10px] after:border-b-transparent after:border-l-[10px] after:border-l-primary group-hover:after:border-l-primary/60" />
              )}
            </Button>
          ))}
        </div>
        {/* szereplők grid */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-1 justify-start items-start p-2 rel transition-all transitionduration-300">
            {filteredEntity.map((startup, i) => (
              <StatupCard key={i} {...startup} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EcosystemGrid;
