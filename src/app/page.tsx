import EventSection from "@/components/EventSection";
import HeroConstellation from "@/components/HeroConstellation";
import EventsHeading from "@/components/EventsHeading";
import { Suspense } from "react";
import { prisma } from "@/lib/db/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hungarian Startup Ecosystem",
  description:
    "Explore the Hungarian startup ecosystem with the Hungarian Innovation Agency: active startups, sector trends, funding programs and upcoming innovation events.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Hungarian Startup Ecosystem",
    description:
      "Explore the Hungarian startup ecosystem with the Hungarian Innovation Agency: active startups, sector trends, funding programs and upcoming innovation events.",
    url: "/",
  },
};

export default async function HomePage() {
  // Fetch a pool of active startups for the hero constellation. The client
  // component picks 10 at random and rotates them over time.
  const companyPool = await prisma.startup_test.findMany({
    where: {
      status: "active",
      company: { not: null },
      sector: { not: null },
    },
    select: { company: true, sector: true, website: true },
    take: 200,
  });

  // Map to the shape the hero expects (drop nulls + trim).
  const pool = companyPool
    .map((c) => ({
      name: (c.company ?? "").trim(),
      sector: (c.sector ?? "").trim() || "—",
      website: (c.website ?? "").trim() || null,
    }))
    .filter((c) => c.name.length > 0);

  return (
    <div className="scroll-smooth">
      <HeroConstellation pool={pool} />
      <section id="events" className="flex flex-col mb-11 mt-6">
        <EventsHeading />
        <Suspense fallback={"Loading"}>
          <EventSection />
        </Suspense>
      </section>
    </div>
  );
}
