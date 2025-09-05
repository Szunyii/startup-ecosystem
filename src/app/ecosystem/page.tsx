import EcosystemGrid from "@/components/EcosystemGrid";
import React from "react";
import data from "@/data/startupdata.json";
import EcosístemGridMobile from "@/components/EcosystemGridMobile";

const StartupPages = async () => {
	return (
		<div className="mx-auto">
			<section className="p-10 hidden lg:block">
				<EcosystemGrid startups={data} />
			</section>
			<section className="lg:hidden mt-4">
				<EcosístemGridMobile startups={data} />
			</section>
		</div>
	);
};

export default StartupPages;
