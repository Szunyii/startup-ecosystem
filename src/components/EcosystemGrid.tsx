"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn, StartupDataType } from "@/lib/utils";
import StatupCard from "./StatupCard";
import Faq from "@/app/startups/Faq";
import AccordionEcosystem from "@/app/ecosystem/AccordionEcosystwm";
import { Separator } from "./ui/separator";

const stageCategory = ["Pre-Startup", "Startup", "Scale-up"];
const typeCategory = [
  "Governmental support",
  "Acccelerators/Incubators",
  "Local investors",
  "HUBs",
  "Supporting Organizations",
  "Foreign Investors",
  "Crowdfunding",
];

function EcosystemGrid(data: { startups: StartupDataType[] }) {
  const [selectedType, setSelectedType] = useState("Governmental support");
  const [selectedStage, setSelectedStage] = useState("Pre-Startup");

  const filteredEntity = data.startups.filter(
    (el) => el.stage.includes(selectedStage) && el.type.includes(selectedType)
  );

  return (
    <section className="min-h-screen">
      {/* header */}
      <div className="mb-3 self-end flex w-full justify-end">
        <Faq>
          <AccordionEcosystem />
        </Faq>
      </div>

      <div className="flex w-full gap-4">
        {/* oldalsáv */}
        <div className=" w-1/5 flex flex-col">
          {/* stage */}
          <div className="">
            <h2 className="text-xl font-light italic text-white">
              Select stage
            </h2>
            <div className="flex flex-col  rounded-xl bg-primary/80 ">
              {stageCategory.map((stage, i) => (
                <div key={stage} className="w-full flex flex-col">
                  <Button
                    key={stage}
                    className={cn(
                      "w-full text-white justify-start font-light py-8 rounded-xl ",
                      selectedStage === stage
                        ? "font-medium bg-primary"
                        : "font-light"
                    )}
                    variant="link"
                    onClick={() => {
                      setSelectedStage(stage);
                    }}
                  >
                    {stage}
                  </Button>
                  {i < stageCategory.length - 1 && (
                    <Separator className="w-[90%] mx-auto bg-primary-foreground/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* type */}
          <div className="mt-2">
            <div className="">
              <h2 className="text-xl font-light italic text-white">
                Select type
              </h2>
              <div className="flex flex-col  rounded-xl bg-primary/80 ">
                {typeCategory.map((type, i) => (
                  <div key={type} className="w-full flex flex-col">
                    <Button
                      key={type}
                      className={cn(
                        "w-full text-white justify-start font-light py-8 rounded-xl",
                        selectedType === type
                          ? "font-medium bg-primary"
                          : "font-light"
                      )}
                      variant="link"
                      onClick={() => {
                        setSelectedType(type);
                      }}
                    >
                      {type}
                    </Button>
                    {i < typeCategory.length - 1 && (
                      <Separator className="w-[90%] mx-auto bg-primary-foreground/10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* grid */}
        <div className=" w-4/5">
          <div className="mt-6 grid grid-cols-4 gap-4 justify-start items-start transition-all transitionduration-300">
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
