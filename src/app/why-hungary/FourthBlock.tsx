import { CardContent } from "@/components/PageCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

function FourthBlock() {
  return (
    <div className="w-full ">
      <Card className="bg-[#12093780]/25 text-white border-none mt-4 h-[800px] rounded-3xl border border-[#111111]/15 flex flex-col">
        <CardHeader>
          <h2 className="text-[24px]">
            4. Constantly increasing investments is R&D
          </h2>
          <CardContent className="border-none shadow-none flex flex-col md:flex-row">
            <div className="w-full flex-[55%] text-justify flex flex-col justify-center items-center font-[16px]">
              <p className="self-start">
                There has been a{" "}
                <b>
                  consistent increase in public investment in Research and
                  development.
                </b>
              </p>
              <br />
              <p>
                Between the years 2000 and 2022, total{" "}
                <b>research and development expenditures have tripled</b> (in
                PPP USD).
              </p>
              <br />
              <p>
                Currently, the{" "}
                <b>Gross Domestic Expenditure on R&D stands at 1.4%,</b>
                with a target of reaching 3% by 2030.
              </p>
              <br />
            </div>
            <div className="w-full flex flex-[45%] justify-center items-center">
              <Image src={"/icon/4.png"} width={800} height={600} alt="image" />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="text-muted-foreground justify-end">
          Source: Eurostat
        </CardFooter>
      </Card>
    </div>
  );
}

export default FourthBlock;
