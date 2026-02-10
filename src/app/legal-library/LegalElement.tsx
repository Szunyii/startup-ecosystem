import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Link from "next/link";

interface LegalElemntProps {
  name: string;
  description: string;
  link: string;
}

function LegalElement({ name, description, link }: LegalElemntProps) {
  return (
    <div className="text-white border rounded-xl px-10 py-5 border-primary">
      <div className="flex gap-6 mb-6 items-center jus">
        <Image
          alt=""
          src={"/legal.png"}
          width={30}
          height={30}
          className="shrink-0"
        />
        <p className="font-bold text-2xl text">{name}</p>
      </div>
      <div
        className="h-40 overflow-hidden
         [mask-image:linear-gradient(to_bottom,black_40%,transparent)]
         [-webkit-mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
      >
        <p className="text-white leading-relaxed text-justify whitespace-pre-line">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-2 items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={"ghost"}
              className="hover:bg-transparent text-gray-500 hover:text-white text-[16px]"
            >
              Read more
            </Button>
          </DialogTrigger>
          {/* -----------CONTENT---------- */}
          <DialogContent className="sm:max-w-lg p-10 bg-[#120937] text-white border border-primary">
            <DialogHeader>
              <DialogTitle className="mb-4">
                <div className="flex gap-6 items-center">
                  <Image
                    className=""
                    alt=""
                    src={"/legal.png"}
                    width={30}
                    height={30}
                  />
                  <p className="text-xl text-center">{name}</p>
                </div>
              </DialogTitle>
              <DialogDescription className="text-lg text-balck text-justify whitespace-pre-line">
                {description}
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-center">
              <Link href={link}>
                <Button className="text-[16px] border-primary border bg-transparent text-white">
                  Download
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href={link} className="mb-4">
          <Button className="text-[16px] border-primary border bg-transparent text-white">
            Download
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LegalElement;
