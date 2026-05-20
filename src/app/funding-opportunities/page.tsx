"use client";
import { useEffect, useMemo, useState } from "react";
import programData from "@/data/supportPrograms.json";
import ProgramCard from "./ProgramCard";
import FundingOpportunitiesMobile from "@/components/FundingOpportunitiesMobile";

const STAGES = [
  {
    id: "Pre-startup",
    title: "Pre-startup",
    subtitle: "Validate the idea",
    description:
      "The earliest stage of a venture when the idea is still being validated. Teams focus on understanding the problem, testing the solution, and building an initial prototype or MVP.",
  },
  {
    id: "Startup",
    title: "Startup",
    subtitle: "Find product-market fit",
    description:
      "An early-stage company that already has a product or service and is working toward finding product-market fit while acquiring its first users or customers.",
  },
  {
    id: "Scale-up",
    title: "Scale-up",
    subtitle: "Grow rapidly",
    description:
      "A company that has validated its business model and is focused on rapid growth by expanding its market, team, and revenue.",
  },
] as const;

type StageId = (typeof STAGES)[number]["id"];

function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
    </span>
  );
}

function Page() {
  const [selectedStage, setSelectedStage] = useState<StageId>("Pre-startup");

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    for (const p of programData) {
      if (p.stage === selectedStage) types.add(p.type);
    }
    return Array.from(types);
  }, [selectedStage]);

  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    if (availableTypes.length === 0) {
      setSelectedType(null);
      return;
    }
    setSelectedType((prev) =>
      prev && availableTypes.includes(prev) ? prev : availableTypes[0],
    );
  }, [availableTypes]);

  const filteredPrograms = useMemo(
    () =>
      programData.filter(
        (p) => p.stage === selectedStage && p.type === selectedType,
      ),
    [selectedStage, selectedType],
  );

  // Counts for stage badges
  const stageCounts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const s of STAGES) {
      acc[s.id] = programData.filter((p) => p.stage === s.id).length;
    }
    return acc;
  }, []);

  // Counts per type for the active stage
  const typeCounts = useMemo(() => {
    const acc: Record<string, number> = {};
    for (const t of availableTypes) {
      acc[t] = programData.filter(
        (p) => p.stage === selectedStage && p.type === t,
      ).length;
    }
    return acc;
  }, [availableTypes, selectedStage]);

  const stageObj = STAGES.find((s) => s.id === selectedStage)!;
  const totalPrograms = programData.length;

  return (
    <div
      className="relative text-white font-sans rounded-[32px] px-4 md:px-7 pt-4 pb-9 min-h-screen overflow-hidden"
    >
      {/* Mobile View kept as-is */}
      <div className="lg:hidden w-full">
        <FundingOpportunitiesMobile />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        {/* HEADER */}
        <header className="px-2 pt-10">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
            <LiveDot />
            <span>
              {totalPrograms} programs · funding & support opportunities
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight mt-3.5 mb-2">
            Funding opportunities
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-[640px] m-0">
            Programs, competitions, and capital that help Hungarian founders
            move from idea to scale. Pick your stage and the kind of support you
            need.
          </p>
        </header>

        {/* JOURNEY RAIL */}
        <section className="relative mt-9 mx-2 p-7 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08]">
          <div className="font-mono text-[11px] opacity-55 uppercase tracking-[.12em] mb-[18px]">
            Your stage
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
            <div
              className="hidden md:block absolute h-[2px] top-[26px] left-[26px] right-[26px] opacity-35"
              style={{
                background: "linear-gradient(90deg, #5d3dff, #7a5fff, #afe200)",
              }}
            />
            {STAGES.map((s, i) => {
              const active = s.id === selectedStage;
              const align =
                i === 0
                  ? "md:justify-self-start md:items-start md:text-left"
                  : i === STAGES.length - 1
                    ? "md:justify-self-end md:items-end md:text-right"
                    : "md:justify-self-center md:items-center md:text-center";
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStage(s.id)}
                  className={
                    "relative z-[1] bg-transparent border-none text-white p-0 cursor-pointer flex flex-col gap-3 max-w-[260px] " +
                    align
                  }
                >
                  <div
                    className={
                      "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all " +
                      (active
                        ? "bg-[#afe200] border-2 border-[#afe200] shadow-[0_0_0_6px_rgba(175,226,0,0.18)]"
                        : "bg-white/[0.06] border-2 border-white/20 hover:border-[#7a5fff] hover:bg-[rgba(122,95,255,0.12)]")
                    }
                  >
                    <span
                      className={
                        "font-mono text-sm " +
                        (active
                          ? "text-[#0b1027] opacity-100 font-bold"
                          : "opacity-70")
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="text-[22px] font-bold tracking-tight">
                      {s.title}
                    </div>
                    <div className="font-mono text-[11px] opacity-55 uppercase tracking-[.08em] mt-0.5">
                      {s.subtitle}
                    </div>
                    <div className="text-[13px] opacity-80 mt-2">
                      <b className="text-[#afe200] font-mono mr-1">
                        {stageCounts[s.id]}
                      </b>
                      programs
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3.5 mt-3.5 mx-2">
          {/* TYPE RAIL */}
          <aside className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-[20px] p-[18px] self-start">
            <div className="font-mono text-[11px] opacity-55 uppercase tracking-[.12em] mb-3">
              What do you need
            </div>
            <div className="flex flex-col gap-1">
              {availableTypes.map((t) => {
                const active = t === selectedType;
                return (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={
                      "grid grid-cols-[1fr_auto] gap-2.5 items-center px-3 py-2.5 rounded-xl border text-[13px] text-left transition-colors cursor-pointer " +
                      (active
                        ? "bg-[rgba(93,61,255,0.22)] border-[rgba(122,95,255,0.4)] text-white"
                        : "bg-transparent border-transparent text-white/85 hover:bg-white/[0.04]")
                    }
                  >
                    <span>{t}</span>
                    <span className="font-mono text-[11px] opacity-55 min-w-[18px] text-right">
                      {typeCounts[t]}
                    </span>
                  </button>
                );
              })}
              {availableTypes.length === 0 && (
                <div className="text-white/50 text-xs py-4">
                  No support types yet for this stage.
                </div>
              )}
            </div>
          </aside>

          {/* CENTER GRID */}
          <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-[20px] p-[22px] flex flex-col min-h-[900px]">
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-[18px]">
              <div>
                <div className="flex items-center gap-2 font-mono text-[11px] opacity-65 uppercase tracking-[.08em]">
                  <span>{stageObj.title}</span>
                  {selectedType && (
                    <>
                      <span className="text-[#afe200]">→</span>
                      <span className="text-[#afe200]">{selectedType}</span>
                    </>
                  )}
                </div>
                <h2 className="text-[22px] font-bold tracking-tight mt-2 mb-1.5">
                  {filteredPrograms.length}{" "}
                  {selectedType ? selectedType.toLowerCase() : "programs"} for{" "}
                  {stageObj.title.toLowerCase()} founders
                </h2>
                <p className="text-[13px] opacity-65 m-0 max-w-[560px] leading-relaxed">
                  {stageObj.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.program}
                  description={program.description}
                  link={program.link}
                  program={program.program}
                />
              ))}
              {filteredPrograms.length === 0 && (
                <div className="col-span-full py-10 text-center opacity-50 text-sm">
                  No matching program for this combination — try another stage
                  or type.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Page;
