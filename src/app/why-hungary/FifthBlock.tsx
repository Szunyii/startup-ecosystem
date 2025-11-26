import { CardContent } from "@/components/PageCard";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import Image from "next/image";

function FifthBlock() {
  return (
    <div className="w-full ">
      <Card className="bg-[#12093780]/15 text-white border-none mt-4 h-[800px] rounded-3xl border border-[#111111]/15 flex flex-col">
        <CardHeader>
          <h2 className="text-[24px] max-w-[65%]">
            5. Large multinational corporates play a decisive role in
            Hungary&apos;s innovation ecosystem bringing their R&D centers to
            Hungary
          </h2>
          <CardContent className="border-none shadow-none flex flex-col md:flex-row ">
            <div className="w-full flex-[55%] text-justify flex flex-col justify-center items-center font-[16px]">
              <p>
                Over the past 15 years,{" "}
                <b>
                  Central and Eastern Europe (CEE) has substantially enhanced
                  its economic significance{" "}
                </b>
                within the European Union. Situated at the heart of the CEE
                region,
                <b>
                  Hungary has emerged as a favoured destination for foreign
                  research and development investments,
                </b>{" "}
                as well as for multinational corporations.
              </p>
              <br />
              <p>
                <b>
                  Hungary&apos;s foreign direct investment (FDI) attractiveness
                  is ranked among the best globally, successfully attracting
                  research and development (R&D) centres in the automotive,
                  information technology, and healthcare sectors.
                </b>
              </p>
              <br />
              <p>
                Over the past decade, the{" "}
                <b>
                  number of R&D personnel has increased by more than 89,7%,
                  while the R&D expenditure of multinational corporations has
                  risen from €800 million to €2 billion.
                </b>
              </p>
            </div>
            <div className="w-full flex flex-[45%] justify-center items-center">
              <Image src={"/icon/5.png"} width={800} height={600} alt="image" />
            </div>
          </CardContent>
        </CardHeader>
        <CardFooter className="text-muted-foreground justify-end">
          Source: HIPA, Eurostat
        </CardFooter>
      </Card>
    </div>
  );
}

export default FifthBlock;
