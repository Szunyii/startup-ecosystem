"use client";

import type React from "react";

import { usePathname } from "next/navigation";

export function ConditionalBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <section className="relative min-h-screen   overflow-hidden cont">
          <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center" />

          <div className="relative z-10 w-full  mx-auto container">
            {children}
          </div>
        </section>
      </>
    );
  }

  return <div className="w-full max-w-7xl mx-auto px-4 ">{children}</div>;
}
