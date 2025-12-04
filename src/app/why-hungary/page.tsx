import React from "react";
import Image from "next/image";
import Leaf from "@/components/Leaf";
import { Card } from "@/components/ui/card";

function page() {
  return (
    <div className="min-h-screen text-white backdrop-blur-2xl">
      <div className=" p-3 mb-10 z-10">
        <h1 className="text-5xl font-bold mt-6 ml-4 z-50">Why Hungary?</h1>
      </div>

      <section className=" relative p-4 ">
        <Leaf className="-left-[68px] -top-6 opacity-10" />
        <Leaf className="size-28 opacity-25" />
        <Leaf className="left-[134px] opacity-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute  -right-[35%] z-0 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath: "circle(50% at 50% 50%)",
            }}
            className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
          />
        </div>
        <h2 className="text-[24px] text-center font-bold z-20">
          1. Hungary&apos;s business environment is among the best globally
        </h2>
        <div className="flex flex-col md:flex-row mt-16  max-w-full gap-6 justify-center items-center">
          <div className="w-full flex-[55%] text-justify flex flex-col font-[16px] flex-wrap mt-4 z-30">
            <p>
              According to the 2024 Business Ready report published by the World
              Bank Group,{" "}
              <b>
                Hungary&apos;s business environment ranks among the best in the
                world.
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
                In recent years, a number of new regulations have significantly
                enhanced the startup ecosystem. Key developments include the
                introduction of:
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
          <Card className="w-full flex flex-[45%] justify-center items-center border-primary/20 bg-[#12093733]/10 h-min z-30">
            <Image src={"/icon/1.png"} width={800} height={600} alt="image" />
          </Card>
        </div>
      </section>
      {/* section 2------------------ */}
      <section className=" relative p-4  mt-36">
        <Leaf className="-right-0 -top-[72px] opacity-10" />
        <Leaf className="size-28 opacity-25 -right-0" />
        <Leaf className="right-[122px] top-12 opacity-10" />

        <h2 className="text-[24px] text-center font-bold z-20">
          2. Hungary&apos;s technological talent pool is highly competitive
        </h2>
        <div className="flex flex-col md:flex-row mt-16  max-w-full gap-6 justify-center items-center">
          <Card className="w-full flex flex-[45%] justify-center items-center border-primary/20 bg-[#12093733]/10  h-min z-30">
            <Image src={"/icon/2.png"} width={600} height={500} alt="image" />
          </Card>
          <div className="w-full flex-[55%] text-justify flex flex-col font-[16px] flex-wrap z-30">
            <ul className="list-disc ml-5 space-y-8">
              <li>
                <p>
                  The ratio of{" "}
                  <b>
                    ICT student entrants to bachelor programmes currently stands
                    at 12%{" "}
                  </b>
                  (increased from 4% in 2014).
                </p>
              </li>
              <li>
                The <b>number of PhD students has increased by more than 50%</b>{" "}
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
              Approximately <b>20,000 university students</b> have completed the
              countries flagship entrepreneurship program: the{" "}
              <b>Hungarian Startup University Program</b> (HSUP). To further
              encourage entrepreneurial initiatives, two newly established
              programs have been introduced: HSUP BASE, aimed at high school
              students, and Pathway to Business, designed specifically for PhD
              students.
            </p>
          </div>
        </div>
      </section>
      {/* section 3--------------- */}
      <section className=" relative p-4 mt-32 mb-64">
        <Leaf className="-left-[72px] opacity-10" />
        <Leaf className="size-28 opacity-25" />
        <Leaf className="-top-[72px] opacity-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute  left-[30%] z-0 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath: "circle(50% at 50% 50%)",
            }}
            className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
          />
        </div>
        <h2 className="text-[24px] text-center font-bold z-20">
          3. Hungary&apos;s academic sector&apos;s strong scientific performance
        </h2>
        <div className="flex flex-col md:flex-row mt-16  max-w-full gap-6 justify-center items-center">
          <div className="w-full flex-[55%] text-justify flex flex-col font-[16px] flex-wrap mt-4 z-30">
            <p>
              The{" "}
              <b>
                performance of Hungarian universities and research institutions
                has demonstrated significant improvement
              </b>{" "}
              in recent years.
            </p>
            <br />
            <p>
              Over the past five years, these institutions have begun to ascend
              in global rankings, with{" "}
              <b>12 universities now positioned among the top 5% worldwide.</b>
            </p>
            <br />
            <p>
              There is an{" "}
              <b>
                increasing strategic emphasis on innovation within the academic
                sector
              </b>
              - in 2024, the total research and development expenditure in
              Hungarian
              <b>
                universities and research institutions reached 650 million EUR.
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
                  src={"/icon/science.png"}
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
          <Card className="w-full flex flex-[45%] justify-center items-center bg-inherit border-none h-min z-30">
            <Image src={"/icon/3.png"} width={800} height={600} alt="image" />
          </Card>
        </div>
      </section>
      {/* 4. section ----------- */}
      <section className=" relative p-4 mb-36">
        <Leaf className="-left-6 top-12 size-20 opacity-10" />
        <Leaf className="left-16 -top-12 size-44 opacity-25" />
        <Leaf className="left-[248px] -top-20 opacity-10" />
        {/* ---- */}
        <Leaf className="-right-6 bottom-28 size-20 opacity-10" />
        <Leaf className="right-16 size-44 opacity-25 bottom-0" />
        <Leaf className="right-[248px] opacity-10 bottom-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute  -right-[55%] -bottom-[60%] z-0 transform-gpu blur-3xl"
        >
          <div
            style={{
              clipPath: "circle(50% at 50% 50%)",
            }}
            className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
          />
        </div>
        <h2 className="text-[24px] text-center font-bold z-20">
          4. Constantly increasing investments is R&D
        </h2>
        <div className="flex flex-col md:flex-row mt-10  max-w-full gap-6 justify-center items-center">
          <Card className="w-full flex flex-[45%] justify-center items-center bg-inherit p-0 h-min z-30 py-12 border-none">
            <Image src={"/icon/4.png"} width={800} height={600} alt="image" />
          </Card>
          <div className="w-full flex-[55%] text-justify flex flex-col items-center font-[16px] flex-wrap mt-4 z-30">
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
              <b>research and development expenditures have tripled</b> (in PPP
              USD).
            </p>
            <br />
            <p>
              Currently, the{" "}
              <b>Gross Domestic Expenditure on R&D stands at 1.4%,</b>
              with a target of reaching 3% by 2030.
            </p>
            <br />
          </div>
        </div>
      </section>
      {/* 5. section---------------------- */}
      <section className=" relative p-4 mb-36">
        <Leaf className="-left-[68px] -top-6 opacity-10" />
        <Leaf className="size-28 opacity-25" />
        <Leaf className="left-[134px] opacity-10" />
        {/* ------- */}
        <Leaf className="bottom-8 -left-12 size-44 opacity-25" />
        <Leaf className="left-0 -bottom-20 -left-10 opacity-10 size-24" />
        <h2 className="text-[24px] text-center font-bold z-20">
          5. Large multinational corporates play a decisive role in
          Hungary&apos;s innovation ecosystem bringing their R&D centers to
          Hungary
        </h2>
        <div className="flex flex-col md:flex-row mt-16  max-w-full gap-6 justify-center items-center">
          <div className="w-full flex-[55%] text-justify flex flex-col font-[16px] flex-wrap mt-4 z-30">
            <p>
              Over the past 15 years,{" "}
              <b>
                Central and Eastern Europe (CEE) has substantially enhanced its
                economic significance{" "}
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
                Hungary&apos;s foreign direct investment (FDI) attractiveness is
                ranked among the best globally, successfully attracting research
                and development (R&D) centres in the automotive, information
                technology, and healthcare sectors.
              </b>
            </p>
            <br />
            <p>
              Over the past decade, the{" "}
              <b>
                number of R&D personnel has increased by more than 89,7%, while
                the R&D expenditure of multinational corporations has risen from
                €800 million to €2 billion.
              </b>
            </p>
          </div>
          <Card className="w-full flex flex-[45%] border-none justify-center items-center bg-inherit   h-min z-30">
            <Image src={"/icon/5.png"} width={800} height={600} alt="image" />
          </Card>
        </div>
      </section>
    </div>
  );
}

export default page;
