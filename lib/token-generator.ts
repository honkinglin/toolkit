interface CreateTokenOptions {
  length: number;
  withUppercase: boolean;
  withLowercase: boolean;
  withNumbers: boolean;
  withSymbols: boolean;
}

export function createToken({
  length,
  withUppercase,
  withLowercase,
  withNumbers,
  withSymbols,
}: CreateTokenOptions): string {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let charset = '';
  if (withUppercase) charset += uppercase;
  if (withLowercase) charset += lowercase;
  if (withNumbers) charset += numbers;
  if (withSymbols) charset += symbols;

  if (charset === '') {
    return ''; // 返回空字符串而不是抛出异常
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return result;
}
