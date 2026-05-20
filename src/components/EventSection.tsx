"use client";
import { Calendar } from "./ui/calendar";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  format,
  isBefore,
  startOfDay,
  isWithinInterval,
  eachDayOfInterval,
} from "date-fns";
import eventsArray from "@/data/events.json";
import EventCard from "./EventCard";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import TypeSelect from "./TypeSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// const basicCategories = ["All", "Summit", "Forum", "Conference", "Other"];

function EventSection() {
  const [type, setType] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState<null | string>("All");
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventRef = useRef<HTMLDivElement | null>(null);

  const uniqueCountries = [
    ...new Set(eventsArray.map((e) => e.country)),
  ].sort();

  // const enabledDays = eventsArray.map((d) => new Date(d.event_date));
  const enabledDays = eventsArray.flatMap((event) => {
    const start = startOfDay(new Date(event.event_date));
    const end = event.event_end_date
      ? startOfDay(new Date(event.event_end_date))
      : start;

    return eachDayOfInterval({ start, end });
  });

  const today = startOfDay(new Date());

  // --TODO ref scolling
  // date param olvasása
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? startOfDay(new Date(dateParam)) : undefined;

  // Események szűrése:
  // - ha van selectedDate → csak az aznapi
  // - ha nincs → minden, ami ma vagy utánna van
  const filteredEvents = eventsArray
    .filter((event) => {
      const eventStart = startOfDay(new Date(event.event_date));
      const eventEnd = event.event_end_date
        ? startOfDay(new Date(event.event_end_date))
        : eventStart;

      if (selectedDate) {
        return isWithinInterval(selectedDate, {
          start: eventStart,
          end: eventEnd,
        });
      }

      return !isBefore(eventEnd, today);
    })
    .filter((event) => {
      if (type === "All") {
        return true;
      } else {
        return event.type.includes(type);
      }
    })
    .filter((event) => {
      if (selectedCountry === "All") {
        return true;
      } else {
        return event.country === selectedCountry;
      }
    })
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime(),
    );

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      router.push(`?date=${formattedDate}`, { scroll: false });
    }
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleTypeClick = (type: string) => {
    setType(type);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const triggerCls =
    "w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white outline-none focus:border-primary hover:bg-black/40 transition-colors";

  return (
    <div className="mx-2 md:mx-6 rounded-2xl border border-white/10 from-white/[0.06] to-white/[0.02] p-3 md:p-5 bg-none">
      <div className="w-full flex flex-col md:flex-row min-h-[500px] gap-4">
        {/* Filter sidebar */}
        <aside className="flex-shrink-0 w-full md:w-[280px] flex flex-col gap-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 text-white">
              Region
            </span>
            <div className="mt-2">
              <TypeSelect active={type} onClick={handleTypeClick} />
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 text-white">
              Country
            </span>
            <div className="mt-2">
              <Select onValueChange={setSelectedCountry} defaultValue={""}>
                <SelectTrigger className={triggerCls}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All country</SelectItem>
                  {uniqueCountries.map((event) => (
                    <SelectItem key={event} value={event}>
                      {event}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55 text-white">
              Date
            </span>
            <Calendar
              hideWeekdays
              mode="single"
              selected={selectedDate ?? today}
              onSelect={handleDateSelect}
              disabled={(day) => {
                const isEnabled = enabledDays.some((d) => isSameDay(d, day));
                return !isEnabled;
              }}
              className="mt-2 rounded-lg border border-white/10 bg-black/30 text-white w-full"
            />
          </div>

          {dateParam ? (
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                router.replace("/#event", { scroll: false });
              }}
            >
              See all events
            </Button>
          ) : null}
        </aside>

        {/* Event list — `type="always"` keeps the scrollbar visible so users
            can see at a glance that there's more content below. */}
        <ScrollArea
          type="always"
          className="h-[400px] md:h-[540px] w-full rounded-md pr-3"
        >
          <motion.div
            key={`${type}-${selectedCountry}-${dateParam || "all"}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            ref={eventRef}
            id="event"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.title}
                  event_date={event.event_date}
                  title={event.title}
                  event_url={event.event_url}
                  eventFlag={event.country}
                  category={event.category}
                  location={event.location}
                  event_end_date={event.event_end_date}
                />
              ))
            ) : (
              <p className="col-span-full text-center font-mono text-xs text-white/50 py-10">
                No events match the current filters.
              </p>
            )}
          </motion.div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default EventSection;
