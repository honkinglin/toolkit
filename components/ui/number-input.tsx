"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
  placeholder?: string
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  placeholder
}: NumberInputProps) {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min
    const clampedValue = Math.min(Math.max(newValue, min), max)
    onChange(clampedValue)
  }

  return (
    <div className={cn("flex items-center", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0 rounded-r-none"
        onClick={handleDecrement}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="h-10 rounded-none border-l-0 border-r-0 text-center"
        min={min}
        max={max}
        placeholder={placeholder}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 shrink-0 rounded-l-none"
        onClick={handleIncrement}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}