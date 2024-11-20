"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { StartupDataType } from "@/lib/utils";

function StatupCard({ companyLogo, site }: StartupDataType) {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <Link
      onMouseEnter={() => setExpand(true)}
      onMouseLeave={() => setExpand(false)}
      href={`startup/${site}`}
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
          <Card className="z-50 absolute top-[50%] left-[50%] h-[360px] w-[300px] flex flex-col justify-center gap-4 items-center -translate-x-1/2 -translate-y-1/2">
            <Image
              className="mt-4"
              src={`/${companyLogo}.png`}
              width={120}
              height={130}
              alt={""}
            />
            <CardContent className="flex flex-col justify-center items-center">
              <Button className="mt-3 bg-primary/60">Visit</Button>
            </CardContent>
          </Card>
        )}
      </Card>
    </Link>
  );
}

export default StatupCard;
