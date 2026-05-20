"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

interface EventCardProps {
  title: string;
  event_date: string;
  event_url: string;
  eventFlag: string;
  category: string;
  location: string;
  event_end_date?: string;
}

export default function EventCard({
  title,
  event_date,
  event_url,
  eventFlag,
  location,
  event_end_date,
}: EventCardProps) {
  const dateObj = new Date(event_date);
  const dateObjEnd = event_end_date ? new Date(event_end_date) : null;
  const monthShort = dateObj.toLocaleString("en-EN", { month: "short" });
  const dayStart = dateObj.toLocaleString("en-EN", { day: "numeric" });
  const dayEnd = dateObjEnd?.toLocaleString("en-EN", { day: "numeric" });

  return (
    <motion.div variants={itemVariants} className="w-full h-full">
      <Link href={event_url} target="_blank" className="w-full h-full block">
        <article className="relative h-full flex items-stretch justify-between rounded-xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 text-white overflow-hidden min-h-[96px] hover:border-primary/40 hover:bg-white/[0.06] transition-colors">
          {/* Date badge */}
          <div className="flex flex-col justify-center items-center px-3 py-3 min-w-[60px] border-r border-white/[0.06] bg-primary/15">
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-70">
              {monthShort}
            </span>
            <span className="font-extrabold text-lg leading-none mt-0.5 tracking-tight">
              {dayStart}
              {dayEnd && (
                <>
                  <span className="opacity-40 mx-0.5">–</span>
                  {dayEnd}
                </>
              )}
            </span>
          </div>

          {/* Title + location */}
          <div className="flex-1 min-w-0 px-3 py-3 flex flex-col justify-center gap-1">
            <p className="text-sm font-semibold truncate">{title}</p>
            <p className="font-mono text-[11px] opacity-65 truncate">
              {location}
            </p>
          </div>

          {/* Country flag */}
          <div className="flex-shrink-0 self-stretch">
            <Image
              src={`/flag/${eventFlag}.png`}
              alt={eventFlag}
              width={100}
              height={100}
              className="object-cover h-full w-auto max-w-[72px] md:max-w-[88px] opacity-90"
            />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
