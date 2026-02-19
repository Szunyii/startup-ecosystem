import { cn } from "@/lib/utils";
import React from "react";

interface WraperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWraper = ({ className, children }: WraperProps) => {
  return (
    <div className={cn(`mx-auto container px-2`, className)}>{children}</div>
  );
};

export default MaxWidthWraper;
