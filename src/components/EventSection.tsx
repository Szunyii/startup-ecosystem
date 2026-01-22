"use client";
import { Calendar } from "./ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isBefore, isEqual, startOfDay } from "date-fns";
import eventsArray from "@/data/events.json";
import EventCard from "./EventCard";
import React, { useRef } from "react";
import { Button } from "./ui/button";

function EventSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="w-full flex flex-col md:flex-row p-8 min-h-[500px] gap-4">
      <div
        className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 order-2 md:order-none"
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
            />
          ))
        ) : (
          <p className="text-center text-white"></p>
        )}
      </div>
      <div className="flex-shrink">
        <Calendar
          hideWeekdays
          mode="single"
          selected={selectedDate ?? today}
          onSelect={handleDateSelect}
          disabled={(day) => {
            const isEnabled = enabledDays.some((d) => isSameDay(d, day));
            return !isEnabled;
          }}
          className="rounded-lg border flex-shrink-0 order-1 md:order-none bg-primary/80 text-white border-none"
        />
        {dateParam ? (
          <Button
            className="mt-2"
            onClick={() => {
              router.replace("/#event");
            }}
          >
            See all event
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default EventSection;
