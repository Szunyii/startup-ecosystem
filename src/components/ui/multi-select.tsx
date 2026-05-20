"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MultiSelectProps {
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  function toggle(option: string) {
    onChange(
      value.includes(option)
        ? value.filter((v) => v !== option)
        : [...value, option],
    );
  }

  function remove(option: string, e: React.MouseEvent) {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-md border-[0.5px] border-primary bg-primary/10 px-3 py-2 text-sm text-white ring-offset-background/15 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <div className="flex flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-neutral-400">{placeholder}</span>
            ) : (
              value.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-sm bg-primary/20 px-1.5 py-0.5 text-xs text-white"
                >
                  {v}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => remove(v, e)}
                    // onKeyDown={(e) => {
                    //   if (e.key === "Enter" || e.key === " ") {
                    //     e.preventDefault();
                    //     onChange(value.filter((x) => x !== v));
                    //   }
                    // }}
                    className="cursor-pointer opacity-60 hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </span>
                </span>
              ))
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
        align="start"
        sideOffset={4}
      >
        <ScrollArea className="h-64">
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => toggle(option)}
                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-primary hover:text-primary-foreground"
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center border rounded-sm">
                  {value.includes(option) && <Check className="h-4 w-4" />}
                </span>
                {option}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
