import React, { act } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const typeValues = [
  { type: "All", value: "All" },
  { type: "Global", value: "Global" },
  { type: "European", value: "European" },
  { type: "CEE", value: "CEE" },
  { type: "Local", value: "Local" },
];

type TypeSelectProps = {
  onClick: (type: string) => void;
  active: string;
};

function TypeSelect({ onClick, active }: TypeSelectProps) {
  return (
    <div className="flex w-full gap-1 ">
      {typeValues.map((type) => (
        <Button
          onClick={() => onClick(type.value)}
          key={type.type}
          className={cn(
            "rounded-2xl border px-2 bg-transparent border-primary",
            {
              "bg-primary": type.value === active,
            },
          )}
        >
          <p className="text-xs text-white">{type.type}</p>
        </Button>
      ))}
    </div>
  );
}

export default TypeSelect;
