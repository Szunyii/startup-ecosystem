import React from "react";

import StartupDataTable, { columns } from "@/components/StartupDataTable";
import { prisma } from "@/lib/db/prisma";
import CardSection from "@/components/CardSection";

import Faq from "./Faq";
import YearSelector from "@/components/YearSelector";
import AccordionDatabase from "./AccordionDatabe";
import StartupDataTableMobile from "@/components/StartupDataTableMobile";
// import StartupDataTablesecond from "@/components/StartupDataTablesecond";
// import { prisma } from "@/lib/db/prisma";

async function StartupPage(props: {
  searchParams: Promise<{ year?: string }>;
}) {
  const searchParams = await props.searchParams;
  const q: number = parseInt(searchParams.year ?? "2024", 10);

  // console.log(q.year);
  // első megoldás
  // const datas = await prisma.startup_data.findMany({});
  // második megoldás
  const datas = await prisma.startup_data_final.findMany({
    where: { year: q, report: "valid", status: "active" },
    orderBy: { person: "desc" },
  });

  const count = await prisma.startup_data_final.count({
    where: { AND: [{ year: q }], status: "active" },
  });

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute  left-0 top-1/4 z-0 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute  -right-0 top-2/4 z-0 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute  right-0 top-1 z-0 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          className="relative aspect-square  w-[26.125rem]  rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
        />
      </div>

      <div className="my-4 mx-2 flex items-center gap-4 mt-8 justify-between flex-row ">
        <div className="flex gap-4 flex-col flex-wrap">
          <h1 className=" text-4xl font-bold text-white">Startup Database</h1>
          <YearSelector />
        </div>

        <Faq>
          <AccordionDatabase />
        </Faq>
      </div>

      <section className="flex flex-col md:flex-row w-full gap-x-4 transition-all my-4 text-white flex-grow">
        <CardSection qYear={q} />
      </section>

      {/* datatable */}
      <section className=" w-full py-10">
        <div className="lg:hidden block">
          <StartupDataTableMobile
            columns={columns}
            data={datas}
            count={count}
          />
        </div>
        <div className="lg:block hidden">
          <StartupDataTable columns={columns} data={datas} count={count} />
        </div>
      </section>
    </div>
  );
}

export default StartupPage;
