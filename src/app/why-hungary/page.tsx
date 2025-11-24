import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import FirstBlock from "./FirstBlock";
import SecondBlock from "./SecondBlock";
import ThirdBlock from "./ThirdBlock";
import FourthBlock from "./FourthBlock";
import FifthBlock from "./FifthBlock";

function page() {
  return (
    <div className="min-h-screen w-full border-none">
      <h1 className="text-center text-white mt-6 mb-6 text-[42px] font-semibold ">
        Why Hungary?
      </h1>
      <Carousel className="w-full mb-6" opts={{ loop: true }}>
        <CarouselContent>
          <CarouselItem key={1}>
            <FirstBlock />
          </CarouselItem>
          <CarouselItem key={2}>
            <SecondBlock />
          </CarouselItem>
          <CarouselItem key={3}>
            <ThirdBlock />
          </CarouselItem>
          <CarouselItem key={4}>
            <FourthBlock />
          </CarouselItem>
          <CarouselItem key={5}>
            <FifthBlock />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious variant={"ghost"} className="hover:bg-primary/80" />
        <CarouselNext variant={"ghost"} className="hover:bg-primary/80" />
        <CarouselDots className="mb-8" />
      </Carousel>
    </div>
  );
}

export default page;
