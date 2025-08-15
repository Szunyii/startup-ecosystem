"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter, useSearchParams } from "next/navigation";

function YearSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateSearchParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString()); // meglévők megtartása
    params.set(key, value); // új érték beállítása / felülírás

    router.push(`?${params.toString()}`); // új URL push
  }
  return (
    <div>
      <Select
        defaultValue="2024"
        onValueChange={(value) => updateSearchParam("year", value)}
      >
        <SelectTrigger className="w-[180px]">
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
