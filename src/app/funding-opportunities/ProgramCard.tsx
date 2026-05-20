import Link from "next/link";
import React from "react";

interface ProgramProps {
  program: string;
  description: string;
  link: string;
}

function ProgramCard({ description, link, program }: ProgramProps) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-[14px] border border-white/[0.07] bg-white/[0.03] transition-all hover:bg-[rgba(122,95,255,0.12)] hover:border-[rgba(122,95,255,0.3)] hover:-translate-y-0.5">
      <h2 className="font-semibold text-[16px] tracking-tight text-white">
        {program}
      </h2>
      <p className="text-[13px] leading-relaxed text-white/75 whitespace-pre-line line-clamp-6">
        {description}
      </p>
      <Link
        href={link}
        target="_blank"
        rel="noreferrer"
        className="mt-auto self-start text-[#afe200] no-underline font-mono text-[11px] px-3 py-1.5 border border-[rgba(175,226,0,0.4)] rounded-full hover:bg-[rgba(175,226,0,0.08)]"
      >
        Visit website ↗
      </Link>
    </div>
  );
}

export default ProgramCard;
