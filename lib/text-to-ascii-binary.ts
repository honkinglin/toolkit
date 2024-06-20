export interface ConvertTextToAsciiBinaryOptions {
  separator?: string;
}

export function convertTextToAsciiBinary(
  text: string,
  { separator = ' ' }: ConvertTextToAsciiBinaryOptions = {}
): string {
  if (!text) return '';

  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(separator);
}

export function convertAsciiBinaryToText(binary: string): string {
  if (!binary) return '';

  const cleanBinary = binary.replace(/[^01]/g, '');

  if (cleanBinary.length % 8 !== 0) {
    return '';
  }

  return cleanBinary
    .split(/(\d{8})/)
    .filter(Boolean)
    .map((binaryChunk) => String.fromCharCode(Number.parseInt(binaryChunk, 2)))
    .join('');
}

export function isValidAsciiBinary(binary: string): boolean {
  if (!binary) return true;

  const cleanBinary = binary.replace(/[^01]/g, '');
  return cleanBinary.length % 8 === 0;
}
