"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { MultiSelect } from "@/components/ui/multi-select";

const PAGE_SIZE = 24;

export interface ActiveStartup {
  taxnumber: string | null;
  company: string | null;
  website: string | null;
  sector: string | null;
  type: string | null;
  funding_year: number | null;
}

interface Props {
  startups: ActiveStartup[];
}

function isDeepTech(type: string | null | undefined) {
  return /deep/i.test(type ?? "");
}

const fmt = (n: number) => new Intl.NumberFormat("hu-HU").format(n);

export default function ActiveStartupsListClient({ startups }: Props) {
  const [search, setSearch] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Unique sector + year option lists, derived from the data so they always
  // reflect what's actually present.
  const { sectorOptions, yearOptions } = useMemo(() => {
    const sectors = new Set<string>();
    const years = new Set<string>();
    for (const s of startups) {
      const sec = s.sector?.trim();
      if (sec) sectors.add(sec);
      if (s.funding_year != null) years.add(String(s.funding_year));
    }
    return {
      sectorOptions: Array.from(sectors).sort((a, b) => a.localeCompare(b)),
      // Years sorted descending so most recent appear first in the dropdown.
      yearOptions: Array.from(years).sort((a, b) => Number(b) - Number(a)),
    };
  }, [startups]);

  const filtered = useMemo(
    () =>
      startups.filter((s) => {
        const name = (s.company ?? "").toLowerCase();
        if (search && !name.includes(search.toLowerCase())) return false;
        if (
          selectedYears.length > 0 &&
          (s.funding_year == null ||
            !selectedYears.includes(String(s.funding_year)))
        )
          return false;
        if (
          selectedSectors.length > 0 &&
          (!s.sector || !selectedSectors.includes(s.sector))
        )
          return false;
        return true;
      }),
    [startups, search, selectedYears, selectedSectors],
  );

  const anyFilter =
    !!search || selectedYears.length > 0 || selectedSectors.length > 0;

  // Pagination
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Snap back to first page whenever filters change the result set.
  useEffect(() => {
    setPage(0);
  }, [search, selectedYears, selectedSectors]);

  // Clamp page when the result set shrinks (e.g. after filter narrows below
  // current page boundary).
  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [page, pageCount]);

  const pageItems = useMemo(
    () => filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [filtered, page],
  );

  const pageNumbers = useMemo<(number | "…")[]>(() => {
    // Show up to 5 page buttons centered around the current page, but
    // always make sure the last page is visible (with an ellipsis if
    // there's a gap between the window and the final page).
    const span = 2;
    const windowSize = 5;
    const start = Math.max(0, Math.min(page - span, pageCount - windowSize));
    const end = Math.min(pageCount, start + windowSize);
    const window = Array.from({ length: end - start }, (_, i) => start + i);

    const last = pageCount - 1;
    if (last < 0 || window.includes(last)) return window;

    const result: (number | "…")[] = [...window];
    if (last > window[window.length - 1] + 1) result.push("…");
    result.push(last);
    return result;
  }, [page, pageCount]);

  return (
    <section className="mt-6 md:mt-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-4 px-1">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest opacity-55">
            Startups ·
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-white">
            Active startups
          </h2>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <b className="text-2xl font-bold tracking-tight text-white">
            {fmt(filtered.length)}
          </b>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 text-white">
            {anyFilter ? "matches" : "companies"}
          </span>
        </div>
      </div>

      {/* Filter toolbar — same look as the new-startup page toolbar */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 md:p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3.5">
          {/* Search by company name */}
          <div className="relative flex-1 min-w-[220px] max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name…"
              className="w-full rounded-lg bg-black/30 border border-white/10 py-2.5 pl-9 pr-8 text-sm text-white outline-none focus:border-primary"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white/10 text-white text-xs leading-none hover:bg-white/20"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="w-px h-7 bg-white/10" />

          {/* Funding year multi-select */}
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 shrink-0">
              Funded
            </span>
            <div className="min-w-[200px] max-w-[320px] flex-1">
              <MultiSelect
                options={yearOptions}
                value={selectedYears}
                onChange={setSelectedYears}
                placeholder="Any year"
              />
            </div>
          </div>

          <div className="w-px h-7 bg-white/10" />

          {/* Sector multi-select */}
          <div className="flex items-center gap-2.5 flex-wrap min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 shrink-0">
              Sector
            </span>
            <div className="min-w-[220px] max-w-[420px] flex-1">
              <MultiSelect
                options={sectorOptions}
                value={selectedSectors}
                onChange={setSelectedSectors}
                placeholder="All sectors"
              />
            </div>
          </div>

          <div className="flex-1" />

          {anyFilter && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedYears([]);
                setSelectedSectors([]);
              }}
              className="font-mono text-[11px] text-white/60 hover:text-white underline-offset-2 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Wrap both states in a min-height container so heavy filtering
          doesn't yank the footer up the page. */}
      <div className="min-h-[640px]">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-10 text-center font-mono text-xs text-white/50">
            No startups match the current filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {pageItems.map((s) => {
              const name = (s.company ?? "—").trim() || "—";
              const sector = s.sector?.trim();
              const deep = isDeepTech(s.type);
              const initial = name[0]?.toUpperCase() ?? "?";
              return (
                <article
                  key={s.taxnumber ?? name}
                  className="rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-4 text-white flex flex-col gap-3 hover:border-primary/40 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(var(--primary)), #091737)",
                      }}
                    >
                      {initial}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3
                        title={name}
                        className="font-semibold text-sm truncate text-white"
                      >
                        {name}
                      </h3>
                      {s.funding_year != null && (
                        <span className="font-mono text-[10px] opacity-55">
                          Founded {s.funding_year}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {sector ? (
                      <span
                        title={sector}
                        className="inline-block max-w-full truncate align-middle bg-primary/20 text-violet-300 px-2 py-0.5 rounded-md text-[10px] font-mono"
                      >
                        {sector}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] opacity-30">
                        no sector
                      </span>
                    )}
                    {deep && (
                      <span
                        title="Deep tech company"
                        className="inline-block bg-[#afe200]/15 text-[#afe200] px-2 py-0.5 rounded-md text-[10px] font-mono"
                      >
                        Deep Tech
                      </span>
                    )}
                  </div>

                  {s.website ? (
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noreferrer"
                      title={s.website}
                      className="mt-auto inline-flex items-center gap-1.5 text-secondary font-mono text-[11px] no-underline opacity-70 hover:opacity-100 truncate"
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">
                        {s.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </span>
                    </a>
                  ) : (
                    <span className="mt-auto font-mono text-[11px] opacity-30">
                      no website
                    </span>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="flex justify-between items-center px-1 pt-5 font-mono text-xs text-white/80">
          <span>
            Showing {page * PAGE_SIZE + 1}–
            {Math.min((page + 1) * PAGE_SIZE, filtered.length)} of{" "}
            {fmt(filtered.length)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="bg-white/[0.06] border border-white/10 text-white px-3 py-1.5 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-[11px]"
            >
              ‹ Prev
            </button>
            <div className="flex gap-1 items-center">
              {pageNumbers.map((n, idx) =>
                n === "…" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-5 text-center text-white/50 select-none"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={
                      "w-7 h-7 rounded-md text-[11px] " +
                      (n === page
                        ? "bg-primary text-white font-bold"
                        : "bg-white/[0.06] border border-white/10 text-white/80 hover:bg-white/10")
                    }
                  >
                    {n + 1}
                  </button>
                ),
              )}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
              className="bg-white/[0.06] border border-white/10 text-white px-3 py-1.5 rounded-md hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed text-[11px]"
            >
              Next ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
