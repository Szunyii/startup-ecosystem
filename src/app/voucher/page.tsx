import React from "react";
import ProgramForm from "./ProgramForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voucher Program Registration",
  description:
    "Sign up for the NIÜ voucher program: register your company to be featured in the Hungarian Innovation Agency's verified database.",
  alternates: { canonical: "/viki" },
  robots: { index: false, follow: true },
};

function page() {
  return (
    <main className="min-h-screen text-white font-sans px-4 md:px-7 py-8 relative">
      <header className="px-2 mb-10 z-10 relative">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span>NIU · Voucher program registration</span>
        </div>
        <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Sign up to the voucher program
        </h1>
        <p className="mt-5 max-w-3xl text-base text-white/80 leading-relaxed">
          If your company isn&apos;t listed yet, submit this form to be featured
          with verified data. Our team reviews every submission before it goes
          live.
        </p>
      </header>

      <div className="mx-2 rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 md:p-10 flex justify-center">
        <ProgramForm />
      </div>
    </main>
  );
}

export default page;
