import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funding Opportunities",
  description:
    "Funding opportunities for Hungarian startups by stage — pre-startup, startup and scale-up. Grants, accelerators and support programs curated by the Hungarian Innovation Agency.",
  alternates: { canonical: "/funding-opportunities" },
  openGraph: {
    title: "Funding Opportunities — Hungarian Innovation Agency",
    description:
      "Funding opportunities for Hungarian startups by stage — pre-startup, startup and scale-up.",
    url: "/funding-opportunities",
  },
};

export default function FundingOpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
