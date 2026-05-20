import React from "react";
import partnerData from "@/data/partner.json";
import EcosystemAtlas from "./EcosystemAtlas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Startup Ecosystem",
  description:
    "The Hungarian startup ecosystem atlas: accelerators, incubators, VCs and partners supporting founders across every stage — from pre-seed to scale-up.",
  alternates: { canonical: "/ecosystem" },
  openGraph: {
    title: "Startup Ecosystem — Hungarian Innovation Agency",
    description:
      "The Hungarian startup ecosystem atlas: accelerators, incubators, VCs and partners supporting founders.",
    url: "/ecosystem",
  },
};

type RawPartner = {
  id: number;
  link: string;
  stage: string[];
  type: string[];
  companyLogo: string;
  companyName: string;
  about: string;
};

export default function NewEcosystemPage() {
  const partners = (partnerData as RawPartner[]).filter(
    (p) => p.companyName && p.stage?.length && p.type?.length,
  );

  return <EcosystemAtlas partners={partners} />;
}
