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
  /**
   * Success message to show in toast
   */
  successMessage?: string;
  /**
   * Error message to show in toast
   */
  errorMessage?: string;
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
  const { duration = 2000, successMessage = '已复制到剪贴板', errorMessage = '复制失败' } = options;

  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopy = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);

      // Set copied state and show tooltip
      setCopied(true);
      setTooltipOpen(true);

      // Show success toast
      toast.success(successMessage);

      // Auto-reset copied state after duration
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, duration);

      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error(errorMessage);
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
