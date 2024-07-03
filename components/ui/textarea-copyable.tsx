'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';
import { useCopy } from '@/hooks/use-copy';
import { cn } from '@/lib/utils';

interface TextareaCopyableProps {
  value: string;
  readonly?: boolean;
  className?: string;
  textareaClassName?: string;
  copyMessage?: string;
  rows?: number;
}

export function TextareaCopyable({
  value,
  readonly = true,
  className,
  textareaClassName,
  copyMessage = 'Copied to clipboard',
  rows = 4,
}: TextareaCopyableProps) {
  const { copy } = useCopy({
    source: value,
    successMessage: copyMessage,
  });

  return (
    <div className={cn('relative', className)}>
      <Textarea
        value={value}
        readOnly={readonly}
        rows={rows}
        className={cn('font-mono text-sm pr-12', textareaClassName)}
      />
      <Button
        variant="outline"
        size="icon"
        className="absolute top-2 right-2"
        onClick={copy}
        disabled={!value}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
