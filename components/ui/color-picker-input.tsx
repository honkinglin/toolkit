'use client';

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { cn } from '@/lib/utils';

interface ColorPickerInputProps {
  value: string;
  onChange: (color: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function ColorPickerInput({
  value,
  onChange,
  placeholder = '#000000',
  className,
  disabled = false,
}: ColorPickerInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    if (colord(color).isValid() || color === '') {
      onChange(color);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <div className={cn('relative', className)}>
          <Input
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="font-mono pr-12"
            disabled={disabled}
          />
          <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-6 rounded border cursor-pointer"
            style={{ backgroundColor: value }}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" side="bottom" align="start">
        <HexColorPicker
          color={value}
          onChange={onChange}
          style={{ width: '200px', height: '150px' }}
        />
      </PopoverContent>
    </Popover>
  );
}
