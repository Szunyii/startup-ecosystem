"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

function EventCard({
  title,
  event_date,
  event_url,
  eventFlag,
  category,
}: {
  title: string;
  event_date: string;
  event_url: string;
  eventFlag: string;
  category: string;
}) {
  return (
    <Link href={event_url} target="_blank">
      <Card className="relative h-full flex flex-col rounded-md p-2 bg-primary/25 text-white border-none overflow-hidden max-h-[240px]">
        {/* KÉP fix méretben */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={`/event/${category}.png`}
            alt={title}
            fill
            className="object-contain"
          />
        </div>

        {/* SZÖVEG külön blokkban */}

        <div className="p-3 space-y-1">
          <div className="flex  gap-2">
            <p className="text-md truncate">{title}</p>
            <Image
              src={`/flag/${eventFlag}.png`}
              alt="flag"
              width={30}
              height={30}
              className="max-h-6 max-w-6 rounded-full overflow-hidden"
            />
          </div>
          <p className="text-sm opacity-80">{event_date}</p>
        </div>
      </Card>
    </Link>
  );
}

export default EventCard;
