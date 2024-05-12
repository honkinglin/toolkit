import {
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA224,
  HmacSHA256,
  HmacSHA3,
  HmacSHA384,
  HmacSHA512,
  enc,
  lib
} from 'crypto-js';

export const hmacAlgorithms = {
  MD5: HmacMD5,
  RIPEMD160: HmacRIPEMD160,
  SHA1: HmacSHA1,
  SHA3: HmacSHA3,
  SHA224: HmacSHA224,
  SHA256: HmacSHA256,
  SHA384: HmacSHA384,
  SHA512: HmacSHA512,
} as const;

export type HmacAlgorithm = keyof typeof hmacAlgorithms;
export type Encoding = keyof typeof enc | 'Bin';

export const algorithmOptions = Object.keys(hmacAlgorithms).map(label => ({
  label,
  value: label as HmacAlgorithm
}));

export const encodingOptions = [
  {
    label: 'Binary (base 2)',
    value: 'Bin' as const,
  },
  {
    label: 'Hexadecimal (base 16)',
    value: 'Hex' as const,
  },
  {
    label: 'Base64 (base 64)',
    value: 'Base64' as const,
  },
  {
    label: 'Base64-url (base 64 with url safe chars)',
    value: 'Base64url' as const,
  },
];

// 将十六进制转换为二进制
export function convertHexToBin(hex: string): string {
  return hex
    .split('')
    .map(char => parseInt(char, 16).toString(2).padStart(4, '0'))
    .join('');
}

// 根据编码格式化输出
export function formatWithEncoding(words: lib.WordArray, encoding: Encoding): string {
  if (encoding === 'Bin') {
    return convertHexToBin(words.toString(enc.Hex));
  }
  return words.toString(enc[encoding]);
}

// 生成 HMAC
export function generateHMAC(
  plainText: string, 
  secret: string, 
  algorithm: HmacAlgorithm, 
  encoding: Encoding
): string {
  try {
    if (!plainText || !secret) return '';
    
    const hmacResult = hmacAlgorithms[algorithm](plainText, secret);
    return formatWithEncoding(hmacResult, encoding);
  } catch (error) {
    return '';
  }
}