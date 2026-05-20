"use client";

const typeValues = [
  { type: "All", value: "All" },
  { type: "Global", value: "Global" },
  { type: "European", value: "European" },
  { type: "CEE", value: "CEE" },
  { type: "Local", value: "Local" },
];

type TypeSelectProps = {
  onClick: (type: string) => void;
  active: string;
};

function TypeSelect({ onClick, active }: TypeSelectProps) {
  return (
    <div className="flex w-full gap-1 p-[3px] rounded-full bg-black/30 border border-white/[0.06]">
      {typeValues.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onClick(opt.value)}
          className={
            "flex-1 px-2 py-1 rounded-full text-[11px] font-mono whitespace-nowrap transition-colors " +
            (opt.value === active
              ? "bg-primary text-white font-semibold"
              : "text-white/70 hover:text-white")
          }
        >
          {opt.type}
        </button>
      ))}
    </div>
  );
}

export default TypeSelect;
