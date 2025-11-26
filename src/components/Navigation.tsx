"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/why-hungary", label: "Why Hungary" },
  { href: "/highlighted-sectors", label: "Highlighted Sectors" },
  { href: "/startups", label: "Startup database" },
  { href: "/ecosystem", label: "Startup ecosystem" },
  { href: "/registry", label: "Registration" },
];

function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className=" w-full">
        <nav className="flex justify-between items-center py-4 bg-[#5d3dff] px-8 mt-3 rounded-br-3xl rounded-tl-3xl text-cyan-50">
          <Link href={"/"}>
            <Image src={"/niu-logo.png"} width={150} height={100} alt="link" />
          </Link>
          {/* desktop nav */}
          <div className="hidden lg:flex gap-2 lg:items-center">
            {links.map(({ href, label }) => (
              <Link
                href={href}
                key={href}
                className={cn(
                  pathname === href ? "font-bold bg-white text-black" : "",
                  buttonVariants({ variant: "ghost" }),
                  "hover:bg-muted"
                )}
              >
                {label}
              </Link>
            ))}
          </div>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200 bg-white"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </Button>
        </nav>
      </header>
      {/* mobile */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 min-h-screen w-full bg-background border-l border-border transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0 animate-fadeInUp" : "translate-x-full hidden "
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="text-lg font-semibold text-foreground">Menu</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-muted bg-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-foreground  " />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-1">
              {links.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      pathname === item.href
                        ? "font-bold text-white bg-primary"
                        : "",
                      buttonVariants({ variant: "ghost" }),
                      "hover:bg-muted block text-center"
                    )}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
      {/* {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )} */}
    </>
  );
}

export default Navigation;
