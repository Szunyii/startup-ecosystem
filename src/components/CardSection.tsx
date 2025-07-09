import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import React from "react";
import { formatHuf } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { prisma } from "@/lib/db/prisma";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
};

export default async function CardSection() {
  const avgSalary = await prisma.companys.aggregate({
    _avg: { salary_2024: true, salary_2023: true },
    where: { salary_2024: { gt: 0 } },
  });
  const allEmployees = await prisma.companys.aggregate({
    _sum: { person_2024: true, person_2023: true },
  });
  const totalTax = await prisma.companys.aggregate({
    _sum: { tax_2024: true, tax_2023: true },
  });

  return (
    <section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 ">
      <Card className="p-4 flex-1" key={"AvgSalary"}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            AVG. SALARY
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {formatHuf(avgSalary._avg.salary_2024!)}
            </h2>
            <ArrowUp />
            <span className="text-green-500">
              {(
                ((avgSalary._avg.salary_2024! - avgSalary._avg.salary_2023!) /
                  avgSalary._avg.salary_2023!) *
                100
              ).toFixed(2) + "%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Avg. total personal expenditure
          </p>
        </div>
      </Card>
      <Card className="p-4 " key={"AvgSalary"}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            EMPLOYEES
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {allEmployees._sum.person_2024!}
            </h2>
            <ArrowDown />
            <span className="text-red-500">
              {(
                ((allEmployees._sum.person_2024! -
                  allEmployees._sum.person_2023!) /
                  allEmployees._sum.person_2023!) *
                100
              ).toFixed(2) + "%"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">All employees</p>
        </div>
      </Card>
      <Card className="p-4 flex-1" key={"AvgSalary"}>
        <div className="flex justify-between gap-2">
          {/* label */}
          <Badge variant={"default"} className="text-sm mb-2">
            TAXES PAID
          </Badge>
        </div>
        <div className="flex flex-col gap-1 ">
          <div className="flex">
            <h2 className="text-4xl font-semibold">
              {formatHuf(totalTax._sum.tax_2024!)}
            </h2>
            <ArrowDown />
            <span className="text-red-500">
              {(
                ((totalTax._sum.tax_2024! - totalTax._sum.tax_2023!) /
                  totalTax._sum.tax_2023!) *
                100
              ).toFixed(2) + "%"}
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
