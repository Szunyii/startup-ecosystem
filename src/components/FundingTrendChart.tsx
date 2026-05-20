import React from "react";
import { prisma } from "@/lib/db/prisma";
import FundingTrendChartClient, {
  type YearBucket,
} from "./FundingTrendChartClient";

const YEARS_BACK = 10;

export default async function FundingTrendChart() {
  const maxYear = 2025;
  const minYear = maxYear - (YEARS_BACK - 1);

  const records = await prisma.startup_test.findMany({
    where: {
      status: "active",
      funding_year: { gte: minYear, lte: maxYear },
    },
    select: {
      funding_year: true,
      sector: true,
    },
  });

  const skeleton = new Map<number, YearBucket>();
  for (let y = minYear; y <= maxYear; y++) {
    skeleton.set(y, { year: y, total: 0, sectors: {} });
  }

  for (const r of records) {
    if (r.funding_year == null) continue;
    const bucket = skeleton.get(r.funding_year);
    if (!bucket) continue;
    const sector = r.sector?.trim() || "Unknown";
    bucket.total += 1;
    bucket.sectors[sector] = (bucket.sectors[sector] ?? 0) + 1;
  }

  const data = Array.from(skeleton.values()).sort((a, b) => a.year - b.year);

  return <FundingTrendChartClient data={data} />;
}
