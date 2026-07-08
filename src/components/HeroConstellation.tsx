"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Brand-token bridge: `--secondary` resolves to lavender in :root, not lime,
// so the lime accent stays a hex literal. Amethyst is exposed via the
// Tailwind token (`bg-primary`, `hsl(var(--primary))`) and used wherever
// possible.
const LIME = "#afe200";
// const SAPPHIRE = "#7967d3";

export interface CompanyEntry {
  name: string;
  sector: string;
  website?: string | null;
}

function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

interface ConstellationSlot {
  /** % of canvas width — left coord. */
  x: number;
  /** % of canvas height — top coord. */
  y: number;
  size: "sm" | "md" | "lg";
}

// Visual layout — 10 hand-chosen positions around the central HU medallion.
// The actual companies that appear in these slots are picked from the
// `pool` prop and rotated over time.
const SLOTS: ConstellationSlot[] = [
  { x: 12, y: 18, size: "lg" },
  { x: 84, y: 12, size: "md" },
  { x: 30, y: 64, size: "lg" },
  { x: 72, y: 78, size: "md" },
  { x: 8, y: 78, size: "sm" },
  { x: 92, y: 50, size: "sm" },
  { x: 50, y: 8, size: "sm" },
  { x: 22, y: 38, size: "sm" },
  { x: 60, y: 36, size: "md" },
  { x: 46, y: 88, size: "sm" },
];

const NODE_DOT = { sm: 8, md: 11, lg: 14 } as const;

/** Milliseconds between swapping one slot's company. */
const SWAP_INTERVAL_MS = 1800;

// const STAGE_LEGEND: ReadonlyArray<{
//   label: string;
//   count: number;
//   dotColor: string;
//   glow?: boolean;
// }> = [
//   { label: "Series A+", count: 312, dotColor: LIME, glow: true },
//   { label: "Seed / Pre-seed", count: 684, dotColor: "hsl(var(--primary))" },
//   { label: "Bootstrapped", count: 244, dotColor: SAPPHIRE },
// ];

// Animated lime live-dot used in the eyebrow pill.
function LiveDot() {
  return (
    <span className="relative inline-block w-2 h-2">
      <span
        className="absolute inset-0 rounded-full opacity-35 animate-ping"
        style={{ background: LIME }}
      />
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: LIME }}
      />
    </span>
  );
}

