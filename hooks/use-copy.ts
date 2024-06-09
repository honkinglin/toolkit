'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

interface UseCopyOptions {
  source: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useCopy({
  source,
  successMessage = '已复制到剪贴板',
  errorMessage = '复制失败',
}: UseCopyOptions) {
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      toast.success(successMessage);
    } catch {
      toast.error(errorMessage);
    }
  }, [source, successMessage, errorMessage]);

  return { copy };
}

interface UseCopyWithTooltipOptions {
  /**
   * Duration in milliseconds to show the copied state
   * @default 2000
   */
  duration?: number;
}

interface UseCopyWithTooltipReturn {
  copied: boolean;
  tooltipOpen: boolean;
  handleCopy: (text: string) => Promise<void>;
  handleTooltipOpenChange: (open: boolean) => void;
}

/**
 * Custom hook for handling copy to clipboard functionality with tooltip state
 */
export function useCopyWithTooltip(
  options: UseCopyWithTooltipOptions = {}
): UseCopyWithTooltipReturn {
  const { duration = 2000 } = options;

  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopy = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setTooltipOpen(open);

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopied(false);
    }
  };

  return {
    copied,
    tooltipOpen,
    handleCopy,
    handleTooltipOpenChange,
  };
}
