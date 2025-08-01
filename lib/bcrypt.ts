import { hashSync, compareSync } from 'bcryptjs';

export interface BcryptHashOptions {
  text: string;
  saltRounds: number;
}

export function hashPassword({ text, saltRounds }: BcryptHashOptions): string {
  if (!text) return '';
  return hashSync(text, saltRounds);
}

export function comparePassword(text: string, hash: string): boolean {
  if (!text || !hash) return false;
  try {
    return compareSync(text, hash);
  } catch {
    return false;
  }
}