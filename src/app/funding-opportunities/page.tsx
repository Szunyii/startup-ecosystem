"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import programData from "@/data/supportPrograms.json";
import ProgramCard from "./ProgramCard";
import FundingOpportunitiesMobile from "@/components/FundingOpportunitiesMobile";

const stageCategory = ["Pre-startup", "Startup", "Scale-up"];
// const typeCategory = [
//   "Competitions",
//   "Training opportunities",
//   "Professional support",
//   "Incubation",
//   "Early stage investment",
//   "State financial support",
// ];

function Page() {
  const [selectedStage, setSelectedStage] = useState("Pre-startup");

  const availableTypeCategory = useMemo(() => {
    return programData.reduce<string[]>((acc, prog) => {
      if (prog.stage === selectedStage && !acc.includes(prog.type))
        acc.push(prog.type);
      return acc;
    }, []);
  }, [selectedStage]);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    // ha nincs type, legyen null
    if (availableTypeCategory.length === 0) {
      setSelectedType(null);
      return;
    }

    // ha a jelenlegi type érvényes, ne bántsd
    setSelectedType((prev) =>
      prev && availableTypeCategory.includes(prev)
        ? prev
        : availableTypeCategory[0],
    );
  }, [availableTypeCategory]);
  // const filteredPrograms = programData.filter(
  //   (el) => el.stage.includes(selectedStage) && el.type.includes(selectedType),
  // );
  const filteredPrograms = programData.filter(
    (el) =>
      (selectedStage === "ALL" || el.stage === selectedStage) &&
      (selectedType === "ALL" || el.type === selectedType),
  );

  return (
    <section className="min-h-screen mt-14">
      {/* Mobile View */}
      <div className="lg:hidden w-full px-4">
        <FundingOpportunitiesMobile />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex w-full gap-4">
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
                {availableTypeCategory.map((type, i) => (
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
                    {i < availableTypeCategory.length - 1 && (
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
