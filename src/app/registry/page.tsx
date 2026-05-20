import FormChanger from "@/components/FormChanger";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration",
  description:
    "Register your startup or ecosystem partner with the Hungarian Innovation Agency to be featured in the official Hungarian startup database.",
  alternates: { canonical: "/registry" },
  openGraph: {
    title: "Registration — Hungarian Innovation Agency",
    description:
      "Register your startup or ecosystem partner with the Hungarian Innovation Agency.",
    url: "/registry",
  },
};

function page() {
  return (
    <main className="min-h-screen text-white font-sans px-4 md:px-7 py-8 relative">
      <FormChanger />
    </main>
  );
}

export default page;
