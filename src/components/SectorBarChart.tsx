import React from "react";
import { prisma } from "@/lib/db/prisma";
import SectorChartClient from "./SectorChartClient";

interface SectorBarChartProps {
  /** Reporting year used to scope the financial aggregates. */
  year: number;
  /** Optional title shown above the chart. */
  title?: string;
  /** Optional subtitle / description. */
  subtitle?: string;
}

/**
 * Server-side data loader for the sector bar chart. Fetches the raw rows
 * (with sector + type) and hands them off to SectorChartClient, which
 * owns the deep-tech toggle and re-buckets reactively when the user
 * toggles between All / Deep Tech / Non Deep.
 */
export default async function SectorBarChart({
  year,
  title = "Companies by sector",
  subtitle,
}: SectorBarChartProps) {
  const rawRows = await prisma.startup_year_data_test.findMany({
    where: {
      year,
      startup: { status: "active" },
      netrevenue: { not: null },
    },
    select: {
      taxnumber: true,
      person: true,
      netrevenue: true,
      startup: { select: { sector: true, deeptech: true } },
    },
  });

  // `taxnumber` isn't unique in startup_test, so a duplicate company row
  // makes the year-data → startup join fan out and double-count that
  // company (both in the total and in its sector bucket). Keep one row per
  // taxnumber so the chart counts each company exactly once. On clean data
  // this is a no-op.
  const seen = new Set<string>();
  const rows = rawRows.filter((r) => {
    if (r.taxnumber == null) return true;
    if (seen.has(r.taxnumber)) return false;
    seen.add(r.taxnumber);
    return true;
  });

  return (
    <SectorChartClient
      year={year}
      title={title}
      subtitle={subtitle}
      rows={rows}
    />
  );
}
