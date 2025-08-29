import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export type startupDataPayload = Prisma.startup_data_finalGetPayload<{
  select: {
    tax: true;
    person: true;
    personal_yoy: true;
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
