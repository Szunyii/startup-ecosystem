"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface YearSelectorProps {
  triggerClassName?: string;
}

function YearSelector({ triggerClassName }: YearSelectorProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("year") ?? "2024";

  function updateSearchParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    // Push to the full path + searchParams so the App Router definitely sees
    // it as a navigation, then refresh() forces server components (e.g. the
    // SectorBarChart's Prisma query) to re-run with the new searchParam.
    router.push(`${pathname}?${params.toString()}`);
    router.refresh();
  }
  return (
    <div>
      <Select
        defaultValue="2024"
        onValueChange={(value) => updateSearchParam("year", value)}
        value={search!}
      >
        <SelectTrigger className={triggerClassName ?? "w-[180px]"}>
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2024">2024</SelectItem>
          <SelectItem value="2023">2023</SelectItem>
          <SelectItem value="2022">2022</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default YearSelector;
