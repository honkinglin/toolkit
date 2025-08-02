export const natoAlphabet = [
  'Alpha',
  'Bravo',
  'Charlie',
  'Delta',
  'Echo',
  'Foxtrot',
  'Golf',
  'Hotel',
  'India',
  'Juliet',
  'Kilo',
  'Lima',
  'Mike',
  'November',
  'Oscar',
  'Papa',
  'Quebec',
  'Romeo',
  'Sierra',
  'Tango',
  'Uniform',
  'Victor',
  'Whiskey',
  'X-ray',
  'Yankee',
  'Zulu',
];

export interface TextToNatoAlphabetOptions {
  text: string;
}

export function textToNatoAlphabet({ text }: TextToNatoAlphabetOptions): string {
  if (!text) return '';

  return text
    .toLowerCase()
    .split('')
    .map((char) => {
      // Handle letters A-Z
      if (char >= 'a' && char <= 'z') {
        const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
        return natoAlphabet[index];
      }

      // Handle spaces
      if (char === ' ') {
        return '[Space]';
      }

      // Handle numbers
      if (char >= '0' && char <= '9') {
        const numbers = [
          'Zero',
          'One',
          'Two',
          'Three',
          'Four',
          'Five',
          'Six',
          'Seven',
          'Eight',
          'Nine',
        ];
        return numbers[parseInt(char)];
      }

      // Handle common punctuation
      const punctuation: Record<string, string> = {
        '.': '[Period]',
        ',': '[Comma]',
        '?': '[Question Mark]',
        '!': '[Exclamation Mark]',
        ':': '[Colon]',
        ';': '[Semicolon]',
        '-': '[Dash]',
        _: '[Underscore]',
        '(': '[Open Parenthesis]',
        ')': '[Close Parenthesis]',
        '[': '[Open Bracket]',
        ']': '[Close Bracket]',
        '{': '[Open Brace]',
        '}': '[Close Brace]',
        '@': '[At Sign]',
        '#': '[Hash]',
        $: '[Dollar]',
        '%': '[Percent]',
        '&': '[Ampersand]',
        '*': '[Asterisk]',
        '+': '[Plus]',
        '=': '[Equals]',
        '/': '[Slash]',
        '\\': '[Backslash]',
        '|': '[Pipe]',
        '<': '[Less Than]',
        '>': '[Greater Than]',
        '"': '[Quote]',
        "'": '[Apostrophe]',
        '`': '[Backtick]',
        '~': '[Tilde]',
        '^': '[Caret]',
      };

      return punctuation[char] || `[${char}]`;
    })
    .join(' ');
}
