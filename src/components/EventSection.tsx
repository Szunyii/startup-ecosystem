"use client";
import { Calendar } from "./ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isAfter, isEqual } from "date-fns";
import eventsArray from "@/data/startup_events.json";
import EventCard from "./EventCard";

// type StartupEventType = {
//   title: string;
//   event_url: string;
//   main_image_url: string;
//   event_date: string; // ISO date (YYYY-MM-DD)
//   organizer: string;
//   location: string;
//   description: string;
//   duration: string; // ha számmá szeretnéd alakítani, szólj
//   type: string;
//   language: string;
// };

function EventSection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get date from search params or use current date
  const dateParam = searchParams.get("date");
  const selectedDate = dateParam ? new Date(dateParam) : new Date();

  // Format the selected date for comparison
  // const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  console.log(selectedDate);
  const upcomingEvents = eventsArray
    .filter((event) => {
      const eventDate = new Date(event.event_date);

      return (
        isAfter(eventDate, selectedDate) || isEqual(eventDate, selectedDate)
      );
    })
    .sort(
      (a, b) =>
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    );

  // Filter events for the selected date
  //   const eventsForDate = EVENTS.filter(
  //     (event) => event.date === selectedDateString
  //   );

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      router.push(`?date=${formattedDate}`);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row p-8 min-h-[500px] gap-4">
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 order-2 md:order-none">
        {upcomingEvents.map((event) => (
          <EventCard
            key={event.title}
            event_date={event.event_date}
            title={event.title}
            event_url={event.event_url}
            main_image_url={event.main_image_url}
          />
        ))}
      </div>
      <div className="flex-shrink">
        <Calendar
          hideWeekdays
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-lg border flex-shrink-0 order-1 md:order-none"
        />
      </div>
    </div>
  );
}

export default EventSection;
