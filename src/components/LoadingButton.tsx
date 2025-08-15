import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
      className={cn("flex items-center gap-2", className)}
    >
      {loading && <Loader2 className="size-5 animate-spin" />}
      {props.children}
    </Button>
  );
}

export default LoadingButton;
