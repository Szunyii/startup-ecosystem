"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import programData from "@/data/supportPrograms.json";
import ProgramCard from "./ProgramCard";

const stageCategory = ["Pre-startup", "Startup", "Scale-up"];
const typeCategory = [
  "Competitions",
  "Training opportunities",
  "Professional support",
  "Incubation",
  "Early stage investment",
  "State financial support",
];

function Page() {
  const [selectedType, setSelectedType] = useState("Competitions");
  const [selectedStage, setSelectedStage] = useState("Pre-startup");

  const filteredPrograms = programData.filter(
    (el) => el.stage.includes(selectedStage) && el.type.includes(selectedType),
  );

  return (
    <section className="min-h-screen mt-14">
      {/* header */}

      <div className="flex w-full gap-4">
        {/* oldalsáv */}
        <div className=" w-1/5 flex flex-col">
          {/* stage */}
          <div className="">
            <h2 className="text-xl font-light italic text-white">
              Select stage
            </h2>
            <div className="flex flex-col  rounded-xl bg-primary/15 ">
              {stageCategory.map((stage, i) => (
                <div key={stage} className="w-full flex flex-col">
                  <Button
                    key={stage}
                    className={cn(
                      "w-full text-white justify-start font-light py-8 rounded-xl ",
                      selectedStage === stage
                        ? "font-medium bg-primary/30 "
                        : "font-light",
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
          <div className="mt-6 grid grid-cols-2 gap-4 justify-start items-start transition-all transitionduration-300 auto-rows-fr">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.program}
                description={program.description}
                link={program.link}
                program={program.program}
              />
            ))}
            {filteredPrograms.length < 1 && (
              <p className="text-white text-2xl col-span-full flex items-center justify-center row-span-full place-items-center mt-40">
                No matching program for the areas.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
