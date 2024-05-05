"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface UseQueryParamOptions<T> {
  name: string;
  defaultValue: T;
}

export function useQueryParam<T extends string | number | boolean>({ 
  name, 
  defaultValue 
}: UseQueryParamOptions<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const value = useMemo(() => {
    const param = searchParams.get(name);
    if (param === null) return defaultValue;

    // 类型转换
    if (typeof defaultValue === 'boolean') {
      return param === 'true' as T;
    }
    if (typeof defaultValue === 'number') {
      return Number(param) as T;
    }
    return param as T;
  }, [searchParams, name, defaultValue]);

  const setValue = useCallback((newValue: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, String(newValue));
    router.replace(`${pathname}?${params.toString()}`);
  }, [searchParams, router, pathname, name]);

  return [value, setValue] as const;
}