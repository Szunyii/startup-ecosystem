import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type StartupDataType = {
  companyLogo: string;
  companyName: string;
  stage: string[];
  type: string[];
  link: string;
};

export function formatHuf(sum: number) {
  return sum.toLocaleString("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  });
}

export function formatNumber(numb: number) {
  return numb.toLocaleString("hu-HU", {});
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
};

export const startupsData: StartupType[] = [
  {
    id: "1",
    name: "Asura Technologies",
    taxes: 200916000,
    taxesYoY: 284.12,
    salary: 1209642000,
    salaryYoY: 128.2,
    employee: 88,
    employeeYoY: 81.8,
  },
  {
    id: "2",
    name: "Colossyan",
    taxes: 4556000,
    taxesYoY: 888.3,
    salary: 37903300,
    salaryYoY: 116.2,
    employee: 18,
    employeeYoY: 63.6,
  },
  {
    id: "3",
    name: "Turbine AI",
    taxes: 6698000,
    taxesYoY: -86.7,
    salary: 1104205000,
    salaryYoY: 34.51,
    employee: 52,
    employeeYoY: -5.5,
  },
  {
    id: "4",
    name: "Munch",
    taxes: 153000,
    taxesYoY: -99.1,
    salary: 70566000,
    salaryYoY: 62.2,
    employee: 34,
    employeeYoY: 61.9,
  },
  {
    id: "5",
    name: "Deligo Vision Technologies",
    taxes: 282000,
    taxesYoY: 28.8,
    salary: 153783000,
    salaryYoY: 105.3,
    employee: 8,
    employeeYoY: 66.1,
  },
  {
    id: "6",
    name: "Taxually",
    taxes: 23217000,
    taxesYoY: -85.6,
    salary: 1255539000,
    salaryYoY: 49.1,
    employee: 91,
    employeeYoY: 93.3,
  },
  {
    id: "7",
    name: "BLOCK",
    taxes: 678000,
    taxesYoY: 6.2,
    salary: 14034000,
    salaryYoY: 89,
    employee: 2,
    employeeYoY: 100,
  },
  {
    id: "8",
    name: "Barion",
    taxes: 47284000,
    taxesYoY: 83.9,
    salary: 676957000,
    salaryYoY: 58.4,
    employee: 33,
    employeeYoY: 8,
  },
  {
    id: "9",
    name: "ViveLab Ergo",
    taxes: 1817000,
    taxesYoY: 90.1,
    salary: 21620000,
    salaryYoY: 102.5,
    employee: 4,
    employeeYoY: 0,
  },
  {
    id: "10",
    name: "Giggle Work",
    taxes: 5586000,
    taxesYoY: 1347.2,
    salary: 63332000,
    salaryYoY: 304.9,
    employee: 7,
    employeeYoY: 57.1,
  },
];

export const cardData = [
  {
    label: "AVG. SALARY",
    amount: 350000,
    discription: "Avg. salary before taxes",
    // icon: DollarSign,
  },
  {
    label: "EMPLOYEES",
    amount: 1000,
    discription: "Avg. salary before taxes",
    // icon: DollarSign,
  },
  {
    label: "TAXES PAID",
    amount: 400000000,
    discription: "Avg. salary before taxes",
    // icon: DollarSign,
  },
];
