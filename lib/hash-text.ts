import * as CryptoJS from 'crypto-js';

export const algos = {
  MD5: CryptoJS.MD5,
  SHA1: CryptoJS.SHA1,
  SHA256: CryptoJS.SHA256,
  SHA224: CryptoJS.SHA224,
  SHA512: CryptoJS.SHA512,
  SHA384: CryptoJS.SHA384,
  SHA3: CryptoJS.SHA3,
  RIPEMD160: CryptoJS.RIPEMD160,
} as const;

export type AlgoNames = keyof typeof algos;
export type Encoding = 'Hex' | 'Base64' | 'Base64url' | 'Bin';

export const algoNames = Object.keys(algos) as AlgoNames[];

export const encodingOptions = [
  { label: 'Binary (base 2)', value: 'Bin' as const },
  { label: 'Hexadecimal (base 16)', value: 'Hex' as const },
  { label: 'Base64 (base 64)', value: 'Base64' as const },
  { label: 'Base64url (base 64 with url safe chars)', value: 'Base64url' as const },
];

export function convertHexToBin(hex: string): string {
  return hex
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');
}

export function formatWithEncoding(words: CryptoJS.lib.WordArray, encoding: Encoding): string {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(CryptoJS.enc.Hex));
  }
  
  return words.toString(CryptoJS.enc[encoding]);
}

export function hashText(algo: AlgoNames, value: string, encoding: Encoding): string {
  if (!value) return '';
  return formatWithEncoding(algos[algo](value), encoding);
}