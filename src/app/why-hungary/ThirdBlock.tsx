import { CardContent } from "@/components/PageCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

function ThirdBlock() {
  return (
    <div className="w-full ">
      <Card className="bg-[#12093780]/15 text-white border-none mt-4 h-[800px] rounded-3xl border border-[#111111]/15 flex flex-col">
        <CardHeader>
          <h2 className="text-[24px]">
            3. Hungary&apos;s academic sector&apos;s strong scientific
            performance
          </h2>
          <CardContent className="border-none shadow-none flex flex-col md:flex-row">
            <div className="w-full flex-[45%] text-justify flex flex-col justify-center items-center font-[16px]">
              <p>
                The{" "}
                <b>
                  performance of Hungarian universities and research
                  institutions has demonstrated significant improvement
                </b>{" "}
                in recent years.
              </p>
              <br />
              <p>
                Over the past five years, these institutions have begun to
                ascend in global rankings, with{" "}
                <b>
                  12 universities now positioned among the top 5% worldwide.
                </b>
              </p>
              <br />
              <p>
                There is an{" "}
                <b>
                  increasing strategic emphasis on innovation within the
                  academic sector
                </b>
                - in 2024, the total research and development expenditure in
                Hungarian
                <b>
                  universities and research institutions reached 650 million
                  EUR.
                </b>
              </p>
              <br />
              <p>
                Recent initiatives related to technology transfer include the
                establishment of{" "}
                <b>
                  Technology Transfer Companies (TTCs), Science Parks, and Deep
                  Tech Venture Capital funds.
                </b>
              </p>
              <div className="flex flex-col gap-y-3 self-start mt-10">
                <div className="flex self-start gap-x-2 gap-y-0 items-center">
                  <Image
                    src={"/icon/research.png"}
                    width={40}
                    height={40}
                    alt="research"
                  />
                  <p className="text-lg">HUN-REN Research Centers</p>
                </div>
                <div className="flex self-start gap-2 items-center">
                  <Image
                    src={"/icon/infrastructures.png"}
                    width={40}
                    height={40}
                    alt="research"
                  />
                  <p className="text-lg">Key Research Infrastructures</p>
                </div>
                <div className="flex self-start gap-2  items-center">
                  <Image
                    src={"/icon/uni.png"}
                    width={40}
                    height={40}
                    alt="research"
                  />
                  <p className="text-lg">TOP 5% universites</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-[55%] justify-center items-center mt-3">
              <Image
                className="items-center justify-center"
                src={"/icon/3.png"}
                width={800}
                height={600}
                alt="image"
              />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="text-muted-foreground justify-end">
          Source: THE and QS rankings, Eurostat
        </CardFooter>
      </Card>
    </div>
  );
}

export default ThirdBlock;
