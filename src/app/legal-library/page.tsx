import React from "react";
import LegalElement from "./LegalElement";
import legalData from "@/data/sh_library.json";
import Image from "next/image";

function LegalPage() {
  return (
    <div className="min-h-screen flex items-center w-full flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute  -right-[35%] z-0 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute  left-[25%] top-[34%] z-0 transform-gpu blur-3xl"
      >
        <div
          style={{
            clipPath: "circle(50% at 50% 50%)",
          }}
          className="relative aspect-square  w-[56.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#9089fc] opacity-10 sm:left-[calc(50%-30rem)] z-0"
        />
      </div>
      <div className="min-w-full flex flex-col text-center">
        <h1 className="text-white mt-10 text-5xl font-bold">Legal Library</h1>
        <div className="text-white text-justify mt-8 ">
          <p>
            In agreement with Startup Hungary and Hungarian Venture Capital and
            Private Equity Association (HVCA), on behalf of the Hungarian
            Innovation Agency (NIÜ), we recognize how crucial it is to have
            high-quality legal documents readily available for founders and
            investors. These documents are designed to serve as a strong,
            unified starting point, enabling founders to focus on specific deal
            and startup-related matters. Additional documents are available on
            the Startup Hungary website for startups that are considering
            whether to establish a company in the US.
          </p>
          <br />

          <p>
            For any questions or suggestions for additions, please contact
            Startup Hungary directly at:{" "}
            <a
              href="mailto:legal_library@startuphungary.io"
              className="hover:underline"
            >
              legal_library@startuphungary.io
            </a>
          </p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-20">
        {legalData.map((legal) => (
          <LegalElement
            key={legal.id}
            name={legal.name}
            description={legal.descripton}
            link={legal.link}
          />
        ))}
      </div>
      <div className="text-white self-start flex flex-col">
        <h2 className="text-4xl">Source: Startup Hungary Legal Library</h2>
        <div
          className="flex gap-1
        "
        >
          <p className="">Detailed information can be found at: </p>
          <a href="https://www.startuphungary.io/legal-library">
            https://www.startuphungary.io/legal-library
          </a>
        </div>
        <div className="flex gap-5 mt-2 max-w-full flex-wrap">
          <Image
            src={"/legal/startup-hu.png"}
            alt="partner"
            width={370}
            height={200}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/hvca-2.png"}
            alt="partner"
            width={300}
            height={300}
            className="max-h-[120px] object-contain"
          />
        </div>
      </div>
      <div className="text-white self-start mt-12">
        <h2 className="text-4xl">Contributing partners:</h2>
        <div className="flex gap-5 mt-2 max-w-full flex-wrap">
          <Image
            src={"/legal/pv.png"}
            alt="partner"
            width={250}
            height={200}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/jalsovszky.png"}
            alt="partner"
            width={200}
            height={150}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/oppenheim.png"}
            alt="partner"
            width={300}
            height={100}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/dla piper.png"}
            alt="partner"
            width={250}
            height={100}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/WhiteSummers.png"}
            alt="partner"
            width={350}
            height={150}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/lakatos.png"}
            alt="partner"
            height={100}
            width={200}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/boné.png"}
            alt="partner"
            width={250}
            height={50}
            className="max-h-[120px] object-contain"
          />
          <Image
            src={"/legal/csovari.png"}
            alt="partner"
            width={260}
            height={100}
            className="max-h-[100px] object-contain"
          />
          <Image
            src={"/legal/szecskay.png"}
            alt="partner"
            width={150}
            height={100}
            className="max-h-[130px] object-contain"
          />
          <Image
            src={"/legal/aando.png"}
            alt="partner"
            width={250}
            height={50}
            className="max-h-[200px] object-contain"
          />
          <Image
            src={"/legal/cytowski.png"}
            alt="partner"
            width={260}
            height={80}
            className="max-h-[160px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default LegalPage;
