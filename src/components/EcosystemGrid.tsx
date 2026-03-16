"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn, StartupDataType } from "@/lib/utils";
import StatupCard from "./StatupCard";
import Faq from "@/app/startups/Faq";
import AccordionEcosystem from "@/app/ecosystem/AccordionEcosystwm";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { InfoIcon } from "lucide-react";

const stageCategory = [
  {
    name: "Pre-Startup",
    description:
      "The earliest stage of a venture when the idea is still being validated. Teams focus on understanding the problem, testing the solution, and building an initial prototype or MVP.",
  },
  {
    name: "Startup",
    description:
      "An early-stage company that already has a product or service and is working toward finding product-market fit while acquiring its first users or customers.",
  },
  {
    name: "Scale-up",
    description:
      "A company that has validated its business model and is focused on rapid growth by expanding its market, team, and revenue.",
  },
];
const typeCategory = [
  "Governmental support",
  "Acccelerators/Incubators",
  "Local investors",
  "HUBs/ Co-working",
  "Supporting Organizations",
  "Foreign Investors",
  "Crowdfunding",
];

function EcosystemGrid(data: { startups: StartupDataType[] }) {
  const [selectedType, setSelectedType] = useState("Governmental support");
  const [selectedStage, setSelectedStage] = useState("Pre-Startup");

  const filteredEntity = data.startups.filter(
    (el) => el.stage.includes(selectedStage) && el.type.includes(selectedType),
  );

  return (
    <section className="min-h-screen">
      {/* header */}
      <div className="mb-3 self-end flex w-full justify-between">
        <div className="mb-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-white">
            Startup Ecosystem
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Discover stakeholders that support startups at different stages.
            Choose your startup’s current stage to find the most relevant
            service providers and ecosystem partners.
          </p>
        </div>
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
              Select your stage
            </h2>
            <TooltipProvider>
              <div className="flex flex-col  rounded-xl bg-primary/15 ">
                {stageCategory.map((category, i) => (
                  <div key={category.name} className="w-full flex flex-col">
                    <Tooltip>
                      <Button
                        className={cn(
                          "w-full text-white justify-start font-light py-8 rounded-xl",
                          selectedStage === category.name
                            ? "font-medium bg-primary/30"
                            : "font-light",
                        )}
                        variant="link"
                        onClick={() => setSelectedStage(category.name)}
                      >
                        <span className="flex items-center gap-2">
                          {category.name}

                          <TooltipTrigger asChild>
                            <span className="cursor-pointer flex items-center">
                              <InfoIcon size={20} />
                            </span>
                          </TooltipTrigger>
                        </span>
                      </Button>

                      <TooltipContent
                        side="top"
                        align="start"
                        alignOffset={40}
                        className="max-w-80"
                      >
                        <p>{category.description}</p>
                      </TooltipContent>
                    </Tooltip>

                    {i < stageCategory.length - 1 && (
                      <Separator className="w-[90%] mx-auto bg-primary-foreground/10" />
                    )}
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
          {/* type */}
          <div className="mt-2">
            <div className="">
              <h2 className="text-xl font-light italic text-white">
                Select type
              </h2>
              <div className="flex flex-col  rounded-xl bg-primary/15 ">
                {typeCategory.map((type, i) => (
                  <div key={type} className="w-full flex flex-col">
                    <Button
                      key={type}
                      className={cn(
                        "w-full text-white justify-start font-light py-8 rounded-xl",
                        selectedType === type
                          ? "font-medium bg-primary/30"
                          : "font-light",
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
