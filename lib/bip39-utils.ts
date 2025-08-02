import * as bip39 from 'bip39';
import { randomBytes } from 'crypto';

export const SUPPORTED_LANGUAGES = [
  { label: 'English', value: 'english' },
  { label: '简体中文', value: 'chinese_simplified' },
  { label: '繁體中文', value: 'chinese_traditional' },
  { label: 'Français', value: 'french' },
  { label: 'Italiano', value: 'italian' },
  { label: '日本語', value: 'japanese' },
  { label: '한국어', value: 'korean' },
  { label: 'Español', value: 'spanish' },
] as const;

export type Language = typeof SUPPORTED_LANGUAGES[number]['value'];

export function generateEntropy(): string {
  // 生成 128 位熵（16 字节）
  const entropy = randomBytes(16);
  return entropy.toString('hex');
}

export function generateMnemonic(entropy: string, language: Language = 'english'): string {
  try {
    // 设置语言
    const wordlist = getWordlist(language);
    
    // 从熵生成助记词
    const entropyBuffer = Buffer.from(entropy, 'hex');
    return bip39.entropyToMnemonic(entropyBuffer, wordlist);
  } catch (error) {
    throw new Error(`Failed to generate mnemonic from entropy ${entropy}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function validateMnemonic(mnemonic: string, language: Language = 'english'): boolean {
  try {
    const wordlist = getWordlist(language);
    return bip39.validateMnemonic(mnemonic, wordlist);
  } catch {
    return false; // 如果验证失败，返回 false
  }
}

export function mnemonicToEntropy(mnemonic: string, language: Language = 'english'): string {
  try {
    const wordlist = getWordlist(language);
    return bip39.mnemonicToEntropy(mnemonic, wordlist);
  } catch (error) {
    throw new Error(`Failed to convert mnemonic to entropy: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function getWordlist(language: Language) {
  switch (language) {
    case 'chinese_simplified':
      return bip39.wordlists.chinese_simplified;
    case 'chinese_traditional':
      return bip39.wordlists.chinese_traditional;
    case 'french':
      return bip39.wordlists.french;
    case 'italian':
      return bip39.wordlists.italian;
    case 'japanese':
      return bip39.wordlists.japanese;
    case 'korean':
      return bip39.wordlists.korean;
    case 'spanish':
      return bip39.wordlists.spanish;
    case 'english':
    default:
      return bip39.wordlists.english;
  }
}