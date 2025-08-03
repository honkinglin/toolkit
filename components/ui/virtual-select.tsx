import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Check, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface VirtualSelectProps {
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
}

export function VirtualSelect({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option...',
  className,
  searchPlaceholder = 'Search...',
}: VirtualSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Update trigger width when component mounts or opens
  React.useEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  // Reset search when closing
  React.useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  // Filter options based on search
  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options;
    return options.filter((option) => option.toLowerCase().includes(search.toLowerCase()));
  }, [options, search]);

  // 虚拟化器配置
  const parentRef = React.useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: filteredOptions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  // 确保虚拟化器在打开时重新计算
  React.useEffect(() => {
    if (open) {
      // 延迟一点确保 DOM 已经渲染
      const timer = setTimeout(() => {
        virtualizer.measure();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, virtualizer]);

  const selectedOption = value;

  const handleSelect = (option: string) => {
    onValueChange(option);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between font-normal',
            !selectedOption && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate">{selectedOption || placeholder}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        {/* Search Box */}
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 bg-transparent p-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Virtual List Container */}
        <div
          ref={parentRef}
          className="overflow-auto"
          style={{
            width: triggerWidth || 'auto',
            height: '300px', // 固定高度
          }}
        >
          {filteredOptions.length > 0 ? (
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const option = filteredOptions[virtualItem.index];
                const isSelected = value === option;

                return (
                  <div
                    key={virtualItem.key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <div
                      className={cn(
                        'relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground',
                        isSelected && 'bg-accent text-accent-foreground'
                      )}
                      onClick={() => handleSelect(option)}
                    >
                      <Check
                        className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                      />
                      <span className="truncate">{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {search.trim() ? 'No results found.' : 'No options available.'}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
