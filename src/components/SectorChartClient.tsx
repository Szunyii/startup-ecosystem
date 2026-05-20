"use client";

import React, { useMemo, useState } from "react";
import SectorBars, { type SectorRow } from "./SectorBars";

export interface RawRow {
  person: number | null;
  netrevenue: number | null;
  startup: {
    sector: string | null;
    type: string | null;
  } | null;
}

interface Props {
  year: number;
  title: string;
  subtitle?: string;
  rows: RawRow[];
}

type DeepFilter = "all" | "deep" | "startup";

function isDeepTech(r: RawRow) {
  return /deep/i.test(r.startup?.type ?? "");
}

const fmt = (n: number) => new Intl.NumberFormat("hu-HU").format(n);

export default function SectorChartClient({
  year,
  title,
  subtitle,
  rows,
}: Props) {
  const [deepFilter, setDeepFilter] = useState<DeepFilter>("all");

  // Re-bucket every time the filter changes — counts, sums, and maxCount
  // all reflect the currently filtered subset.
  const { sectors, maxCount, totalCompanies } = useMemo(() => {
    const filtered = rows.filter((r) => {
      if (deepFilter === "deep" && !isDeepTech(r)) return false;
      if (deepFilter === "startup" && isDeepTech(r)) return false;
      return true;
    });

    const buckets = new Map<string, SectorRow>();
    for (const r of filtered) {
      const sector = r.startup?.sector?.trim();
      if (!sector) continue;
      const bucket =
        buckets.get(sector) ??
        ({
          sector,
          count: 0,
          employees: 0,
          netrevenue: 0,
          revenueCount: 0,
        } satisfies SectorRow);
      bucket.count += 1;
      bucket.employees += Math.round(r.person ?? 0);
      if (r.netrevenue !== null && r.netrevenue !== undefined) {
        bucket.netrevenue += r.netrevenue;
        bucket.revenueCount += 1;
      }
      buckets.set(sector, bucket);
    }

    const sectors = Array.from(buckets.values()).sort(
      (a, b) => b.count - a.count,
    );
    const maxCount = sectors.reduce((m, s) => Math.max(m, s.count), 0) || 1;
    const totalCompanies = sectors.reduce((acc, s) => acc + s.count, 0);
    return { sectors, maxCount, totalCompanies };
  }, [rows, deepFilter]);

  const filterOptions: { key: DeepFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "deep", label: "Deep Tech" },
    { key: "startup", label: "Startup" },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 md:p-5 text-white font-sans">
      {/* Header — title left, type toggle + total count right */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-55">
            {year} reporting year
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* 3-state type toggle in the top-right */}
          <div className="flex gap-1 p-[3px] rounded-full bg-black/30 border border-white/[0.06]">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setDeepFilter(opt.key)}
                className={
                  "px-2.5 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors " +
                  (deepFilter === opt.key
                    ? opt.key === "deep"
                      ? "bg-[#afe200] text-foreground font-semibold"
                      : "bg-primary text-white font-semibold"
                    : "text-white/70 hover:text-white")
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-end">
            <b className="text-2xl font-bold tracking-tight">
              {fmt(totalCompanies)}
            </b>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
              companies
            </span>
          </div>
        </div>
      </div>

      {sectors.length === 0 ? (
        <div className="font-mono text-xs opacity-50 py-6 text-center">
          No sector data for {year}
          {deepFilter !== "all" && ` (filter: ${deepFilter})`}.
        </div>
      ) : (
        <SectorBars sectors={sectors} maxCount={maxCount} />
      )}

      <div className="mt-4 pt-3 border-t border-dashed border-white/10 flex justify-between font-mono text-[11px] opacity-70">
        <span>{sectors.length} sectors</span>
        <span>Hover a bar for details</span>
      </div>
    </section>
  );
}
