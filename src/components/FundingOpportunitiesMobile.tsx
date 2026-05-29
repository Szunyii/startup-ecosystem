"use client";
import React, { useMemo, useState } from "react";
import programData from "@/data/supportPrograms.json";
import ProgramCard from "@/app/funding-opportunities/ProgramCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const stageCategory = ["Pre-startup", "Startup", "Scale-up"];

function FundingOpportunitiesMobile() {
  const [selectedStage, setSelectedStage] = useState("Pre-startup");
  
  // Calculate available types based on selected stage
  const availableTypeCategory = useMemo(() => {
    return programData.reduce<string[]>((acc, prog) => {
      if (prog.stage === selectedStage && !acc.includes(prog.type))
        acc.push(prog.type);
      return acc;
    }, []);
  }, [selectedStage]);

  // Track the user's explicit pick. The effective `selectedType` is derived
  // below so it stays consistent with `availableTypeCategory` without a
  // setState-in-effect feedback loop.
  const [chosenType, setChosenType] = useState<string | null>(null);
  const selectedType =
    chosenType && availableTypeCategory.includes(chosenType)
      ? chosenType
      : (availableTypeCategory[0] ?? null);

  const filteredPrograms = programData.filter(
    (el) =>
      (selectedStage === "ALL" || el.stage === selectedStage) &&
      (selectedType === "ALL" || el.type === selectedType)
  );

  return (
    <section className="text-white w-full">
      <div className="flex flex-col gap-4 my-4 w-full">
        <div className="w-full">
          <p className="mb-2 text-sm font-medium">Select Stage</p>
          <Select
            onValueChange={(value: string) => setSelectedStage(value)}
            value={selectedStage}
          >
            <SelectTrigger className="w-full bg-primary/10 border-primary/20 text-white">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {stageCategory.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full">
          <p className="mb-2 text-sm font-medium">Select Type</p>
          <Select
            onValueChange={(value: string) => setChosenType(value)}
            value={selectedType || ""}
            disabled={!selectedType}
          >
            <SelectTrigger className="w-full bg-primary/10 border-primary/20 text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {availableTypeCategory.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-6 bg-primary/20" />

      <div className="flex flex-col gap-4">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.program}
            description={program.description}
            link={program.link}
            program={program.program}
          />
        ))}
        {filteredPrograms.length < 1 && (
          <p className="text-white text-lg text-center mt-10">
            No matching program found.
          </p>
        )}
      </div>
    </section>
  );
}

export default FundingOpportunitiesMobile;
