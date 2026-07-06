"use client";

import React, { useMemo } from "react";
import SectorBars, { type SectorRow } from "./SectorBars";
// import YearSelector from "./YearSelector";

export interface RawRow {
  taxnumber?: string | null;
  person: number | null;
  netrevenue: number | null;
  startup: {
    sector: string | null;
    deeptech: boolean | null;
  } | null;
}

interface Props {
  year: number;
  title: string;
  subtitle?: string;
  rows: RawRow[];
}

const fmt = (n: number) => new Intl.NumberFormat("hu-HU").format(n);

export default function SectorChartClient({
  year,
  title,
  subtitle,
  rows,
}: Props) {
  // Bucket the rows by sector — counts, sums, and maxCount reflect all
  // active companies for the reporting year.
  const { sectors, maxCount, totalCompanies } = useMemo(() => {
    const buckets = new Map<string, SectorRow>();
    for (const r of rows) {
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
  }, [rows]);

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 md:p-5 text-white font-sans">
      {/* Header — title left, total count right */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-55">
            {year} reporting year
          </div>
          {/* Interactive year selector — commented out for now; restore this
              block (and the import above) to let the user change the year:
          <div className="flex items-center gap-2">
            <YearSelector triggerClassName="w-[92px] h-auto bg-black/30 border border-white/10 rounded-md px-2 py-1 text-[11px] font-mono text-white outline-none focus:border-primary hover:bg-black/40 transition-colors" />
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
              reporting year
            </span>
          </div>
          */}
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-white/60 mt-1">{subtitle}</p>}
        </div>

        <div className="flex flex-col items-end shrink-0">
          <b className="text-2xl font-bold tracking-tight">
            {fmt(totalCompanies)}
          </b>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
            companies
          </span>
        </div>
      </div>

      {sectors.length === 0 ? (
        <div className="font-mono text-xs opacity-50 py-6 text-center">
          No sector data for {year}.
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
