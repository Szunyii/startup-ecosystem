import React from "react";
import { prisma } from "@/lib/db/prisma";
import CardSection from "@/components/CardSection";
import StartupBrowser from "./StartupBrowser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Database",
  description:
    "Browse the Hungarian startup database: verified companies, sectors, funding stages and websites — a comprehensive directory of the Hungarian innovation ecosystem.",
  alternates: { canonical: "/startup" },
  openGraph: {
    title: "Startup Database — Hungarian Innovation Agency",
    description:
      "Browse the Hungarian startup database: verified companies, sectors, funding stages and websites.",
    url: "/startup",
  },
};

async function NewStartupPage(props: {
  searchParams: Promise<{ year?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q: number = parseInt(searchParams.year ?? "2024", 10);

  const newData = await prisma.startup_year_data_test.findMany({
    where: {
      year: q,
      startup: { status: "active" },
    },
    include: {
      startup: {
        select: {
          company: true,
          website: true,
          sector: true,
          funding_year: true,
          deeptech: true,
          type: true,
        },
      },
    },
    orderBy: {
      person: "desc",
    },
  });

  const count = await prisma.startup_year_data_test.count({
    where: {
      year: q,
      startup: { status: "active" },
    },
  });

  return (
    <StartupBrowser
      data={newData}
      totalCount={count}
      reportYear={q}
      cards={<CardSection qYear={q} variant="browse" />}
    />
  );
}

export default NewStartupPage;
