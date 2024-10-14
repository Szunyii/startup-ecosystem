import { cn } from "@/lib/utils";
import React from "react";

interface WraperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWraper = ({ className, children }: WraperProps) => {
  return (
    <div
      className={cn(
        `mx-auto w-full max-w-screen-2xl px-2.5 md:px-20`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWraper;
