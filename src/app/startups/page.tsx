import React from "react";

import { Separator } from "@/components/ui/separator";

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
		<div>
			<div className="my-4 mx-2 flex items-center gap-4 mt-8 justify-between flex-row">
				<div className="flex gap-4 flex-wrap">
					<h1 className=" text-4xl font-bold">Startup Database</h1>
					<YearSelector />
				</div>

				<Faq>
					<AccordionDatabase />
				</Faq>
			</div>
			<Separator />
			<section className="flex flex-col md:flex-row w-full gap-2 gap-x-4 transition-all my-4 ">
				<div className="px-4 flex lg:w-1/4 mr-3">
					<div className="flex flex-col justify-center gap-2">
						<div>
							<p className="font-light text-muted-foreground">Indicators</p>
							<h1 className="text-4xl font-bold">{q}</h1>
						</div>

						<p className="text-sm">Compared to the previous year</p>
					</div>
					<Separator className="ml-4" orientation="vertical" />
				</div>
				<CardSection qYear={q} />
			</section>
			<Separator />
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
