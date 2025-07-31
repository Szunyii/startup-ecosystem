import React from "react";

import { Separator } from "@/components/ui/separator";

import StartupDataTable, { columns } from "@/components/StartupDataTable";
import { prisma } from "@/lib/db/prisma";
import CardSection from "@/components/CardSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Faq from "./Faq";
// import { prisma } from "@/lib/db/prisma";

async function StartupPage() {
  const datas = await prisma.companys.findMany({
    where: {
      OR: [
        { tax_2024: { not: 0 } },
        { salary_2024: { not: 0 } },
        { person_2024: { not: 0 } },
      ],
    },
    orderBy: { companyName: "asc" },
  });

  // const startupNumber: number = await prisma.companys.count();

  // const opt = await prisma.operatingResult.findMany({
  //   where: { startupId: 98 },
  // });

  // // console.log(datas);
  // console.log(opt);
  return (
    <div>
      <div className="my-4 mx-2 flex items-center gap-4 mt-8 justify-between flex-row">
        <div className="flex gap-4">
          <h1 className=" text-4xl font-bold">Startup Database</h1>
          <Select defaultValue="2024">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"2024"}>2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Faq />
      </div>
      <Separator />
      <section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 ">
        <div className="px-4 flex w-1/4 mr-3">
          <div className="flex flex-col justify-center gap-2">
            <p className="font-light text-muted-foreground">Indicators</p>
            <h1 className="text-4xl font-bold">2024</h1>
            <p className="text-sm">Compared to the previous year</p>
          </div>
          <Separator className="ml-4" orientation="vertical" />
        </div>
        <CardSection />
      </section>
      <Separator />
      {/* datatable */}
      <section className=" w-full py-10">
        <StartupDataTable columns={columns} data={datas} />
      </section>
    </div>
  );
}

export default StartupPage;
