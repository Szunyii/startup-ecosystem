import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { formatHuf, formatNumber, cardData, startupsData } from "@/lib/utils";
import StartupDataTable, { columns } from "@/components/StartupDataTable";
import { ArrowUp } from "lucide-react";
// import { prisma } from "@/lib/db/prisma";

async function StartupPage() {
  // await prisma.company.create({
  //   data: {
  //     companyName: "page",
  //     employees: "100",
  //     growthStage: "startup",
  //     hqCountry: "hun",
  //     hqRegion: "hun",
  //     logo: "",
  //     profileUrl: "aa",
  //     taxNumber: "123w21e21",
  //     valuation: "sok",
  //     website: "dfafs",
  //     Industries: {
  //       createMany: { data: [{ industrie: "a" }, { industrie: "b" }] },
  //     },
  //   },
  // });
  return (
    <div>
      <div className="my-4 mx-2 ">
        <h1 className="mt-9 text-4xl font-bold">Startup Database</h1>
      </div>
      <Separator />
      <section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 ">
        <div className="p-4 flex">
          <div className="flex flex-col justify-center gap-2">
            <p className="font-light text-muted-foreground">Indicators</p>
            <h1 className="text-3xl font-bold">2024</h1>

            <p className="text-sm">Compared tot he previous quarter</p>
          </div>
          <Separator className="ml-4" orientation="vertical" />
        </div>

        {cardData.map((data) => (
          <Card className="p-4 flex-1" key={data.label}>
            <div className="flex justify-between gap-2">
              {/* label */}
              <Badge variant={"default"} className="text-sm mb-2">
                {data.label}
              </Badge>
            </div>
            <div className="flex flex-col gap-1 ">
              <div className="flex">
                <h2 className="text-3xl font-semibold">
                  {data.label !== "EMPLOYEES"
                    ? formatHuf(data.amount)
                    : formatNumber(data.amount)}
                </h2>
                <ArrowUp />
                <span className="text-green-500">5%</span>
              </div>

              <p className="text-xs text-muted-foreground">
                {data.discription}
              </p>
            </div>
          </Card>
        ))}
      </section>
      <Separator />
      {/* datatable */}
      <section className=" w-full py-10">
        <StartupDataTable columns={columns} data={startupsData} />
      </section>
    </div>
  );
}

export default StartupPage;
