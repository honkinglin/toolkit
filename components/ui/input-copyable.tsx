"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useCopy } from "@/hooks/use-copy";

interface InputCopyableProps {
  value: string;
  readonly?: boolean;
  className?: string;
  copyMessage?: string;
}

export function InputCopyable({ 
  value, 
  readonly = true, 
  className,
  copyMessage = "Copied to clipboard"
}: InputCopyableProps) {
  const { copy } = useCopy({ 
    source: value, 
    successMessage: copyMessage 
  });

  return (
    <div className="flex">
      <Input
        value={value}
        readOnly={readonly}
        className={`flex-1 rounded-r-none font-mono text-sm ${className}`}
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