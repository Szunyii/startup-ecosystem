import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    id: "1a2b3c4d",
    name: "Company A",
    taxes: 4500,
    taxesYoY: -10,
    salary: 1050000,
    salaryYoY: 14,
    employee: 3200,
    employeeYoY: 3,
  },
  {
    id: "2b3c4d5e",
    name: "Company B",
    taxes: 4800,
    taxesYoY: 15,
    salary: 980000,
    salaryYoY: 12,
    employee: 290,
    employeeYoY: 4,
  },
  {
    id: "3c4d5e6f",
    name: "Company C",
    taxes: 4200,
    taxesYoY: 9,
    salary: 1100000,
    salaryYoY: 16,
    employee: 310,
    employeeYoY: 2,
  },
  {
    id: "4d5e6f7g",
    name: "Company D",
    taxes: 5000,
    taxesYoY: 13,
    salary: 1200000,
    salaryYoY: 18,
    employee: 350,
    employeeYoY: 5,
  },
  {
    id: "5e6f7g8h",
    name: "Company E",
    taxes: 4700,
    taxesYoY: 8,
    salary: 1025000,
    salaryYoY: 11,
    employee: 330,
    employeeYoY: 3,
  },
  {
    id: "6f7g8h9i",
    name: "Company F",
    taxes: 4300,
    taxesYoY: 14,
    salary: 990000,
    salaryYoY: 13,
    employee: 300,
    employeeYoY: 1,
  },
  {
    id: "7g8h9i0j",
    name: "Company G",
    taxes: 4600,
    taxesYoY: 11,
    salary: 1080000,
    salaryYoY: 17,
    employee: 340,
    employeeYoY: 4,
  },
  {
    id: "8h9i0j1k",
    name: "Company H",
    taxes: 5200,
    taxesYoY: 16,
    salary: 1150000,
    salaryYoY: 19,
    employee: 360,
    employeeYoY: 5,
  },
  {
    id: "9i0j1k2l",
    name: "Company I",
    taxes: 4000,
    taxesYoY: 12,
    salary: 1001100,
    salaryYoY: 15,
    employee: 300,
    employeeYoY: 2,
  },
  {
    id: "0j1k2l3m",
    name: "Company J",
    taxes: 4900,
    taxesYoY: 14,
    salary: 970000,
    salaryYoY: 10,
    employee: 280,
    employeeYoY: 3,
  },
  {
    id: "1k2l3m4n",
    name: "Company K",
    taxes: 5100,
    taxesYoY: 15,
    salary: 1070000,
    salaryYoY: 14,
    employee: 310,
    employeeYoY: 2,
  },
  {
    id: "2l3m4n5o",
    name: "Company L",
    taxes: 4500,
    taxesYoY: 10,
    salary: 950000,
    salaryYoY: 12,
    employee: 270,
    employeeYoY: 1,
  },
  {
    id: "3m4n5o6p",
    name: "Company M",
    taxes: 4700,
    taxesYoY: 9,
    salary: 1005000,
    salaryYoY: 13,
    employee: 290,
    employeeYoY: 2,
  },
  {
    id: "4n5o6p7q",
    name: "Company N",
    taxes: 4300,
    taxesYoY: 11,
    salary: 1050000,
    salaryYoY: 15,
    employee: 320,
    employeeYoY: 3,
  },
  {
    id: "5o6p7q8r",
    name: "Company O",
    taxes: 4900,
    taxesYoY: 13,
    salary: 980000,
    salaryYoY: 10,
    employee: 300,
    employeeYoY: 4,
  },
  {
    id: "6p7q8r9s",
    name: "Company P",
    taxes: 4100,
    taxesYoY: 12,
    salary: 1000000,
    salaryYoY: 14,
    employee: 290,
    employeeYoY: 2,
  },
  {
    id: "7q8r9s0t",
    name: "Company Q",
    taxes: 4600,
    taxesYoY: 10,
    salary: 990000,
    salaryYoY: 12,
    employee: 310,
    employeeYoY: 3,
  },
  {
    id: "8r9s0t1u",
    name: "Company R",
    taxes: 4800,
    taxesYoY: 15,
    salary: 1085000,
    salaryYoY: 16,
    employee: 340,
    employeeYoY: 4,
  },
  {
    id: "9s0t1u2v",
    name: "Company S",
    taxes: 5200,
    taxesYoY: 14,
    salary: 1200000,
    salaryYoY: 18,
    employee: 350,
    employeeYoY: 5,
  },
  {
    id: "0t1u2v3w",
    name: "Company T",
    taxes: 5000,
    taxesYoY: 11,
    salary: 970000,
    salaryYoY: 12,
    employee: 280,
    employeeYoY: 2,
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
