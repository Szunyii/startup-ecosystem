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
  const rows = await prisma.startup_year_data_test.findMany({
    where: {
      year,
      startup: { status: "active" },
    },
    select: {
      person: true,
      netrevenue: true,
      startup: { select: { sector: true, type: true } },
    },
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
