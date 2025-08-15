"use client";
import React, { useState } from "react";
import StartupRegForm from "./StartupRegForm";
import { SliderItem, SlidingNavbar } from "./Slider";
import EcosystemRegForm from "./EcosystemRegForm";

function FormChanger() {
  const slideritems: SliderItem[] = [
    { id: "1", label: "startup" },
    { id: "2", label: "ecosystem" },
  ];
  const onClickHandler = (label: string) => {
    setForm(label);
  };

  const [form, setForm] = useState<string>("startup");
  return (
    <div className="flex justify-center flex-col gap-8 row-start-2 items-center  w-full my-6">
      <div className="flex">
        <SlidingNavbar onItemClick={onClickHandler} items={slideritems} />
      </div>
      {form === "startup" ? <StartupRegForm /> : <EcosystemRegForm />}
    </div>
  );
}

export default FormChanger;
