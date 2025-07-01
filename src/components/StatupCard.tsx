"use client";

import Image from "next/image";
import React from "react";
import { Card } from "./ui/card";
import { StartupDataType } from "@/lib/utils";

function StatupCard({ companyLogo, link, companyName }: StartupDataType) {
  return (
    <a
      href={`${link}`}
      target="_blank"
      className="transition-all hover:scale-110 hover:z-50"
    >
      <Card className="h-44 transition-all w-full flex flex-col justify-center items-center relative shadow-md group">
        <Image
          className="mix-blend-multiply p-8 rounded-sm overflow-hidden"
          src={`/${companyLogo}.png`}
          width={170}
          height={160}
          alt={""}
        />
        <p className="absolute bottom-1 justify-center content-center hidden group-hover:block px-2 font-sans text-muted-foreground animate-fadeInUp text-center">
          {companyName}
        </p>
        {/* {expand && (
          <Card className="z-50 absolute top-[50%] left-[50%] h-[280px] w-[270px] flex flex-col justify-center gap-4 items-center -translate-x-1/2 -translate-y-1/2 transition-all">
            <Image
              className="mt-4"
              src={`/${companyLogo}.png`}
              width={120}
              height={130}
              alt={""}
            />
            <CardContent className="flex flex-col justify-center items-center">
              <h2>{companyName}</h2>
            </CardContent>
          </Card>
        )} */}
      </Card>
    </a>
  );
}

export default StatupCard;
