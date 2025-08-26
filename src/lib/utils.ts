import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//sss

// export type startupDataPayload = Prisma.startup_dataGetPayload<{
//   select: {
//     tax_2022: true;
//     tax_2023: true;
//     tax_2024: true;
//     tax_yoy_2022: true;
//     tax_yoy_2023: true;
//     tax_yoy_2024: true;
//     personalexpenses_2022: true;
//     personalexpenses_2023: true;
//     personalexpenses_2024: true;
//     personalexpenses_yoy_2022: true;
//     personalexpenses_yoy_2023: true;
//     personalexpenses_yoy_2024: true;
//     person_2022: true;
//     person_2023: true;
//     person_2024: true;
//     personal_yoy_2022: true;
//     personal_yoy_2023: true;
//     personal_yoy_2024: true;
//     link: true;
//     startupname: true;
//   };
// }>;

export type startupDataPayload = Prisma.startup_data_finalGetPayload<{
  select: {
    // id: true;
    // taxnumber: true;
    // traderegnumber: true;
    // type: true;
    // // report: true;
    // status: true;
    // startup_id: true;
    tax: true;
    // netrevenue: true;
    person: true;
    personal_yoy: true;
    // netrevenue_yoy: true;
    tax_yoy: true;
    personalexpenses: true;
    personalexpenses_yoy: true;
    year: true;
    link: true;
    startupname: true;
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
  } else if (num === null) {
    return "n.a";
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

export function toPercent(value: number | null, fractionDigits = 2): string {
  if (value === null) {
    return "n.a";
  }
  if (isNaN(value)) {
    throw new Error("A megadott érték nem szám!");
  }
  return `${(value * 100).toFixed(fractionDigits)}%`;
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
// // --- tax
// export const getSummTax = async (year: number) => {
//   const taxes = await prisma.startup_data.aggregate({
//     _sum: {
//       netrevenue_2024: true,
//     },
//     where: {
//       balanceSheet: "Adófizetési kötelezettség",
//       year: year,
//     },
//   });

//   return taxes._sum.;
// };

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
