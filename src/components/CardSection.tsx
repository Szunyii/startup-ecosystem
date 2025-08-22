import { ArrowDown, ArrowUp, LucideIcon, Minus } from "lucide-react";
import React from "react";
// import { formatHuf } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { prisma } from "@/lib/db/prisma";
import { formatHuf } from "@/lib/utils";
import { nan } from "zod";
// import { prisma } from "@/lib/db/prisma";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default async function CardSection({ qYear }: { qYear: number }) {
  const safeYear = qYear < 2022 ? 2022 : qYear - 1;
  const aggregations = await prisma.startup_data_final.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: { year: qYear },
  });
  const aggregationsPrev = await prisma.startup_data_final.aggregate({
    _avg: { personalexpenses: true, tax: true, person: true },
    _sum: { personalexpenses: true, tax: true, person: true },
    where: { year: safeYear },
  });

  const avgSalaryChange =
    ((aggregations._sum.personalexpenses! / aggregations._sum.person! -
      aggregationsPrev._sum.personalexpenses! / aggregationsPrev._sum.person!) /
      (aggregationsPrev._sum.personalexpenses! /
        aggregationsPrev._sum.person!)) *
    100;

  const employeeChange =
    ((aggregations._sum.person! - aggregationsPrev._sum.person!) /
      aggregationsPrev._sum.person!) *
    100;

  const taxChange =
    ((aggregations._sum.tax! - aggregationsPrev._sum.tax!) /
      aggregationsPrev._sum.tax!) *
    100;

  return (
    <section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 ">
      <Card className="p-4 flex-1">
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            AVG. SALARY
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {formatHuf(
                aggregations._sum.personalexpenses! / aggregations._sum.person!
              )}
            </h2>
            {!avgSalaryChange || Number.isNaN(avgSalaryChange) ? (
              <Minus />
            ) : avgSalaryChange > 0 ? (
              <ArrowUp />
            ) : (
              <ArrowDown />
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
          <p className="text-xs text-muted-foreground">
            Avg. Salary per employee
          </p>
        </div>
      </Card>
      <Card className="p-4 ">
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            EMPLOYEES
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {aggregations._sum.person!}
            </h2>
            {!employeeChange ||
            Number.isNaN(employeeChange) ||
            employeeChange === Infinity ? (
              <Minus />
            ) : employeeChange > 0 ? (
              <ArrowUp />
            ) : (
              <ArrowDown />
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
          <p className="text-xs text-muted-foreground">All employees</p>
        </div>
      </Card>
      <Card className="p-4 flex-1">
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            TAXES PAID
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {formatHuf(aggregations._sum.tax!)}
            </h2>
            {!taxChange || Number.isNaN(taxChange) || taxChange === Infinity ? (
              <Minus />
            ) : taxChange > 0 ? (
              <ArrowUp />
            ) : (
              <ArrowDown />
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
          <p className="text-xs text-muted-foreground">
            Total Corporate income tax paid{" "}
          </p>
        </div>
      </Card>
    </section>
  );
}
