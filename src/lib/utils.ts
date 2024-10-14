import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export type StartupDataType = {
  companyName: string;
  companyLogo: string;
  stage: string[];
  type: string[];
  site: string;
  about: string;
  interest: string;
};
