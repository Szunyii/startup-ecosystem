import React from "react";
import { prisma } from "@/lib/db/prisma";
import ActiveStartupsListClient from "./ActiveStartupsListClient";

/**
 * Server-side data loader for the active-startups card grid. Owns the
 * Prisma query; the client component owns the filter UI + rendering so
 * the user can search by name, funding year, and sector without a roundtrip.
 */
export default async function ActiveStartupsList() {
  const startups = await prisma.startup_test.findMany({
    where: { status: "active" },
    select: {
      taxnumber: true,
      company: true,
      website: true,
      sector: true,
      deeptech: true,
      funding_year: true,
    },
    orderBy: { company: "asc" },
  });

  return <ActiveStartupsListClient startups={startups} />;
}
