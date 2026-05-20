import React from "react";
import SectorBarChart from "@/components/SectorBarChart";
import FundingTrendChart from "@/components/FundingTrendChart";
import ActiveStartupsList from "@/components/ActiveStartupsList";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Overview",
  description:
    "Hungarian startup overview: sector breakdown, funding trends and active startups for every reporting year — curated by the Hungarian Innovation Agency.",
  alternates: { canonical: "/startup-overview" },
  openGraph: {
    title: "Startup Overview — Hungarian Innovation Agency",
    description:
      "Hungarian startup overview: sector breakdown, funding trends and active startups for every reporting year.",
    url: "/startup-overview",
  },
};

export default async function StartupOverviewPage(props: {
  searchParams: Promise<{ year?: string }>;
}) {
  const searchParams = await props.searchParams;
  const year: number = parseInt(searchParams.year ?? "2024", 10);

  return (
    <div className="min-h-screen text-white font-sans px-4 md:px-7 py-8">
      <header className="px-2 mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span>Overview · Hungarian startup ecosystem</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Sector breakdown
          </h1>
        </div>

        {/* <Faq triggerClassName="bg-transparent text-white/85 hover:bg-white/10 hover:text-white px-5 py-3 h-auto rounded-full font-medium text-sm border border-white/20">
          <AccordionDatabase />
        </Faq> */}
      </header>

      {/* Two-column grid on lg+ — chart left, placeholder for additional
          sections on the right. Stacks to a single column below lg. */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <SectorBarChart
          year={year}
          title="Companies by sector"
          subtitle="Active companies grouped by their primary sector. Bar length is relative to the largest sector."
        />

        <FundingTrendChart />
      </div>

      {/* Active startups card grid below the charts */}
      <ActiveStartupsList />
    </div>
  );
}
