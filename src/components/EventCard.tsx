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
  location,
  event_end_date,
}: {
  title: string;
  event_date: string;
  event_url: string;
  eventFlag: string;
  category: string;
  location: string;
  event_end_date?: string;
}) {
  const dateObj = new Date(event_date);
  const dateObjEnd =
    event_end_date && new Date(event_end_date) ? new Date(event_end_date) : "";
  const eventDateMoth = dateObj.toLocaleString("en-En", { month: "short" });
  const eventDateDay = dateObj.toLocaleString("en-En", { day: "numeric" });
  const eventDateDayEnd = dateObjEnd.toLocaleString("en-En", {
    day: "numeric",
  });

  return (
    <Link href={event_url} target="_blank" className="w-full">
      <Card className="relative h-full flex items-center justify-between rounded-xl bg-primary/25 text-white border-none overflow-hidden min-h-[90px]">
        <div className="flex items-center pl-2 w-full">
          <div className="min-w-[40px] flex flex-col justify-center items-center flex-shrink-0">
            <h2 className="text-lg md:text-xl font-bold">{eventDateMoth}</h2>
            <div className="flex gap-0 text-sm md:text-base">
              <h2 className="">{eventDateDay}</h2>
              <span>{eventDateDayEnd.length > 0 && "-"}</span>
              <h2 className="">{eventDateDayEnd}</h2>
            </div>
          </div>
          <div className="p-3 space-y-1 flex-1 min-w-0">
            <div className="flex gap-2">
              <p className="text-sm md:text-md truncate font-medium">{title}</p>
            </div>
            <p className="text-xs md:text-sm opacity-80 truncate">{location}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={`/flag/${eventFlag}.png`}
            alt="flag"
            width={100}
            height={100}
            className="object-cover h-[90px] w-auto max-w-[80px] md:max-w-[100px]"
          />
        </div>
      </Card>
    </Link>
  );
}

export default EventCard;
