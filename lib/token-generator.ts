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
    throw new Error('At least one character type must be selected');
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return result;
}