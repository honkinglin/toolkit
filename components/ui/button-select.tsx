
"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[] | Record<string, string>;
  className?: string;
}

export function ButtonSelect<T extends string>({ 
  value, 
  onChange, 
  options, 
  className 
}: ButtonSelectProps<T>) {
  const isArray = Array.isArray(options);
  const optionEntries = isArray 
    ? (options as readonly T[]).map(opt => [opt, opt] as const)
    : Object.entries(options) as [string, string][];

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {optionEntries.map(([key, label]) => (
        <Button
          key={key}
          variant={value === key ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(key as T)}
          className="h-8"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}