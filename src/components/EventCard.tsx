import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "./ui/separator";

function EventCard({
  main_image_url,
  title,
  event_date,
  event_url,
}: {
  main_image_url: string | null;
  title: string;
  event_date: string;
  event_url: string;
}) {
  const fallbackImage = "/blank.png";
  return (
    <Link href={event_url}>
      <Card className="relative h-full flex flex-col rounded-md p-0 bg-primary/80 text-white border-none overflow-hidden">
        {/* KÉP fix méretben */}
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <Image
            src={main_image_url ?? fallbackImage}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        {/* SZÖVEG külön blokkban */}
        <Separator className="my-1" />
        <div className="p-3 space-y-1">
          <p className="text-md truncate">{title}</p>
          <p className="text-sm opacity-80">{event_date}</p>
        </div>
      </Card>
    </Link>
  );
}

export default EventCard;
