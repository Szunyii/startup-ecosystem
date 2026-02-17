"use client";
import React, { useMemo, useState, useEffect } from "react";
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

  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Update selectedType when available types change
  useEffect(() => {
    if (availableTypeCategory.length === 0) {
      setSelectedType(null);
      return;
    }

    setSelectedType((prev) =>
      prev && availableTypeCategory.includes(prev)
        ? prev
        : availableTypeCategory[0]
    );
  }, [availableTypeCategory]);

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
            onValueChange={(value: string) => setSelectedType(value)}
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
