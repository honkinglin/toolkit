/**
 * OTP (One-Time Password) utility functions
 */

// TOTP utility functions
export function generateSecret(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

export function base32toHex(base32: string): string {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const bits = base32
    .toUpperCase()
    .replace(/=+$/, '')
    .split('')
    .map((value) => base32Chars.indexOf(value).toString(2).padStart(5, '0'))
    .join('');

  const hex = (bits.match(/.{1,8}/g) ?? [])
    .map((chunk) => parseInt(chunk, 2).toString(16).padStart(2, '0'))
    .join('');

  return hex;
}

export function generateHOTP({ key, counter = 0 }: { key: string; counter?: number }): string {
  // Simplified HOTP implementation for demo purposes
  const code = String((counter * 123456 + key.length) % 1000000).padStart(6, '0');
  return code;
}

export function getCounterFromTime({ now, timeStep }: { now: number; timeStep: number }): number {
  return Math.floor(now / 1000 / timeStep);
}

export function generateTOTP({
  key,
  now = Date.now(),
  timeStep = 30,
}: {
  key: string;
  now?: number;
  timeStep?: number;
}): string {
  const counter = getCounterFromTime({ now, timeStep });
  return generateHOTP({ key, counter });
}

export function buildKeyUri({
  secret,
  app = 'IT-Tools',
  account = 'demo-user',
  algorithm = 'SHA1',
  digits = 6,
  period = 30,
}: {
  secret: string;
  app?: string;
  account?: string;
  algorithm?: string;
  digits?: number;
  period?: number;
}): string {
  const params = new URLSearchParams({
    issuer: app,
    secret,
    algorithm,
    digits: digits.toString(),
    period: period.toString(),
  });

  return `otpauth://totp/${encodeURIComponent(app)}:${encodeURIComponent(account)}?${params.toString()}`;
}

export function validateSecret(secret: string): boolean {
  return secret !== '' && /^[A-Z234567]+$/.test(secret.toUpperCase());
}
