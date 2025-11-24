"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";

export default function Faq({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hover:bg-muted hover:text-black rounded-2xl transition-all  flex flex-col justify-center items-center  shadow-md group rounded-tr-none rounded-bl-none">
          FAQ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Frequently Asked Questions</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription> */}
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="hover:bg-primary hover:text-zinc-50"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
