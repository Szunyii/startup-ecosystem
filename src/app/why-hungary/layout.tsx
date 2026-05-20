import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Hungary",
  description:
    "Why Hungary is a great place to build a startup: talent, R&D incentives, central European location, ecosystem support and access to EU funding.",
  alternates: { canonical: "/why-hungary" },
  openGraph: {
    title: "Why Hungary — Hungarian Innovation Agency",
    description:
      "Why Hungary is a great place to build a startup: talent, R&D incentives, central European location, ecosystem support and access to EU funding.",
    url: "/why-hungary",
  },
};

function layout({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}

export default layout;
