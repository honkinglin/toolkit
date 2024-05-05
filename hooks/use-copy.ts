"use client";

import { useCallback } from 'react';
import { toast } from 'sonner';

interface UseCopyOptions {
  source: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useCopy({ 
  source, 
  successMessage = "已复制到剪贴板",
  errorMessage = "复制失败"
}: UseCopyOptions) {
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      toast.success(successMessage);
    } catch (err) {
      toast.error(errorMessage);
    }
  }, [source, successMessage, errorMessage]);

  return { copy };
}