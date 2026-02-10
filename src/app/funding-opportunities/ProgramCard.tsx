import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

interface ProgramProps {
  program: string;
  description: string;
  link: string;
}

function ProgramCard({ description, link, program }: ProgramProps) {
  return (
    <Card className="text-white border rounded-xl px-8 py-6 border-primary bg-transparent flex flex-col items-center h-full justify-between">
      <h2 className="font-bold text-2xl text-white mb-5 self-start">
        {program}
      </h2>
      <p className="text-white text-justify leading-relaxed whitespace-pre-line">
        {description}
      </p>
      <Link href={link} target="_blank" className="my-4">
        <Button className="text-[16px] border-primary border bg-transparent text-white">
          Go to website
        </Button>
      </Link>
    </Card>
  );
}

export default ProgramCard;
