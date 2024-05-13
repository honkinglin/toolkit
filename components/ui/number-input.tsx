"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface NumberInputControlledProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  disabled?: boolean;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  className,
  disabled = false
}: NumberInputControlledProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  const increment = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className={`flex items-center ${className || ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="rounded-r-none px-3"
      >
        <Minus className="w-4 h-4" />
      </Button>
      
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="text-center rounded-none border-x-0 focus-visible:ring-0 focus-visible:border-x-0"
      />
      
      <Button
        variant="outline"
        size="sm"
        onClick={increment}
        disabled={disabled || value >= max}
        className="rounded-l-none px-3"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
}