"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import Faq from "@/components/Faq";
import AccordionEcosystem from "@/components/AccordionEcosystem";

type Partner = {
  id: number;
  link: string;
  stage: string[];
  type: string[];
  companyLogo: string;
  companyName: string;
  about: string;
};

const STAGES = [
  {
    id: "Pre-Startup",
    title: "Pre-Startup",
    subtitle: "Validate the idea",
    description:
      "The earliest stage — teams test the problem, build an MVP, and find their first 10 users.",
  },
  {
    id: "Startup",
    title: "Startup",
    subtitle: "Find product-market fit",
    description:
      "Early-stage company with a product, hunting product-market fit and first paying customers.",
  },
  {
    id: "Scale-up",
    title: "Scale-up",
    subtitle: "Grow rapidly",
    description:
      "Validated business model, focused on rapid expansion of market, team, and revenue.",
  },
] as const;

const TYPES = [
  { id: "Governmental support", short: "Government", icon: "▣" },
  { id: "Acccelerators/Incubators", short: "Accelerators", icon: "◈" },
  { id: "Local investors", short: "Local investors", icon: "●" },
  { id: "HUBs/ Co-working", short: "Hubs", icon: "◇" },
  { id: "Supporting Organizations", short: "Support orgs", icon: "◯" },
  { id: "Foreign Investors", short: "Foreign investors", icon: "✦" },
  { id: "Crowdfunding", short: "Crowdfunding", icon: "▲" },
  { id: "Service Provider", short: "Service providers", icon: "✕" },
  { id: "Supporting programmes", short: "Support programmes", icon: "❖" },
] as const;

type StageId = (typeof STAGES)[number]["id"];
type TypeId = (typeof TYPES)[number]["id"];

function shortStage(s: string) {
  if (s === "Pre-Startup") return "Pre";
  if (s === "Scale-up") return "Scale";
  return "Startup";
}

function LiveDot() {
  return (
    <span className="relative inline-block w-2 h-2">
      <span className="absolute inset-0 rounded-full bg-[#afe200]" />
      <span className="absolute -inset-1 rounded-full bg-[#afe200] opacity-35 animate-ping" />
    </span>
  );
}

