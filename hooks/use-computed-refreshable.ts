"use client";

import { useState, useCallback, useMemo } from 'react';

// A custom hook that computes a value and provides a way to refresh it
export function useComputedRefreshable<T>(computeFn: () => T) {
  const [refreshKey, setRefreshKey] = useState(0);

  const value = useMemo(() => {
    return computeFn();
  }, [computeFn, refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return [value, refresh] as const;
}