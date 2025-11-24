import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="min-h-screen py-6 text-white flex items-center flex-col">
      <h1 className="text-center text-2xl mb-5 text-[42px] mt-4">
        Innovation Ecosystem Strength in Hungary
      </h1>
      <h3 className="text-center">
        Over the past decade,{" "}
        <b>
          Hungary&apos;s startup ecosystem has shown sustained strength and
          international visibility across five key industries.
        </b>
        <br />
        Between 2015 and 2025: <b>€925M</b>
      </h3>
      <div className="grid grid-cols-2 grid-rows-3 w-full gap-8 mt-6">
        <Card className="bg-[#120937] text-white border-none ">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <Image
                src={"/icon/science.png"}
                alt="icon"
                width={35}
                height={35}
              />
              <div className="flex flex-col gap-0">
                <p className="text-2xl font-normal">Life Sciences</p>
                <p className="text-muted-foreground">
                  (pharma, biotech, medtech, healthtech)
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>
                Innovations in diagnostics, biotechnology, and digital health
                stand out regionally for their impact and scalability.
              </p>
              <p>
                <b> VC investments between 2015-2025:</b> <b>€112,1M</b>,
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <h2 className="font-bold text-lg mb-1">Top startups:</h2>
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://turbine.ai/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/Turbine AI.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Turbine AI
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://motorpharma.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/motorpharma.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Motorpharma
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://chemaxon.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/Chemaxon.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Chemaxon
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://www.vrgtherapeutics.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/VRG Therapeutics.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  VRG Therapeutics
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://www.synetiq.hu/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/Synetiq.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Synetiq
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://www.genomate.health/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/Genomate Health.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Genomate Health
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://www.entremo.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/Entremo.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Entremo
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group"
                href={"https://medinnoscan.com/en/home-2/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/1/MedinnoScan.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  MedinnoScan
                </p>
              </Link>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-[#120937] text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <Image src={"/icon/AI.png"} alt="icon" width={35} height={35} />
              <div className="flex flex-col gap-0">
                <p className="text-2xl font-normal">AI & Big Data</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>
                Enterprise software and data-driven technologies have long been
                cornerstones of the Hungarian ecosystem. After 2021, AI-based
                corporate solutions such as fraud detection, predictive
                modeling, and data security gained particular momentum.
              </p>
              <p>
                <b> VC investments between 2015-2025:</b> <b>€236,4M</b>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <h2 className="font-bold text-lg mb-1">Top startups:</h2>
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://commsignia.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/2/commisignia.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Commsignia
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://www.colossyan.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/2/colossyan.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Colossyan
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://datapao.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/2/datapao.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Datapao
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://www.shapr3d.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/2/Shapr3D.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Sharpr3D
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://aimotive.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/2/aiMotive_logo.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  AImotive
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://neuronsolutions.hu/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/2/neuron solutions.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Neuron Solutions
                </p>
              </Link>
            </div>
          </CardFooter>
        </Card>
        {/* fintech */}
        <Card className="bg-[#120937] text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <Image src={"/icon/tech.png"} alt="icon" width={35} height={35} />
              <div className="flex flex-col gap-0">
                <p className="text-2xl font-normal">Fintech & Cybersecurity</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>
                From 2021 to 2025, these two sectors clearly dominated
                Hungary&apos;s funding landscape.
              </p>
              <b> VC investments between 2015-2025: €218,2M</b>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start wf">
            <h2 className="font-bold text-lg mb-1">Top startups:</h2>
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://seon.io/command-center/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/3/seon 2.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">Seon</p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://tresorit.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/3/tresorit.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Tresorit
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://www.barion.com/hu/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/3/barion 2.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Barion
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://pentech.hu/hu/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/3/pentech_logo.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Péntech
                </p>
              </Link>
            </div>
          </CardFooter>
        </Card>
        {/* enterprise */}
        <Card className="bg-[#120937] text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <Image
                src={"/icon/science.png"}
                alt="icon"
                width={35}
                height={35}
              />
              <div className="flex flex-col gap-0">
                <p className="text-2xl font-normal">Enterprise Software</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>
                Hungarian B2B software development remained one of the most
                attractive investment areas throughout the decade. This sector
                forms the country’s core technological export base.
              </p>
              <p>
                <b> VC investments between 2015-2025:</b> <b>€201,5M</b>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start">
            <h2 className="font-bold text-lg mb-1">Top startups:</h2>
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://bitrise.io/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/4/bitrise.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Bitrise
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://www.craft.do/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/4/craft docs.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Craft docs
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://elements.envato.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/4/anvato.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Anvato
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://recart.com/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/4/recart.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Recart
                </p>
              </Link>
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-[#120937] text-white border-none">
          <CardHeader>
            <div className="flex items-center gap-x-3">
              <Image
                src={"/icon/transport.png"}
                alt="icon"
                width={35}
                height={35}
              />
              <div className="flex flex-col gap-0">
                <p className="text-2xl font-normal">
                  Transportation & Mobility
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <p>
                The 2018–2019 period marked a boom for Hungarian mobility and
                smart-transport solutions. Sustainable mobility and
                sharing-economy innovations continue to position Hungary among
                the regional leaders.
              </p>
              <p>
                <b> VC investments between 2015-2025:</b> <b>€156,8M</b>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col justify-start items-start w-full">
            <h2 className="font-bold text-lg mb-1">Top startups:</h2>
            <div className="grid grid-cols-4 gap-3 w-full">
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={
                  "https://greengo.com/hu/?gad_source=1&gad_campaignid=16721050950&gbraid=0AAAAADFV_XoT9aHE5rSVico8sWI78fB-4&gclid=CjwKCAiAz_DIBhBJEiwAVH2XwDTbVS4Yjj03KRJAgPsAcrE_KHtn9IqISfSRGn38Qn9bQTK_4YWqvhoCvrEQAvD_BwE"
                }
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/5/greengo.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  GreenGo
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://www.volteum.io/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  className="rounded"
                  src={"/logo/5/volteum.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Volteum
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://route4u.org/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/5/route4u.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  Route4U
                </p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"https://parkl.net/hu/"}
                target="_blank"
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/5/parkl.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">Parkl</p>
              </Link>
              <Link
                className="flex flex-col justify-center items-center group rounded"
                href={"#"}
              >
                <Image
                  width={40}
                  height={40}
                  src={"/logo/5/beerides.png"}
                  alt="logo"
                />
                <p className="font-thin text-sm group-hover:underline">
                  BeeRides
                </p>
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default page;