export default function EcosystemAtlas({ partners }: { partners: Partner[] }) {
  const [stage, setStage] = useState<StageId>("Pre-Startup");
  const [type, setType] = useState<TypeId>("Local investors");

  const { byStage, byCell } = useMemo(() => {
    const byStage: Record<string, number> = {};
    const byCell: Record<string, number> = {};
    for (const s of STAGES) {
      byStage[s.id] = partners.filter((p) => p.stage.includes(s.id)).length;
      for (const t of TYPES) {
        byCell[`${s.id}::${t.id}`] = partners.filter(
          (p) => p.stage.includes(s.id) && p.type.includes(t.id),
        ).length;
      }
    }
    return { byStage, byCell };
  }, [partners]);

  const filtered = useMemo(
    () =>
      partners.filter((p) => p.stage.includes(stage) && p.type.includes(type)),
    [partners, stage, type],
  );

  const stageObj = STAGES.find((s) => s.id === stage)!;
  const typeObj = TYPES.find((t) => t.id === type)!;

  // Aggregate stats for the bottom strip
  const totalPartners = partners.length;

  return (
    <div className="relative text-white font-sans rounded-[32px] px-4 md:px-7 pt-4 pb-9 min-h-screen overflow-hidden">
      {/* HEADER */}
      <header className="px-2 pt-10">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
            <LiveDot />
            <span>{totalPartners} ecosystem partners · updated weekly</span>
          </div>
          <Faq triggerClassName="bg-transparent text-white/85 hover:bg-white/10 hover:text-white px-5 py-3 h-auto rounded-full font-medium text-sm border border-white/20">
            <AccordionEcosystem />
          </Faq>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-8 mt-3.5">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-tight mb-2">
              Startup Ecosystem
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-[640px] m-0">
              A living map of the people, programs and capital that support
              Hungarian startups — pick where you are and what you need, and see
              exactly who can help.
            </p>
          </div>
          <div className="flex gap-2.5 items-center">
            <Link
              href="/registry"
              className="bg-[#afe200] text-[#0b1027] px-5 py-3 rounded-full no-underline font-bold text-sm hover:opacity-90"
            >
              Submit your organization →
            </Link>
          </div>
        </div>
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
            const active = s.id === stage;
            const align =
              i === 0
                ? "md:justify-self-start md:items-start md:text-left"
                : i === STAGES.length - 1
                  ? "md:justify-self-end md:items-end md:text-right"
                  : "md:justify-self-center md:items-center md:text-center";
            return (
              <button
                key={s.id}
                onClick={() => setStage(s.id)}
                className={
                  "relative z-[1] bg-transparent border-none text-white p-0 cursor-pointer flex flex-col gap-3 max-w-[220px] " +
                  align
                }
              >
                <div
                  className={
                    "w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all " +
                    (active
                      ? "bg-[#afe200] border-2 border-[#afe200] shadow-[0_0_0_6px_rgba(175,226,0,0.18)] "
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
                      {byStage[s.id]}
                    </b>
                    partners
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3.5 mt-3.5 mx-2">
        {/* TYPE RAIL + COVERAGE MATRIX */}
        <aside className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-[20px] p-[18px]">
          <div className="font-mono text-[11px] opacity-55 uppercase tracking-[.12em] mb-3">
            What do you need
          </div>
          <div className="flex flex-col gap-1">
            {TYPES.map((t) => {
              const cellCount = byCell[`${stage}::${t.id}`];
              const active = t.id === type;
              const empty = cellCount === 0;
              return (
                <button
                  key={t.id}
                  onClick={() => !empty && setType(t.id)}
                  disabled={empty}
                  className={
                    "grid grid-cols-[22px_1fr_auto] gap-2.5 items-center px-3 py-2.5 rounded-xl border text-[13px] text-left transition-colors " +
                    (active
                      ? "bg-[rgba(93,61,255,0.22)] border-[rgba(122,95,255,0.4)] text-white"
                      : "bg-transparent border-transparent text-white/85 hover:bg-white/[0.04]") +
                    (empty
                      ? " opacity-35 cursor-not-allowed"
                      : " cursor-pointer")
                  }
                >
                  <span
                    className={
                      "text-xs " +
                      (active ? "text-[#afe200] opacity-100" : "opacity-70")
                    }
                  >
                    {t.icon}
                  </span>
                  <span>{t.short}</span>
                  <span className="font-mono text-[11px] opacity-55 min-w-[18px] text-right">
                    {cellCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* COVERAGE MATRIX */}
          <div className="mt-[22px] pt-[18px] border-t border-white/[0.08]">
            <div className="font-mono text-[11px] opacity-55 uppercase tracking-[.12em] mb-2.5">
              Coverage matrix
            </div>
            <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-1">
              <div />
              {STAGES.map((s) => (
                <div
                  key={s.id}
                  className="font-mono text-[9px] opacity-55 text-center py-1 uppercase tracking-[.08em]"
                >
                  {shortStage(s.id)}
                </div>
              ))}
              {TYPES.map((t) => (
                <React.Fragment key={t.id}>
                  <div className="text-[11px] opacity-80 pr-1.5 self-center">
                    {t.short}
                  </div>
                  {STAGES.map((s) => {
                    const c = byCell[`${s.id}::${t.id}`];
                    const cur = s.id === stage && t.id === type;
                    const intensity = Math.min(1, c / 5);
                    return (
                      <button
                        key={s.id + t.id}
                        onClick={() => {
                          setStage(s.id);
                          setType(t.id);
                        }}
                        className={
                          "aspect-[1.6] rounded border flex items-center justify-center font-mono text-[10px] text-white transition-colors " +
                          (cur
                            ? "border-[#afe200] text-[#0b1027] font-bold"
                            : "border-white/[0.06] hover:border-white/30")
                        }
                        style={{
                          background: cur
                            ? "#afe200"
                            : `rgba(122,95,255,${0.12 + intensity * 0.55})`,
                        }}
                        title={`${c} ${t.short} for ${s.id}`}
                      >
                        <span>{c || ""}</span>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER GRID */}
        <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 rounded-[20px] p-[22px] flex flex-col">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-[18px]">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] opacity-65 uppercase tracking-[.08em]">
                <span>{stageObj.title}</span>
                <span className="text-[#afe200]">→</span>
                <span className="text-[#afe200]">{typeObj.short}</span>
              </div>
              <h2 className="text-[22px] font-bold tracking-tight mt-2 mb-1.5">
                {filtered.length} {typeObj.short.toLowerCase()} for{" "}
                {stageObj.title.toLowerCase()} founders
              </h2>
              <p className="text-[13px] opacity-65 m-0 max-w-[560px] leading-relaxed">
                {stageObj.description}
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] opacity-70">
              <span className="opacity-50 mr-1">Sort</span>
              <button className="bg-[#5d3dff] border border-[#5d3dff] text-white px-2.5 py-1 rounded-md font-mono text-[11px]">
                Relevance
              </button>
              <button className="bg-black/20 border border-white/[0.06] text-white/70 px-2.5 py-1 rounded-md font-mono text-[11px]">
                A → Z
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {filtered.map((p, i) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className={
                  "grid grid-cols-[56px_1fr_auto] gap-3.5 items-center p-4 rounded-[14px] border no-underline text-white transition-all hover:bg-[rgba(122,95,255,0.12)] hover:border-[rgba(122,95,255,0.3)] hover:-translate-y-0.5 " +
                  (i === 0
                    ? "border-[rgba(122,95,255,0.4)] bg-gradient-to-br from-[rgba(93,61,255,0.18)] to-[rgba(122,95,255,0.06)]"
                    : "bg-white/[0.03] border-white/[0.07]")
                }
              >
                <PartnerMark partner={p} />
                <div className="min-w-0">
                  <div className="font-semibold text-[15px] tracking-tight truncate">
                    {p.companyName}
                  </div>
                  <div className="font-mono text-[11px] opacity-60 mt-1 truncate">
                    {p.type[0] ?? ""}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  {p.stage.map((s) => (
                    <span
                      key={s}
                      className={
                        "font-mono text-[9px] px-1.5 py-0.5 rounded uppercase tracking-[.06em] " +
                        (s === stage
                          ? "bg-[#afe200] text-[#0b1027] font-bold"
                          : "bg-white/[0.06] text-white/55")
                      }
                    >
                      {shortStage(s)}
                    </span>
                  ))}
                </div>
              </a>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full py-10 text-center opacity-50 text-sm">
                No {typeObj.short.toLowerCase()} listed for{" "}
                {stageObj.title.toLowerCase()} yet — try another combination.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function PartnerMark({ partner }: { partner: Partner }) {
  const src = `/${partner.companyLogo}.png`;
  return (
    <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center overflow-hidden shrink-0 p-1.5">
      <Image
        src={src}
        alt={partner.companyName}
        width={56}
        height={56}
        className="w-full h-full object-contain"
        unoptimized
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}
