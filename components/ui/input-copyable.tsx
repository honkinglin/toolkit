'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy } from 'lucide-react';
import { useCopy } from '@/hooks/use-copy';
import { cn } from '@/lib/utils';

interface InputCopyableProps {
  value: string;
  readonly?: boolean;
  className?: string;
  inputClassName?: string;
  copyMessage?: string;
}

export function InputCopyable({
  value,
  readonly = true,
  className,
  inputClassName,
  copyMessage = 'Copied to clipboard',
}: InputCopyableProps) {
  const { copy } = useCopy({
    source: value,
    successMessage: copyMessage,
  });

  return (
    <div className={cn('flex', className)}>
      <Input
        value={value}
        readOnly={readonly}
        className={`flex-1 rounded-r-none font-mono text-sm ${inputClassName}`}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0"
        onClick={copy}
        disabled={!value}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
