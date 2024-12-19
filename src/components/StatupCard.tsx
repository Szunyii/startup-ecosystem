"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { StartupDataType } from "@/lib/utils";

function StatupCard({ companyLogo, link, companyName }: StartupDataType) {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <a
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
      href={`${link}`}
      target="_blank"
      className="transition-all"
    >
      <Card className="h-44 transition-all w-full flex flex-col justify-center items-center relative">
        <Image
          className="mix-blend-multiply "
          src={`/${companyLogo}.png`}
          width={170}
          height={160}
          alt={""}
        />
        {expand && (
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
        )}
      </Card>
    </a>
  );
}

export default StatupCard;
