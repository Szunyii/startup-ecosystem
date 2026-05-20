"use client";

import React from "react";
import { motion } from "framer-motion";

const LIME = "#afe200";

export default function EventsHeading() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-2 md:px-7 mb-4"
    >
      <div className="inline-flex items-center gap-2.5 font-mono text-xs opacity-80 text-white">
        <span className="relative inline-block w-2 h-2">
          <span
            className="absolute inset-0 rounded-full opacity-35 animate-ping"
            style={{ background: LIME }}
          />
          <span
            className="absolute inset-0 rounded-full"
            style={{ background: LIME }}
          />
        </span>
        <span>What's coming up</span>
      </div>
      <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
        Upcoming Events
      </h2>
    </motion.div>
  );
}
