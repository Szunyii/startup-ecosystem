"use client";
import { Calendar } from "./ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isBefore, isEqual, startOfDay } from "date-fns";
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

  const enabledDays = eventsArray.map((d) => new Date(d.event_date));

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
      const eventDate = startOfDay(new Date(event.event_date));

      if (selectedDate) {
        return isEqual(eventDate, selectedDate);
      }

      // alap eset: >= ma
      return !isBefore(eventDate, today); // azaz eventDate >= today
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
      router.push(`?date=${formattedDate}`);
    }
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleTypeClick = (type: string) => {
    setType(type);
  };

  return (
    <div className="w-full flex flex-col md:flex-row p-4 md:p-8 min-h-[500px] gap-4">
      <div className="flex-shrink w-full md:w-auto">
        <div className="flex flex-col justify-between items-center gap-2">
          <TypeSelect active={type} onClick={handleTypeClick} />
          <Select onValueChange={setSelectedCountry} defaultValue={""}>
            <SelectTrigger className="w-full">
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
          <Calendar
            hideWeekdays
            mode="single"
            selected={selectedDate ?? today}
            onSelect={handleDateSelect}
            disabled={(day) => {
              const isEnabled = enabledDays.some((d) => isSameDay(d, day));
              return !isEnabled;
            }}
            className="rounded-lg border order-1 md:order-none bg-primary/80 text-white w-full"
          />
        </div>
        {dateParam ? (
          <Button
            className="mt-2 w-full md:w-auto"
            onClick={() => {
              router.replace("/#event");
            }}
          >
            See all event
          </Button>
        ) : null}
      </div>
      <ScrollArea className="h-[400px] md:h-[540px] w-full rounded-md pr-2">
        <div
          className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 order-2 md:order-none"
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
            <p className="text-center text-white"></p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default EventSection;
