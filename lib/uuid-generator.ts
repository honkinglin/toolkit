import { v1, v3, v4, v5, NIL } from 'uuid';

export const versions = ['NIL', 'v1', 'v3', 'v4', 'v5'] as const;
export type UUIDVersion = typeof versions[number];

export const namespaceOptions = {
  DNS: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  URL: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
  OID: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
  X500: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
} as const;

export type NamespaceKey = keyof typeof namespaceOptions;

export interface V35Args {
  namespace: string;
  name: string;
}

export function generateUUIDs(version: UUIDVersion, count: number, v35Args?: V35Args): string[] {
  try {
    return Array.from({ length: count }, (_, index) => {
      switch (version) {
        case 'NIL':
          return NIL;
        case 'v1':
          return v1({
            clockseq: index,
            msecs: Date.now(),
            nsecs: Math.floor(Math.random() * 10000),
            node: new Uint8Array(Array.from({ length: 6 }, () => Math.floor(Math.random() * 256))),
          });
        case 'v3':
          return v35Args && v35Args.name ? v3(v35Args.name, v35Args.namespace) : '';
        case 'v4':
          return v4();
        case 'v5':
          return v35Args && v35Args.name ? v5(v35Args.name, v35Args.namespace) : '';
        default:
          return '';
      }
    }).filter(uuid => uuid !== ''); // 过滤掉空字符串
  } catch (error) {
    return [];
  }
}

export function isValidUUID(value: string): boolean {
  if (value === NIL) {
    return true;
  }
  return Boolean(value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/));
}