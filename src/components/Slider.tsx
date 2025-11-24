import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface SliderItem {
  id: string;
  label: string;
  href?: string;
}

interface SlidingNavbarProps {
  items: SliderItem[];
  defaultActiveId?: string;
  className?: string;
  onItemClick?: (label: string) => void;
}

export function SlidingNavbar({
  items,
  defaultActiveId,
  className,
  onItemClick,
}: SlidingNavbarProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || items[0]?.id);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);

  const updateSlider = (targetId: string) => {
    const navElement = navRef.current;
    if (!navElement) return;

    const targetButton = navElement.querySelector(
      `[data-nav-id="${targetId}"]`
    ) as HTMLElement;
    if (!targetButton) return;

    const navRect = navElement.getBoundingClientRect();
    const targetRect = targetButton.getBoundingClientRect();

    setSliderStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
    });
  };

  useEffect(() => {
    updateSlider(activeId);
  }, [activeId]);

  const handleItemClick = (item: SliderItem) => {
    setActiveId(item.id);
    onItemClick?.(item.label);
  };

  return (
    <div
      ref={navRef}
      className={cn(
        "relative flex items-center bg-navbar border border-primary rounded-lg p-1 text-white",
        className
      )}
    >
      {/* Sliding background */}
      <div
        className="absolute bg-navbar-slider border border-primary rounded-md transition-all duration-300 ease-out h-[calc(100%-8px)] top-1 z-0"
        style={{
          left: `${sliderStyle.left}px`,
          width: `${sliderStyle.width}px`,
        }}
      />

      {/* Navigation items */}
      {items.map((item) => (
        <button
          key={item.id}
          data-nav-id={item.id}
          onClick={() => handleItemClick(item)}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md",
            activeId === item.id
              ? "text-navbar-item-active"
              : "text-navbar-item hover:text-navbar-item-hover"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
