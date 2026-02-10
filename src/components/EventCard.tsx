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
    <Link href={event_url} target="_blank">
      <Card className="relative h-full flex items-center justify-between rounded-xl  bg-primary/25 text-white border-none overflow-hidden max-h-[90px]">
        <div className="flex items-center pl-2">
          <div className="min-w-10 flex flex-col justify-center items-center ">
            <h2 className="text-xl">{eventDateMoth}</h2>
            <div className="flex gap-0">
              <h2 className="">{eventDateDay}</h2>
              <span>{eventDateDayEnd.length > 0 && "-"}</span>
              <h2 className="">{eventDateDayEnd}</h2>
            </div>
          </div>
          <div className="p-3 space-y-1">
            <div className="flex  gap-2">
              <p className="text-md truncate">{title}</p>
            </div>
            <p className="text-sm opacity-80">{location}</p>
          </div>
        </div>
        <Image
          src={`/flag/${eventFlag}.png`}
          alt="flag"
          width={100}
          height={100}
          className=" top-0 max-h-44 max-w-44  overflow-hidden"
        />
      </Card>
    </Link>
  );
}

export default EventCard;
