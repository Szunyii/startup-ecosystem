"use client";
import EventSection from "@/components/EventSection";
import { ChevronDownIcon } from "lucide-react";
import { Suspense } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      <div className="scroll-smooth">
        <div className="w-full min-h-screen max-h-screen z-10 text-white flex justify-center">
          <div className="mt-20 md:mt-36 flex flex-col items-center px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold max-w-3xl text-center"
            >
              Facilitating the visibility of Hungarian startups on the global
              ecosystem map
            </motion.h2>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-9 flex flex-col z-20 content-center items-center"
              href="#events"
            >
              <ChevronDownIcon size={40} className="animate-bounce" />
            </motion.a>
          </div>
        </div>
        <section id="events" className="flex flex-col mb-11">
          <motion.h3 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className=" pl-0 md:pl-6 text-white text-center text-2xl mb-1 font-bold self-center md:self-start"
          >
            Upcoming Events
          </motion.h3>
          <Suspense fallback={"Loading"}>
            <EventSection />
          </Suspense>
        </section>
      </div>
    </>
  );
}
