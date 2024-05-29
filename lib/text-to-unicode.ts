export function convertTextToUnicode(text: string): string {
  if (!text) return '';

  return text
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('');
}

export function convertUnicodeToText(unicodeStr: string): string {
  if (!unicodeStr) return '';

  return unicodeStr.replace(/&#(\d+);/g, (match, dec) => {
    const codePoint = parseInt(dec, 10);
    return String.fromCharCode(codePoint);
  });
}

export function isValidUnicode(unicodeStr: string): boolean {
  if (!unicodeStr.trim()) return true;

  // Check if the string contains valid unicode entities
  const unicodePattern = /^(&#\d+;)*$/;
  const cleanStr = unicodeStr.replace(/\s/g, ''); // Remove whitespace

  return unicodePattern.test(cleanStr) || /^(&#\d+;\s*)*$/.test(unicodeStr); // Allow spaces between entities
}
