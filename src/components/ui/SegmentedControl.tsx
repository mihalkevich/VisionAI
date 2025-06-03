// src/components/ui/SegmentedControl.tsx
"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SegmentedControlOption<T extends string = string> {
  label?: string; // Optional label
  value: T;
  icon?: React.ReactNode; // Allow any ReactNode for icon
}

interface SegmentedControlProps<T extends string> {
  name: string;
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  itemClassName?: string; // Class for individual items
  labelClassName?: string; // Class for the label text
  iconClassName?: string; // Class for the icon
}

export default function SegmentedControl<T extends string>({
  name,
  options,
  value,
  onChange,
  className,
  itemClassName,
  labelClassName,
  iconClassName,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "flex items-center p-1 bg-muted rounded-lg space-x-1 w-full", // Default to full width
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 flex items-center justify-center px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
            value === option.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:bg-card hover:text-foreground",
            itemClassName
          )}
        >
          {option.icon && <span className={cn("mr-1.5", iconClassName)}>{option.icon}</span>}
          {option.label && <span className={labelClassName}>{option.label}</span>}
        </button>
      ))}
    </div>
  );
}
