"use client";

import React, { useState } from "react";

export interface SectorRow {
  sector: string;
  count: number;
  employees: number;
  /** Sum of netrevenue across rows where netrevenue IS NOT NULL. */
  netrevenue: number;
  /** Number of rows where netrevenue IS NOT NULL — matches SQL COUNT(netrevenue). */
  revenueCount: number;
}

interface Props {
  sectors: SectorRow[];
  maxCount: number;
}

const fmt = (n: number) => new Intl.NumberFormat("hu-HU").format(n);

export default function SectorBars({ sectors, maxCount }: Props) {
  const [hovered, setHovered] = useState<SectorRow | null>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div
      className="relative flex flex-col gap-2"
      onMouseLeave={() => setHovered(null)}
    >
      {sectors.map((s) => {
        const pct = maxCount > 0 ? (s.count / maxCount) * 100 : 0;
        return (
          <div
            key={s.sector}
            onMouseEnter={() => setHovered(s)}
            onMouseMove={(e) => {
              setHovered(s);
              setPos({ x: e.clientX, y: e.clientY });
            }}
            className={
              "grid grid-cols-[160px_1fr_auto] gap-3 items-center cursor-default group transition-colors " +
              (hovered?.sector === s.sector ? "bg-white/[0.04] rounded-md" : "")
            }
          >
            <span
              title={s.sector}
              className="text-[12px] truncate text-white/85 group-hover:text-white pl-1"
            >
              {s.sector}
            </span>

            <div
              className={
                "relative h-6 rounded-md bg-black/30 border overflow-hidden transition-colors " +
                (hovered?.sector === s.sector
                  ? "border-primary/60"
                  : "border-white/[0.06]")
              }
            >
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60 rounded-md transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>

            <span className="font-mono text-sm font-semibold tabular-nums w-12 text-right pr-1">
              {fmt(s.count)}
            </span>
          </div>
        );
      })}

      {/* Mouse-following tooltip — only rendered while a row is hovered. */}
      {hovered && (
        <div
          // Use position: fixed so we can target the actual cursor coords
          // (clientX/clientY) regardless of where the chart sits in the page.
          // pointer-events-none makes the tooltip itself transparent to the
          // mouse, so it never steals hover from the bars.
          style={{
            position: "fixed",
            top: pos.y + 16,
            left: pos.x + 16,
            zIndex: 50,
          }}
          className="pointer-events-none bg-[#120937] border border-white/15 text-white shadow-xl rounded-lg p-3 min-w-[200px]"
        >
          <div className="font-semibold text-sm mb-2 truncate">
            {hovered.sector}
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px]">
            <dt className="font-mono text-[10px] uppercase tracking-widest opacity-55 self-center">
              Companies
            </dt>
            <dd className="font-mono text-right tabular-nums">
              {fmt(hovered.count)}
            </dd>

            <dt className="font-mono text-[10px] uppercase tracking-widest opacity-55 self-center">
              Employees
            </dt>
            <dd className="font-mono text-right tabular-nums">
              {fmt(hovered.employees)}
            </dd>

            <dt className="font-mono text-[10px] uppercase tracking-widest opacity-55 self-center">
              Avg net rev.
            </dt>
            <dd className="font-mono text-right tabular-nums text-[#afe200]">
              {/* netrevenue arrives as a sum; divide by count to get the
                  average net revenue per company in this sector. */}
              {/* Match SQL AVG(netrevenue): divide sum by count of NON-NULL
                  netrevenue rows (revenueCount), not by all companies. */}
              {fmt(
                hovered.revenueCount > 0
                  ? Math.round(hovered.netrevenue / hovered.revenueCount)
                  : 0,
              )}{" "}
              <span className="opacity-60">eFt</span>
            </dd>
          </dl>
        </div>
      )}
    </div>
  );
}
