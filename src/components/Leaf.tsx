import { cn } from "@/lib/utils";
import React from "react";

function Leaf({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "size-20 bg-primary border-none rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl absolute -z-10",
        className
      )}
    />
  );
}

export default Leaf;
