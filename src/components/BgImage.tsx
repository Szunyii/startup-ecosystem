"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

function BgImage() {
  const pathname = usePathname();
  return pathname === "/" ? (
    <div className="pointer-events-none absolute -top-3 left-0 right-0 h-screen -z-10">
      <Image
        src="/bg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />

      {/* Finom hosszú gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b
                    from-transparent   via-transparent/5 to-[#091737]/95 "
      />

      {/* Alsó enyhe blur */}
      <div className="absolute bottom-0 h-20 w-full backdrop-blur-sm" />
    </div>
  ) : null;
}

export default BgImage;
