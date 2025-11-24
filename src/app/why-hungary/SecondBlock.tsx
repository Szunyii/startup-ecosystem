import { CardContent } from "@/components/PageCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

function SecondBlock() {
  return (
    <div className="w-full ">
      <Card className="bg-[#12093780]/25 text-white border-none mt-4 h-[800px] rounded-3xl border border-[#111111]/15 flex flex-col">
        <CardHeader>
          <h2 className="text-[24px]">
            2. Hungary&apos;s technological talent pool is highly competitive
          </h2>
          <CardContent className="border-none shadow-none flex flex-col md:flex-row mt-14">
            <div className="w-full flex-[55%] text-justify flex flex-col justify-start items-center font-[16px] mt-5">
              <ul className="list-disc ml-5 mt-16 space-y-8">
                <li>
                  <p>
                    The ratio of{" "}
                    <b>
                      ICT student entrants to bachelor programmes currently
                      stands at 12%{" "}
                    </b>
                    (increased from 4% in 2014).
                  </p>
                </li>
                <li>
                  The{" "}
                  <b>number of PhD students has increased by more than 50%</b>{" "}
                  in the last 10 years.
                </li>
                <li>
                  The <b>ratio of foreign PhD students</b> among total PhD
                  students is <b>29%</b> (up from 7% in 2014).
                </li>
              </ul>
              <br />
              <p>
                In addition to fostering technological expertise,{" "}
                <b>
                  Hungary places significant emphasis on developing
                  entrepreneurial talent.
                </b>{" "}
                Approximately <b>20,000 university students</b> have completed
                the countries flagship entrepreneurship program: the{" "}
                <b>Hungarian Startup University Program</b> (HSUP). To further
                encourage entrepreneurial initiatives, two newly established
                programs have been introduced: HSUP BASE, aimed at high school
                students, and Pathway to Business, designed specifically for PhD
                students.
              </p>
            </div>
            <div className="w-full flex flex-[45%] justify-center items-center">
              <Image src={"/icon/2.png"} width={800} height={600} alt="image" />
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

export default SecondBlock;
