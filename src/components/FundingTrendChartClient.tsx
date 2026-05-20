"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface YearBucket {
  year: number;
  total: number;
  sectors: Record<string, number>;
}

interface Props {
  data: YearBucket[];
}

const PRIMARY = "#5d3dff";
const fmt = (n: number) => new Intl.NumberFormat("hu-HU").format(n);

interface TooltipPayloadItem {
  payload: YearBucket;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const bucket = payload[0].payload;

  const sectors = Object.entries(bucket.sectors)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="pointer-events-none bg-[#120937] border border-white/15 text-white shadow-xl rounded-lg p-3 min-w-[220px]">
      <div className="font-semibold text-sm mb-2">{label}</div>

      <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[12px] mb-2 pb-2 border-b border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 self-center">
          Total
        </span>
        <span
          className="font-mono text-right tabular-nums"
          style={{ color: PRIMARY }}
        >
          {fmt(bucket.total)}
        </span>
      </div>

      {sectors.length === 0 ? (
        <div className="font-mono text-[10px] uppercase tracking-widest opacity-40">
          No sector data
        </div>
      ) : (
        <>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-55 mb-1">
            By sector
          </div>
          <div className="flex flex-col gap-0.5 max-h-[220px] overflow-y-auto">
            {sectors.map((s) => {
              const pct =
                bucket.total > 0
                  ? Math.round((s.value / bucket.total) * 100)
                  : 0;
              return (
                <div
                  key={s.name}
                  className="grid grid-cols-[1fr_auto_auto] gap-2 items-center text-[11px]"
                >
                  <span className="truncate text-white/85" title={s.name}>
                    {s.name}
                  </span>
                  <span className="font-mono tabular-nums text-white/90">
                    {s.value}
                  </span>
                  <span className="font-mono tabular-nums opacity-55 w-9 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default function FundingTrendChartClient({ data }: Props) {
  const total = data.reduce((acc, d) => acc + d.total, 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 md:p-5 text-white font-sans h-full flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-55">
            Last {data.length} years
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight mt-1">
            Foundings by year
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Active startups grouped by their founding year. Hover for the sector
            breakdown.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: PRIMARY }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
              Total
            </span>
            <b className="font-mono text-sm tabular-nums">{fmt(total)}</b>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="grad-total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.55} />
                <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{
                fill: "rgba(255,255,255,0.55)",
                fontSize: 11,
                fontFamily: "var(--font-roboto-mono)",
              }}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            />
            <YAxis
              tick={{
                fill: "rgba(255,255,255,0.55)",
                fontSize: 11,
                fontFamily: "var(--font-roboto-mono)",
              }}
              tickLine={false}
              axisLine={false}
              width={20}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.15)" }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke={PRIMARY}
              strokeWidth={2}
              fill="url(#grad-total)"
              name="Foundings"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-dashed border-white/10 flex justify-between font-mono text-[11px] opacity-70">
        <span>{data.length} years</span>
        <span>By funding_year</span>
      </div>
    </section>
  );
}
