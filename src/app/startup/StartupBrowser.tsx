"use client";

import React, { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, Search } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import YearSelector from "@/components/YearSelector";
import { MultiSelect } from "@/components/ui/multi-select";
// import Faq from "@/app/startups/Faq";
// import AccordionDatabase from "@/app/startups/AccordionDatabe";
import type { Prisma } from "@prisma/client";

// Row shape matches the include shape used in page.tsx — every financial
// metric pairs with a YoY field.
export type StartupRow = Prisma.startup_year_data_testGetPayload<{
  include: {
    startup: {
      select: {
        company: true;
        website: true;
        sector: true;
        funding_year: true;
        type: true;
      };
    };
  };
}>;

const EMP_BANDS = [
  { label: "Any size", min: 0, max: Infinity },
  { label: "1–10", min: 1, max: 10 },
  { label: "11–50", min: 11, max: 50 },
  { label: "51–200", min: 51, max: 200 },
  { label: "201+", min: 201, max: Infinity },
] as const;

function fmtHufBL(n: number | null | undefined) {
  if (!n) return "—";
  return new Intl.NumberFormat("hu-HU").format(Math.round(n));
}

function safeStr(v: string | null | undefined) {
  return (v ?? "").toString();
}

function hasFinancials(r: StartupRow) {
  return (r.tax ?? 0) > 0 || (r.personalexpenses ?? 0) > 0;
}

// Treat anything whose `type` mentions "deep" (case-insensitive) as deep tech.
function isDeepTech(r: StartupRow) {
  return /deep/i.test(r.startup?.type ?? "");
}

// YoY cell — values are stored as decimals (e.g. 0.083 → +8.3%). Renders
// a colored arrow + percentage; null / 0 / non-finite → em-dash.
function YoYCell({ value }: { value: number | null | undefined }) {
  if (value == null || value === 0 || !Number.isFinite(value)) {
    return <span className="font-mono opacity-30">—</span>;
  }
  const pct = value * 100;
  const positive = pct > 0;
  return (
    <span
      className={
        "inline-flex items-center gap-0.5 font-mono text-[11px] " +
        (positive ? "text-green-400" : "text-red-400")
      }
    >
      {positive ? (
        <ArrowUp className="h-3 w-3" strokeWidth={2.4} />
      ) : (
        <ArrowDown className="h-3 w-3" strokeWidth={2.4} />
      )}
      {Math.abs(pct).toFixed(1)}%
    </span>
  );
}

const columns: ColumnDef<StartupRow>[] = [
  {
    id: "company",
    accessorFn: (r) => r.startup?.company ?? "",
    header: "Company",
    cell: ({ row, table }) => {
      const r = row.original;
      const name = safeStr(r.startup?.company) || "—";
      const fin = hasFinancials(r);
      // Position within the *sorted* dataset (so the top row of the current
      // sort/filter view is always #001, regardless of pagination).
      const sortedRows = table.getSortedRowModel().rows;
      const sortedIndex = sortedRows.findIndex((sr) => sr.id === row.id);
      const link = r.startup?.website ?? null;
      return (
        <div className="flex items-center gap-3">
          <span
            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center font-bold text-[13px] text-white shrink-0"
            style={{
              background: fin
                ? "linear-gradient(135deg, hsl(var(--primary)), #091737)"
                : "rgba(255,255,255,.08)",
            }}
          >
            {name[0]?.toUpperCase() ?? "?"}
          </span>
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    "font-semibold no-underline hover:underline truncate " +
                    (!fin ? "text-white/85" : "text-white")
                  }
                >
                  {name}
                </a>
              ) : (
                <span
                  className={
                    "font-semibold truncate " +
                    (!fin ? "text-white/85" : "text-white")
                  }
                >
                  {name}
                </span>
              )}
            </div>
            <span className="font-mono text-[10px] opacity-40">
              #{String(sortedIndex + 1).padStart(3, "0")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "sector",
    accessorFn: (r) => r.startup?.sector ?? "",
    header: "Sector",
    meta: { cellClassName: "max-w-[110px]" },
    cell: ({ getValue }) => {
      const v = getValue<string>();
      if (!v)
        return <span className="font-mono text-[11px] opacity-30">—</span>;
      return (
        <span
          title={v}
          className="inline-block max-w-full truncate align-middle bg-primary/20 text-violet-300 px-1.5 py-0.5 rounded-md text-[10px] font-mono"
        >
          {v}
        </span>
      );
    },
  },
  {
    id: "type",
    accessorFn: (r) => (isDeepTech(r) ? "Deep Tech" : ""),
    header: "Type",
    meta: { cellClassName: "max-w-[80px]" },
    cell: ({ row }) =>
      isDeepTech(row.original) ? (
        <span
          title="Deep tech company"
          className="inline-block max-w-full truncate align-middle bg-[#afe200]/15 text-[#afe200] px-1.5 py-0.5 rounded-md text-[10px] font-mono"
        >
          Deep Tech
        </span>
      ) : (
        <span className="font-mono text-[11px] opacity-30">—</span>
      ),
  },
  {
    accessorKey: "person",
    header: "Empl.",
    meta: { align: "right" },
    cell: ({ getValue }) => {
      const v = getValue<number | null>();
      return (
        <span className="font-mono">{v == null ? "—" : Math.round(v)}</span>
      );
    },
  },
  {
    accessorKey: "personal_yoy",
    header: "YoY",
    meta: { align: "right" },
    cell: ({ getValue }) => <YoYCell value={getValue<number | null>()} />,
  },
  {
    accessorKey: "netrevenue",
    header: "Net rev.",
    meta: { align: "right" },
    cell: ({ getValue }) => fmtHufBL(getValue<number | null>()),
  },
  {
    accessorKey: "netrevenue_yoy",
    header: "YoY",
    meta: { align: "right" },
    cell: ({ getValue }) => <YoYCell value={getValue<number | null>()} />,
  },
  {
    accessorKey: "tax",
    header: "Tax",
    meta: { align: "right" },
    cell: ({ getValue }) => fmtHufBL(getValue<number | null>()),
  },
  {
    accessorKey: "tax_yoy",
    header: "YoY",
    meta: { align: "right" },
    cell: ({ getValue }) => <YoYCell value={getValue<number | null>()} />,
  },
  {
    accessorKey: "personalexpenses",
    header: "Payroll",
    meta: { align: "right" },
    cell: ({ getValue }) => fmtHufBL(getValue<number | null>()),
  },
  {
    accessorKey: "personalexpenses_yoy",
    header: "YoY",
    meta: { align: "right" },
    cell: ({ getValue }) => <YoYCell value={getValue<number | null>()} />,
  },
  // {
  //   id: "open",
  //   header: "",
  //   enableSorting: false,
  //   meta: { align: "right" },
  //   cell: ({ row }) => {
  //     const link = row.original.startup?.website;
  //     return link ? (
  //       <a
  //         href={link}
  //         target="_blank"
  //         rel="noreferrer"
  //         className="text-secondary font-mono text-[11px] no-underline opacity-70 hover:opacity-100"
  //       >
  //         Open ↗
  //       </a>
  //     ) : (
  //       <span className="font-mono text-[11px] opacity-30">—</span>
  //     );
  //   },
  // },
];

