import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen text-white font-sans px-4 md:px-7 py-8 relative">
      <section
        className="relative overflow-hidden rounded-[32px] border border-white/10 px-6 md:px-12 py-16 md:py-24 mt-6"
        style={{
          background:
            "radial-gradient(900px 500px at 100% -10%, rgba(93,61,255,.32), transparent 55%)," +
            "radial-gradient(700px 400px at -10% 110%, rgba(175,226,0,.10), transparent 60%)," +
            "linear-gradient(180deg, #091737 0%, #0a0d2a 100%)",
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span>Status · 404 · Resource not found</span>
          </div>

          <h1 className="mt-5 text-[88px] md:text-[140px] lg:text-[180px] font-extrabold tracking-tight leading-[0.9]">
            <span className="text-[#afe200]">4</span>
            <span>0</span>
            <span className="text-[#afe200]">4</span>
          </h1>

          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
            This page is off the ecosystem map
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/75 leading-relaxed">
            The page you were looking for doesn&apos;t exist or has moved. Try
            one of the routes below — or head back to the constellation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-full font-semibold no-underline bg-[#afe200] text-[#0b1027] shadow-[0_12px_30px_-8px_rgba(175,226,0,.4)] hover:opacity-90 transition-opacity"
            >
              Back to home
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
            <Link
              href="/startup"
              className="inline-flex items-center px-5 py-3 rounded-full text-white no-underline border border-white/20 hover:bg-white/[0.06] transition-colors"
            >
              Startup database
            </Link>
            <Link
              href="/ecosystem"
              className="inline-flex items-center px-5 py-3 rounded-full text-white no-underline border border-white/20 hover:bg-white/[0.06] transition-colors"
            >
              Startup ecosystem
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            {[
              { href: "/why-hungary", label: "Why Hungary" },
              { href: "/highlighted-sectors", label: "Highlighted sectors" },
              { href: "/funding-opportunities", label: "Funding" },
              { href: "/legal-library", label: "Legal library" },
            ].map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-colors px-4 py-3 font-mono text-[11px] text-white/80 no-underline"
              >
                {q.label} ↗
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
