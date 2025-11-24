import { CardContent } from "@/components/PageCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

function FirstBlock() {
  return (
    <div className="w-full ">
      <Card className="bg-[#12093780]/25 text-white border-none mt-4 h-[800px] rounded-3xl border border-[#111111]/15 flex flex-col">
        <CardHeader>
          <h2 className="text-[24px]">
            1. Hungary&apos;s business environment is among the best globally
          </h2>
          <CardContent className="border-none shadow-none flex flex-col md:flex-row mt-20">
            <div className="w-full flex-[55%] text-justify flex flex-col font-[16px] flex-wrap mt-4">
              <p>
                According to the 2024 Business Ready report published by the
                World Bank Group,{" "}
                <b>
                  Hungary&apos;s business environment ranks among the best in
                  the world.
                </b>{" "}
                Hungary is positioned in the top quintile of the 50 economies
                examined, demonstrating high performance in both the regulatory
                framework and public services.
              </p>
              <br />
              <b>
                Hungary provides hugely favorable conditions for businesses,
                especially for research-intensive companies
              </b>

              <ul className="list-disc ml-5 mt-3">
                <li>
                  <p>
                    {" "}
                    It boasts the lowest corporate tax rate within the European
                    Union, set at <b>9%.</b>
                  </p>
                </li>
                <li>
                  Furthermore,<b> Hungary provides various tax incentives</b>
                  for conducting research and development (R&D) activities.
                </li>
                <li>
                  Hungary also provides{" "}
                  <b>
                    {" "}
                    cash grants for corporates who bring R&D activities and
                    investments to Hungary
                  </b>
                  .
                </li>
              </ul>
              <br />
              <p>
                <b>
                  In recent years, a number of new regulations have
                  significantly enhanced the startup ecosystem. Key developments
                  include the introduction of:
                </b>
              </p>
              <ul className="list-disc ml-5 mt-3 ">
                <li>
                  <p>
                    <b>Convertible note</b> regulation (since 2023)
                  </p>
                </li>
                <li>
                  One of Europe&apos;s most favourable <b>ESOP regulation </b>
                  (since 2024)
                </li>
                <li>
                  {" "}
                  <b>Tax-free IP apport</b> to businesses (since 2025)
                </li>
              </ul>
            </div>
            <div className="w-full flex flex-[45%] justify-center items-center">
              <Image src={"/icon/1.png"} width={800} height={600} alt="image" />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="text-muted-foreground justify-end">
          Source: World Bank
        </CardFooter>
      </Card>
    </div>
  );
}

export default FirstBlock;
