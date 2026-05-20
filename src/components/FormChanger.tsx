"use client";
import React, { useState } from "react";
import StartupRegForm from "./StartupRegForm";
import { SliderItem, SlidingNavbar } from "./Slider";
import EcosystemRegForm from "./EcosystemRegForm";

const SLIDER_ITEMS: SliderItem[] = [
  { id: "1", label: "startup database" },
  { id: "2", label: "ecosystem database" },
];

const DISPLAY_LABEL: Record<string, string> = {
  "startup database": "Startup database",
  "ecosystem database": "Ecosystem database",
};

const DESCRIPTION: Record<string, string> = {
  "startup database":
    "Submit your company to the Hungarian startup registry. We publish your name, sector, team size and verified financial data so investors, partners and journalists can discover you in the public Startup database.",
  "ecosystem database":
    "Register your organization — investor, accelerator, incubator, hub, support program or service provider — to appear on the public Startup ecosystem map alongside the partners Hungarian founders rely on.",
};

function FormChanger() {
  const [form, setForm] = useState<string>("startup database");

  return (
    <>
      <header className="px-2 mb-10 z-10 relative">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span>Registration · Join the Hungarian startup registry</span>
        </div>

        <div className="mt-3 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight flex items-center gap-x-4 whitespace-nowrap">
            <span>Get listed</span>
            <span className="font-mono text-base md:text-lg text-[#afe200] tracking-normal font-medium">
              → {DISPLAY_LABEL[form] ?? form}
            </span>
          </h1>

          <SlidingNavbar
            items={SLIDER_ITEMS}
            defaultActiveId="1"
            onItemClick={(label) => setForm(label)}
            className="shrink-0 registry-slider"
          />
        </div>

        <p className="max-w-3xl text-base text-white/80 leading-relaxed mt-5">
          {DESCRIPTION[form] ??
            "Submit your startup or ecosystem organization to be featured in the Hungarian Innovation Agency registry."}
        </p>
      </header>

      <div className="mx-2 rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-10 flex justify-center">
        {form === "startup database" ? (
          <StartupRegForm />
        ) : (
          <EcosystemRegForm />
        )}
      </div>
    </>
  );
}

export default FormChanger;
