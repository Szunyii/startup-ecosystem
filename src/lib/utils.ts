import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { prisma } from "./db/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//sss

export type startupDataPayload = Prisma.CompanysGetPayload<{
  select: {
    companyName: true;
    income_2023: true;
    income_2024: true;
    id: true;
    income_YoY: true;
    person_2023: true;
    person_2024: true;
    person_YoY: true;
    salary_2023: true;
    salary_2024: true;
    salary_YoY: true;
    tax_2023: true;
    taxNumber: true;
    tax_2024: true;
    tax_YoY: true;
  };
}>;

export type StartupDataType = {
  companyLogo: string;
  companyName: string;
  stage: string[];
  type: string[];
  link: string;
};

export function formatHuf(num: number) {
  if (num > 0) {
    return (
      num.toLocaleString("hu-HU", {
        maximumFractionDigits: 0,
      }) + " eFt"
    );
  } else {
    return "-";
  }
}

export function formatPerc(num: number) {
  if (num === 0 || num === null || NaN) {
    return "-";
  } else {
    return num + " %";
  }
}

// test
export type StartupType = {
  id: string;
  name: string;
  taxes: number;
  taxesYoY: number;
  salary: number;
  salaryYoY: number;
  employee: number;
  employeeYoY: number;
  year?: number;
};

//
//     id: "10",
//     name: "Giggle Work",
//     taxes: 5586000,
//     taxesYoY: 1347.2,
//     salary: 63332000,
//     salaryYoY: 304.9,
//     employee: 7,
//     employeeYoY: 57.1,
//     year: 2023,
//   },
// ];

// -- Salary
export const getAvgSalary = () => {};
// --- tax
export const getSummTax = async (year: number) => {
  const taxes = await prisma.operatingResult.aggregate({
    _sum: {
      value: true,
    },
    where: {
      balanceSheet: "Adófizetési kötelezettség",
      year: year,
    },
  });

  return taxes._sum.value;
};

// export const getTaxYoY = async (year: number) => {
//   const taxes = await prisma.operatingResult.aggregate({
//     _sum: {
//       value: true,
//     },
//     where: {
//       balanceSheet: "Adófizetési kötelezettség",
//       year: year,
//     },
//   });
//   const preTaxes = await prisma.operatingResult.aggregate({
//     _sum: {
//       value: true,
//     },
//     where: {
//       balanceSheet: "Adófizetési kötelezettség",
//       year: year - 1,
//     },
//   });
// };
// ----
