"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const links = [
  { href: "/ecosystem", label: "Startup ecosystem" },
  { href: "/startups", label: "Startup database" },
];

function Navigation() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex justify-between items-center py-4 bg-[#5d3dff] px-8 mt-3 borderr rounded-br-3xl rounded-tl-3xl text-cyan-50">
      <Link href={"/"}>
        <Image src={"/niu-logo.png"} width={150} height={100} alt="ajaj" />
      </Link>
      <div className="flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            href={href}
            key={href}
            className={cn(
              pathname === href ? "font-bold bg-primary text-white" : "",
              buttonVariants({ variant: "ghost" }),
              "hover:bg-muted"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navigation;
