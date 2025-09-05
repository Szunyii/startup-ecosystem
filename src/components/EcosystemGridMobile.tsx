"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn, StartupDataType } from "@/lib/utils";
import StatupCard from "./StatupCard";
import Faq from "@/app/startups/Faq";
import AccordionEcosystem from "@/app/ecosystem/AccordionEcosystwm";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const stageCategory = ["Pre-Startup", "Startup", "Scale-up"];
const typeCategory = [
	"Governmental support",
	"Acccelerators/Incubators",
	"Local investors",
	"HUBs",
	"Supporting Organizations",
	"Foreign Investors",
	"Crowdfunding",
];

function EcosístemGridMobile(data: { startups: StartupDataType[] }) {
	const [selectedType, setSelectedType] = useState<string>(
		"Governmental support"
	);
	const [selectedStage, setSelectedStage] = useState<string>("Pre-Startup");

	const filteredEntity = data.startups.filter(
		(el) => el.stage.includes(selectedStage) && el.type.includes(selectedType)
	);

	return (
		<section className="">
			{/* header */}
			<div className="mb-3 self-end flex w-full justify-end">
				<Faq>
					<AccordionEcosystem />
				</Faq>
			</div>
			<div className="flex gap-2 my-2 w-full">
				<div className="w-full">
					<p>Stage</p>
					<Select
						onValueChange={(value: string) => setSelectedStage(value)}
						value={selectedStage}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Stage" className="truncate" />
						</SelectTrigger>
						<SelectContent>
							{stageCategory.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className="w-full">
					<p>Type</p>
					<Select
						onValueChange={(value: string) => setSelectedType(value)}
						value={selectedType}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Type" className="truncate" />
						</SelectTrigger>
						<SelectContent>
							{typeCategory.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* szereplők grid */}
			<div className="flex-1">
				<div className="grid grid-cols-1 gap-3 justify-start items-start transition-all transitionduration-300">
					{filteredEntity.map((startup, i) => (
						<StatupCard key={i} {...startup} />
					))}
				</div>
			</div>
		</section>
	);
}

export default EcosístemGridMobile;
