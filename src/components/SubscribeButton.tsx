"use client";

import React from "react";
import { OPEN_EVENT } from "./SubscribePopup";

export default function SubscribeButton({
  className,
  children = "Subscribe",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={
        className ??
        "bg-[#afe200] text-[#0b1027] font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
      }
    >
      {children}
    </button>
  );
}
