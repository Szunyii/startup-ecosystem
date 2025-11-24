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
      className="transition-all hover:-translate-y-1 hover:z-50 overflow-hidden"
    >
      <Card className="h-44 rounded-3xl transition-all w-full flex flex-col justify-center items-center relative shadow-md group rounded-tr-none rounded-bl-none z-10 ">
        <Image
          className="mix-blend-multiply p-8 rounded-sm overflow-hidden z-20"
          src={`/${companyLogo}.png`}
          width={185}
          height={190}
          alt={""}
        />
        <p className="absolute bottom-1 justify-center content-center hidden group-hover:block px-2 font-sans text-muted-foreground animate-fadeInUp text-center">
          {companyName}
        </p>
      </Card>
    </a>
  );
}

export default StatupCard;
