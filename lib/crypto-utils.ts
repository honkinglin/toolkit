import { AES, RC4, Rabbit, TripleDES, enc } from 'crypto-js';

export const algorithms = { AES, TripleDES, Rabbit, RC4 };
export type AlgorithmType = keyof typeof algorithms;

export const algorithmOptions = Object.keys(algorithms).map(label => ({
  label,
  value: label as AlgorithmType
}));

export function encryptText(text: string, secret: string, algorithm: AlgorithmType): string {
  try {
    return algorithms[algorithm].encrypt(text, secret).toString();
  } catch (error) {
    throw new Error(`Failed to encrypt text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function decryptText(encryptedText: string, secret: string, algorithm: AlgorithmType): string {
  try {
    const decrypted = algorithms[algorithm].decrypt(encryptedText, secret);
    const result = decrypted.toString(enc.Utf8);
    if (!result) {
      throw new Error('Unable to decrypt your text');
    }
    return result;
  } catch (error) {
    throw new Error(`Unable to decrypt your text: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}