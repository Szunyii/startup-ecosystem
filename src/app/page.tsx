// import EventSection from "@/components/EventSection";
import EventSection from "@/components/EventSection";
import { ChevronDownIcon } from "lucide-react";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <>
      <div className="scroll-smooth">
        <div className="w-full min-h-screen max-h-screen z-10 text-white flex justify-center">
          <div className="mt-20 md:mt-36 flex flex-col items-center px-4">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl text-center ">
              Facilitating the visibility of Hungarian startups on the global
              ecosystem map
            </h2>
            <a
              className="mt-9 flex flex-col z-20 content-center items-center"
              href="#events"
            >
              <ChevronDownIcon size={40} className={"animate-bounce"} />
            </a>
          </div>
        </div>
        <section id="events" className="flex flex-col mb-11">
          <h3 className=" pl-0 md:pl-6 text-white text-center text-2xl mb-1 font-bold self-center md:self-start">
            Upcoming Events
          </h3>
          <Suspense fallback={"Loading"}>
            <EventSection />
          </Suspense>
        </section>
      </div>
    </>
  );
}