/** Pick `count` distinct entries from `pool`, optionally excluding names. */
function pickRandom(
  pool: CompanyEntry[],
  count: number,
  exclude: ReadonlySet<string> = new Set(),
): CompanyEntry[] {
  const candidates = pool.filter((p) => !exclude.has(p.name));
  // Fisher-Yates shuffle, then take the first `count`.
  const shuffled = [...candidates];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

interface Props {
  /** Pool of company names + sectors fetched from startup_test. */
  pool: CompanyEntry[];
}

export default function HeroConstellation({ pool }: Props) {
  // Deterministic initial pick — use the first N pool entries. Same output
  // on server and client, so the SSR HTML matches the first client render
  // and React doesn't throw a hydration error. We only swap to a randomized
  // selection AFTER mount (in the effect below).
  const initial = useMemo<CompanyEntry[]>(() => {
    const picked = pool.slice(0, SLOTS.length);
    while (picked.length < SLOTS.length) {
      picked.push({ name: "—", sector: "—" });
    }
    return picked;
  }, [pool]);

  const [active, setActive] = useState<CompanyEntry[]>(initial);

  // Client-only: randomize the initial selection after hydration, then
  // periodically swap one random slot's company with another from the pool
  // that's not currently visible.
  useEffect(() => {
    if (pool.length === 0) return;

    // Initial randomization on mount. Intentionally deferred to a post-
    // hydration effect: the SSR HTML must match the deterministic initial
    // pick (see useState above), so randomization can only happen after
    // React has committed the matching first client render.
    const firstPick = pickRandom(pool, SLOTS.length);
    while (firstPick.length < SLOTS.length) {
      firstPick.push({ name: "—", sector: "—" });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(firstPick);

    // Skip the rotation interval if there's nothing extra to swap in.
    if (pool.length <= SLOTS.length) return;

    const id = setInterval(() => {
      setActive((current) => {
        const visible = new Set(current.map((c) => c.name));
        const candidates = pool.filter((p) => !visible.has(p.name));
        if (candidates.length === 0) return current;
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        const slotIdx = Math.floor(Math.random() * current.length);
        const updated = current.slice();
        updated[slotIdx] = next;
        return updated;
      });
    }, SWAP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [pool]);

  return (
    <section className="relative overflow-hidden text-white font-sans bg-transparent -mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-0 px-4 md:px-7 pt-1 pb-10 min-h-[640px] lg:min-h-[760px]">
        {/* Foreground content — second column on lg+, right-aligned there
            but kept left-aligned on small screens where the text spans full
            width. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 self-center py-6 md:py-10 lg:order-2 lg:pl-6 lg:text-right"
        >
          <div className="inline-flex items-center gap-2.5 font-mono text-xs px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 opacity-90">
            <LiveDot />
            <span>Hungarian Innovation Agency · Startup ecosystem</span>
          </div>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-[82px] font-extrabold tracking-tight leading-[0.94]">
            The Gateway to
            <br />
            <span className="italic font-extrabold" style={{ color: LIME }}>
              Hungary’s
            </span>
            <br />
            Startup Ecosystem.
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-[1.55] max-w-[480px] mt-7 lg:ml-auto">
            Access a growing network of innovative startups, scale-ups,
            research-driven ventures, and technology companies from Hungary.
            Designed for founders, investors, corporations, and international
            partners looking to discover breakthrough innovation and scalable
            business opportunities.
          </p>

          <div className="flex flex-wrap gap-3 mt-8 lg:justify-end">
            <Link
              href="/startup"
              className="group inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full font-semibold no-underline bg-primary text-white shadow-[0_12px_30px_-8px_rgba(93,61,255,.6)] hover:bg-primary/90 transition-colors"
            >
              Browse startups
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.4}
              />
            </Link>
            {/* <a
              href="/registry"
              className="inline-flex items-center px-5 py-3.5 rounded-full text-white no-underline border border-white/20 hover:bg-white/[0.06] transition-colors"
            >
              For companies
            </a> */}
          </div>

          <div className="flex flex-wrap gap-5 md:gap-7 mt-9 pt-5 border-t border-white/10 lg:justify-end">
            {/* {STAGE_LEGEND.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 text-sm"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background: item.dotColor,
                    boxShadow: item.glow
                      ? `0 0 12px ${item.dotColor}`
                      : undefined,
                  }}
                />
                <span>{item.label}</span>
                <b className="font-mono opacity-80">{item.count}</b>
              </div>
            ))} */}
          </div>
        </motion.div>

        {/* Constellation canvas — first column on lg+. Constrained to a
            square and vertically centered (`self-center`) instead of
            stretching to fill the tall hero row, so it doesn't elongate
            toward the top and bottom (and the rings stay circular). */}
        <div className="relative w-full max-w-[620px] aspect-square mx-auto self-center hidden lg:block lg:order-1">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <radialGradient id="hcGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7a5fff" stopOpacity={0.55} />
                <stop
                  offset="60%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.15}
                />
                <stop offset="100%" stopColor="transparent" stopOpacity={0} />
              </radialGradient>
              <linearGradient id="hcLine" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={LIME} stopOpacity={0} />
                <stop offset="50%" stopColor={LIME} stopOpacity={0.55} />
                <stop offset="100%" stopColor={LIME} stopOpacity={0} />
              </linearGradient>
            </defs>

            <circle cx="50" cy="50" r="40" fill="url(#hcGlow)" />

            {SLOTS.map((s, i) => {
              // Mirror the drift pattern used on the dot (see below), but
              // scaled into viewBox units (0-100 ≈ percent of container) so
              // the line endpoint moves in sync with the dot.
              const ampX = (4 + (i % 3) * 1.5) / 6;
              const ampY = (3 + ((i + 1) % 3) * 1.5) / 6;
              const durX = 7 + (i % 4);
              const durY = 8 + ((i + 2) % 4);
              const phase = (i % 5) * 0.4;
              return (
                <motion.line
                  key={i}
                  x2={50}
                  y2={50}
                  stroke={LIME}
                  strokeOpacity={0.35}
                  strokeWidth={1.25}
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  shapeRendering="geometricPrecision"
                  initial={{ x1: s.x, y1: s.y }}
                  animate={{
                    x1: [s.x, s.x + ampX, s.x, s.x - ampX, s.x],
                    y1: [s.y, s.y - ampY, s.y, s.y + ampY, s.y],
                  }}
                  transition={{
                    x1: {
                      duration: durX,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: phase,
                    },
                    y1: {
                      duration: durY,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: phase + 0.3,
                    },
                  }}
                />
              );
            })}

            {[18, 28, 38].map((r) => (
              <circle
                key={r}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="rgba(255,255,255,.06)"
                strokeWidth={0.12}
                vectorEffect="non-scaling-stroke"
                strokeDasharray="0.6 0.6"
              />
            ))}
          </svg>

          {/* Slots — outer div is statically centered on (x%, y%); inner
              motion.div runs the entrance + endless drift; the company name
              inside swaps via AnimatePresence when the rotation interval
              fires. */}
          {SLOTS.map((s, i) => {
            const dot = NODE_DOT[s.size];
            const ringSize = s.size === "sm" ? 3 : 4;
            const ringOpacity = s.size === "sm" ? 0.14 : 0.18;

            const ampX = 4 + (i % 3) * 1.5;
            const ampY = 3 + ((i + 1) % 3) * 1.5;
            const durX = 7 + (i % 4);
            const durY = 8 + ((i + 2) % 4);
            const phase = (i % 5) * 0.4;

            const company = active[i];

            return (
              <div
                key={i}
                className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, ampX, 0, -ampX, 0],
                    y: [0, -ampY, 0, ampY, 0],
                  }}
                  transition={{
                    opacity: {
                      duration: 0.4,
                      delay: 0.2 + i * 0.05,
                      ease: "easeOut",
                    },
                    scale: {
                      duration: 0.4,
                      delay: 0.2 + i * 0.05,
                      ease: "easeOut",
                    },
                    x: {
                      duration: durX,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: phase,
                    },
                    y: {
                      duration: durY,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: phase + 0.3,
                    },
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2 + (i % 3) * 0.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: (i % 5) * 0.25,
                    }}
                    className="rounded-full mx-auto"
                    style={{
                      width: dot,
                      height: dot,
                      background: LIME,
                      boxShadow: `0 0 0 ${ringSize}px rgba(175,226,0,${ringOpacity}), 0 0 12px ${LIME}`,
                    }}
                  />
                  {(() => {
                    const href = normalizeUrl(company?.website);
                    const cardInner = (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={company?.name ?? "empty"}
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <div className="font-semibold text-[13px] text-white">
                            {company?.name ?? "—"}
                          </div>
                          <div
                            className="font-mono text-[10px] opacity-90"
                            style={{ color: LIME }}
                          >
                            {company?.sector ?? "—"}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    );
                    const cardClasses =
                      "absolute left-[18px] -top-2 whitespace-nowrap rounded-[10px] px-2.5 py-1.5 backdrop-blur-md bg-[rgba(11,16,39,0.82)] border border-white/[0.12] overflow-hidden";
                    return href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${cardClasses} no-underline block cursor-pointer hover:border-[#afe200]/60 hover:bg-[rgba(11,16,39,0.92)] transition-colors`}
                      >
                        {cardInner}
                      </a>
                    ) : (
                      <div className={cardClasses}>{cardInner}</div>
                    );
                  })()}
                </motion.div>
              </div>
            );
          })}

          {/* Center medallion — uses calc() for centering so the
              framer-motion `scale` doesn't fight a translate-based one. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="absolute z-[3] flex flex-col items-center justify-center rounded-full w-[110px] h-[110px] bg-[linear-gradient(140deg,hsl(var(--primary)),#2a1f7a)] shadow-[0_0_0_8px_rgba(93,61,255,.18),0_0_0_16px_rgba(93,61,255,.08),0_30px_80px_rgba(93,61,255,.4)]"
            style={{
              left: "calc(50% - 55px)",
              top: "calc(50% - 55px)",
            }}
          >
            <div className="absolute -inset-[22px] rounded-full border border-dashed border-white/15 animate-spin [animation-duration:40s]" />
            <div className="text-3xl font-sans font-extrabold tracking-tight">
              HUN
            </div>
            {/* <div className="font-mono text-[9px] opacity-70 tracking-widest">
              Budapest 47.4979° N
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