interface Props {
  data: StartupRow[];
  totalCount: number;
  reportYear: number;
  cards?: React.ReactNode;
}

export default function StartupBrowser({
  data,
  totalCount,
  reportYear,
  cards,
}: Props) {
  const [search, setSearch] = useState("");
  const [empBand, setEmpBand] = useState(0);
  // 3-state filter: "all" shows everything, "deep" shows only deep tech,
  // "startup" shows only startup-tech.
  const [deepTechFilter, setDeepTechFilter] = useState<
    "all" | "deep" | "startup"
  >("all");
  // Multi-select: empty array = no filter, any sector passes.
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  // Unique sector list pulled from the rows we received — sorted and
  // de-duplicated, so the dropdown always reflects what's actually in the data.
  const sectorOptions = useMemo(() => {
    const set = new Set<string>();
    for (const r of data) {
      const s = r.startup?.sector?.trim();
      if (s) set.add(s);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const filteredData = useMemo(
    () =>
      data.filter((r) => {
        const name = safeStr(r.startup?.company).toLowerCase();
        if (search && !name.includes(search.toLowerCase())) return false;
        const employees = r.person ?? 0;
        const b = EMP_BANDS[empBand];
        if (employees < b.min || employees > b.max) return false;
        if (deepTechFilter === "deep" && !isDeepTech(r)) return false;
        if (deepTechFilter === "startup" && isDeepTech(r)) return false;
        if (
          selectedSectors.length > 0 &&
          (!r.startup?.sector || !selectedSectors.includes(r.startup.sector))
        )
          return false;
        return true;
      }),
    [data, search, empBand, deepTechFilter, selectedSectors],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const total = filteredData.length;

  return (
    <div className="min-h-screen text-white font-sans px-4 md:px-7 py-8">
      {/* HEADER */}
      <div className="px-2">
        <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
          </span>
          <span>Browse · Hungarian startup registry</span>
        </div>

        <div className="mt-3 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              All startups
            </h1>
            <YearSelector triggerClassName="w-[140px] bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white outline-none focus:border-primary hover:bg-black/40 transition-colors" />
          </div>
          <div className="flex flex-col gap-7 pb-2">
            {/* <Faq>
              <AccordionDatabase />
            </Faq> */}
            <div className="flex flex-col items-end">
              <b className="text-2xl font-bold tracking-tight">{total}</b>
              <span className="font-mono text-[10px] uppercase opacity-55 tracking-widest">
                matches
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* INDICATOR CARDS */}
      {cards && <div className="mt-6">{cards}</div>}

      {/* TOOLBAR */}
      <div className="mt-7 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 md:p-4">
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="relative flex-1 min-w-[240px] max-w-[360px]">
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

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
              Employees
            </span>
            <div className="flex gap-1 p-[3px] rounded-full bg-black/30 border border-white/[0.06]">
              {EMP_BANDS.map((b, i) => (
                <button
                  key={b.label}
                  onClick={() => setEmpBand(i)}
                  className={
                    "px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-colors " +
                    (i === empBand
                      ? "bg-primary text-white font-semibold"
                      : "text-white/70 hover:text-white")
                  }
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-7 bg-white/10" />

          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
              Type
            </span>
            <div className="flex gap-1 p-[3px] rounded-full bg-black/30 border border-white/[0.06]">
              {(
                [
                  { key: "all", label: "All" },
                  { key: "deep", label: "Deep Tech" },
                  { key: "startup", label: "Startup" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setDeepTechFilter(opt.key)}
                  className={
                    "px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition-colors " +
                    (deepTechFilter === opt.key
                      ? opt.key === "deep"
                        ? "bg-[#afe200] text-foreground font-semibold"
                        : "bg-primary text-white font-semibold"
                      : "text-white/70 hover:text-white")
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Row 2: Sector multi-select */}
        {sectorOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 mt-3 pt-3 border-t border-dashed border-white/10">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 shrink-0">
              Sector
            </span>
            <div className="flex-1 min-w-[260px] max-w-[520px]">
              <MultiSelect
                options={sectorOptions}
                value={selectedSectors}
                onChange={setSelectedSectors}
                placeholder="All sectors"
              />
            </div>
            {selectedSectors.length > 0 && (
              <button
                onClick={() => setSelectedSectors([])}
                className="font-mono text-[11px] text-white/60 hover:text-white underline-offset-2 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="mt-4">
        <div className="flex justify-between items-center px-1 pb-2 font-mono text-xs opacity-70">
          <span>
            {total} startups · {reportYear} reporting year
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} className="bg-white/[0.03]">
                    {hg.headers.map((h) => {
                      const align =
                        (h.column.columnDef.meta as { align?: string })
                          ?.align ?? "left";
                      const canSort = h.column.getCanSort();
                      const sortDir = h.column.getIsSorted();
                      return (
                        <th
                          key={h.id}
                          className={
                            "font-mono text-[10px] uppercase tracking-wide opacity-60 px-2 py-2.5 border-b border-white/10 whitespace-nowrap " +
                            (align === "right" ? "text-right" : "text-left") +
                            (canSort ? " cursor-pointer select-none" : "")
                          }
                          onClick={
                            canSort
                              ? h.column.getToggleSortingHandler()
                              : undefined
                          }
                        >
                          <span
                            className={
                              "inline-flex items-center gap-1 " +
                              (align === "right" ? "justify-end w-full" : "")
                            }
                          >
                            {flexRender(
                              h.column.columnDef.header,
                              h.getContext(),
                            )}
                            {canSort && (
                              <>
                                {sortDir === "asc" && (
                                  <ArrowUp className="h-3 w-3 opacity-80" />
                                )}
                                {sortDir === "desc" && (
                                  <ArrowDown className="h-3 w-3 opacity-80" />
                                )}
                                {sortDir === false && (
                                  <ArrowUpDown className="h-3 w-3 opacity-30" />
                                )}
                              </>
                            )}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => {
                  const r = row.original;
                  const fin = hasFinancials(r);
                  return (
                    <tr
                      key={row.id}
                      className={
                        "border-b border-white/[0.05] last:border-b-0 hover:bg-white/[0.03] " +
                        (!fin ? "text-white/55" : "")
                      }
                    >
                      {row.getVisibleCells().map((cell) => {
                        const meta = cell.column.columnDef.meta as
                          | { align?: string; cellClassName?: string }
                          | undefined;
                        const align = meta?.align ?? "left";
                        const extra =
                          meta?.cellClassName ?? "whitespace-nowrap";
                        return (
                          <td
                            key={cell.id}
                            className={
                              "px-2 py-2.5 overflow-hidden text-[12px] " +
                              (align === "right" ? "text-right " : "") +
                              extra
                            }
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
                {table.getRowModel().rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-3.5 py-10 text-center text-white/50 font-mono text-xs"
                    >
                      No startups match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center px-1 pt-3.5 font-mono text-xs opacity-80">
          <span>
            Showing {table.getRowModel().rows.length} of {totalCount} ·{" "}
            {reportYear}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-white/[0.06] border border-white/10 text-white px-3 py-1.5 rounded-md font-mono text-[11px] hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹ Prev
            </button>
            <span>
              Page{" "}
              <b className="text-secondary">
                {table.getState().pagination.pageIndex + 1}
              </b>{" "}
              / {Math.max(1, table.getPageCount())}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-white/[0.06] border border-white/10 text-white px-3 py-1.5 rounded-md font-mono text-[11px] hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
