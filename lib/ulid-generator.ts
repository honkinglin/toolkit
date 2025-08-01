import { ulid } from 'ulid';

export type ULIDFormat = 'raw' | 'json';

export const formatOptions = [
  { label: 'Raw', value: 'raw' as const },
  { label: 'JSON', value: 'json' as const },
];

export function generateULIDs(amount: number, format: ULIDFormat): string {
  const ids = Array.from({ length: amount }, () => ulid());

  if (format === 'json') {
    return JSON.stringify(ids, null, 2);
  }

  return ids.join('\n');
}