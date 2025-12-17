// import EventSection from "@/components/EventSection";
import EventSection from "@/components/EventSection";
import { ChevronDownIcon } from "lucide-react";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <div className="scroll-smooth">
        <div className="w-full min-h-screen max-h-screen z-10 text-white flex justify-center">
          <div className="mt-36 flex flex-col items-center">
            <h2 className="text-6xl font-bold max-w-3xl text-center ">
              Facilitating Hungarian startups visibility on the global ecosystem
              map
            </h2>
            <a className="mt-9 z-20 content-center items-center" href="#events">
              <ChevronDownIcon size={40} className={"animate-bounce"} />
            </a>
          </div>
        </div>
        <section id="events">
          <h2 className="text-white text-center text-4xl mb-1">Events</h2>
          <h3 className="text-muted text-center text-sm mb-3">
            Explore upcoming startup events
          </h3>
          <Suspense fallback={"Loading"}>
            <EventSection />
          </Suspense>
        </section>
      </div>
    </>
  );
}
