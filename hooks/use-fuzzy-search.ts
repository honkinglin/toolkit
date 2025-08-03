import { useMemo } from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';

interface UseFuzzySearchOptions<T> {
  search: string;
  data: T[];
  options?: IFuseOptions<T>;
}

export function useFuzzySearch<T>({ search, data, options }: UseFuzzySearchOptions<T>) {
  const fuse = useMemo(() => new Fuse(data, options), [data, options]);

  const searchResult = useMemo(() => {
    if (!search.trim()) {
      return data;
    }
    return fuse.search(search).map((result) => result.item);
  }, [fuse, search, data]);

  return { searchResult };
}
