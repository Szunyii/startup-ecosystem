import { ArrowDown, ArrowUp, InfoIcon, LucideIcon, Minus } from "lucide-react";
import React from "react";
// import { formatHuf } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { prisma } from "@/lib/db/prisma";
import { formatHuf } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
// import { prisma } from "@/lib/db/prisma";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default async function CardSection({
  qYear,
  variant = "classic",
}: {
  qYear: number;
  variant?: "classic" | "browse";
}) {
  const safeYear = qYear < 2022 ? 2022 : qYear - 1;

  // Salary aggregates — only rows with both employees and personal expenses
  // so the avg salary (= payroll / employees) is meaningful.
  const aggregationsSalary = await prisma.startup_year_data_test.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: {
      year: qYear,
      person: { gt: 0 },
      personalexpenses: { gt: 0 },
      startup: { status: "active" },
    },
  });

  const aggregationsSalaryPrev = await prisma.startup_year_data_test.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: {
      year: safeYear,
      person: { gt: 0 },
      personalexpenses: { gt: 0 },
      startup: { status: "active" },
    },
  });

  // Total ecosystem aggregates — every active startup with year data, used
  // for headline totals (Employees, Taxes paid).
  const aggregations = await prisma.startup_year_data_test.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: { year: qYear, startup: { status: "active" } },
  });
  const aggregationsPrev = await prisma.startup_year_data_test.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: { year: safeYear, startup: { status: "active" } },
  });

  // const avgSalaryChange =
  //   ((aggregations._sum.personalexpenses! / aggregations._sum.person! -
  //     aggregationsPrev._sum.personalexpenses! / aggregationsPrev._sum.person!) /
  //     (aggregationsPrev._sum.personalexpenses! /
  //       aggregationsPrev._sum.person!)) *
  //   100;

  const avgSalaryChange =
    ((aggregationsSalary._sum.personalexpenses! /
      aggregationsSalary._sum.person! -
      aggregationsSalaryPrev._sum.personalexpenses! /
        aggregationsSalaryPrev._sum.person!) /
      (aggregationsSalaryPrev._sum.personalexpenses! /
        aggregationsSalaryPrev._sum.person!)) *
    100;

  const employeeChange =
    ((aggregations._sum.person! - aggregationsPrev._sum.person!) /
      aggregationsPrev._sum.person!) *
    100;

  const taxChange =
    ((aggregations._sum.tax! - aggregationsPrev._sum.tax!) /
      aggregationsPrev._sum.tax!) *
    100;

  const browse = variant === "browse";

  // Card class strings — pick by variant.
  // Browse variant: solid-ish dark fill with a clear border so cards read
  // distinctly on the dark navy backdrop, matching the toolbar/table look.
  const cardCls = browse
    ? "p-5 flex-1 bg-white/[0.04] border border-white/15 rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    : "p-4 flex-1 bg-primary/20 border-none rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl";

  // The "Indicators" lead card uses the brand purple so it visually anchors
  // the row.
  const headerCardCls = browse
    ? "p-5 bg-primary/30 border border-primary/40 rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl text-white"
    : "p-4 bg-primary/20 border-none rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl text-white";

  const fitCardCls = browse
    ? "p-5 w-full lg:w-fit bg-white/[0.04] border border-white/15 rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    : "p-4 w-full lg:w-fit bg-primary/20 border-none rounded-tr-none rounded-bl-none rounded-tl-3xl rounded-br-3xl";

  // Badge style: classic uses default Badge variant; browse uses a mono
  // uppercase pill in the brand purple so the label pops on the card.
  const badgeCls = browse
    ? "text-[10px] mb-2 font-mono uppercase tracking-widest bg-primary/30 border border-primary/50 text-white hover:bg-primary/30"
    : "text-sm mb-2";

  const numberCls = browse
    ? "text-4xl font-extrabold tracking-tight text-white"
    : "text-4xl font-semibold text-white";

  return (
    <section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 flex-wrap">
      <Card className={headerCardCls}>
        <div className="flex flex-col justify-center gap-2">
          <div>
            <p className={browse ? "font-mono text-[10px] uppercase tracking-widest opacity-55" : "font-light text-muted-foreground text-white"}>
              Indicators
            </p>
            <h1 className={browse ? "text-3xl font-extrabold tracking-tight" : "text-3xl font-bold"}>{qYear}</h1>
          </div>

          <p className="text-sm">Compared to the previous year</p>
        </div>
      </Card>

      <Card className={cardCls}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <div className="flex">
            <Badge variant={"default"} className={badgeCls}>
              AVG. SALARY
            </Badge>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="relative -top-1 text-xs leading-none ">
                    <InfoIcon size={13} color="white" />
                  </TooltipTrigger>
                  <TooltipContent align="center" className="max-w-60">
                    <p>
                      The average salary is calculated as the ratio of a
                      company&apos;s personnel expenses to the number of
                      employees.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className={numberCls}>
              {formatHuf(
                aggregationsSalary._sum.personalexpenses! /
                  aggregationsSalary._sum.person!
              )}
            </h2>
            {!avgSalaryChange || Number.isNaN(avgSalaryChange) ? (
              <Minus color="white" />
            ) : avgSalaryChange > 0 ? (
              <ArrowUp color="white" />
            ) : (
              <ArrowDown color="white" />
            )}
            <span
              className={
                !avgSalaryChange || Number.isNaN(avgSalaryChange)
                  ? "invisible"
                  : avgSalaryChange > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {avgSalaryChange.toFixed(2) + "%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-white">
            Avg. Yearly salary per employee
          </p>
        </div>
      </Card>
      <Card className={fitCardCls}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <div className="flex">
            <Badge variant={"default"} className={badgeCls}>
              EMPLOYEES
            </Badge>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="relative -top-1 text-xs leading-none">
                    <InfoIcon size={13} color="white" />
                  </TooltipTrigger>
                  <TooltipContent align="center" className="max-w-60">
                    <p>Total number of employees by listed startups.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className={numberCls}>
              {aggregations._sum.person!}
            </h2>
            {!employeeChange ||
            Number.isNaN(employeeChange) ||
            employeeChange === Infinity ? (
              <Minus color="white" />
            ) : employeeChange > 0 ? (
              <ArrowUp color="white" />
            ) : (
              <ArrowDown color="white" />
            )}
            <span
              className={
                !employeeChange ||
                Number.isNaN(employeeChange) ||
                employeeChange === Infinity
                  ? "invisible"
                  : employeeChange > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {employeeChange.toFixed(2) + "%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-white">
            All employees
          </p>
        </div>
      </Card>
      <Card className={cardCls}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <div className="flex">
            <Badge variant={"default"} className={badgeCls}>
              TAXES PAID
            </Badge>
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="relative -top-1 text-xs leading-none">
                    <InfoIcon size={13} color="white" />
                  </TooltipTrigger>
                  <TooltipContent align="center" className="max-w-60">
                    <p>
                      The total value of corporate taxes paid by the listed
                      startups.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className={numberCls}>
              {formatHuf(aggregations._sum.tax!)}
            </h2>
            {!taxChange || Number.isNaN(taxChange) || taxChange === Infinity ? (
              <Minus color="white" />
            ) : taxChange > 0 ? (
              <ArrowUp color="white" />
            ) : (
              <ArrowDown color="white" />
            )}
            <span
              className={
                !taxChange || Number.isNaN(taxChange) || taxChange === Infinity
                  ? "invisible"
                  : taxChange > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {taxChange.toFixed(2) + "%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-white">
            Total Corporate income tax paid{" "}
          </p>
        </div>
      </Card>
    </section>
  );
}
