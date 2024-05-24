import { type Colord, colord, extend } from 'colord';
import cmykPlugin from 'colord/plugins/cmyk';
import hwbPlugin from 'colord/plugins/hwb';
import namesPlugin from 'colord/plugins/names';
import lchPlugin from 'colord/plugins/lch';

// Extend colord with plugins
extend([cmykPlugin, hwbPlugin, namesPlugin, lchPlugin]);

export interface ColorFormat {
  type: 'text' | 'color-picker';
  label: string;
  parse: (value: string) => Colord | undefined;
  format: (value: Colord) => string;
  placeholder?: string;
  invalidMessage?: string;
}

export function withDefaultOnError<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}

export function removeAlphaChannelWhenOpaque(hexColor: string): string {
  return hexColor.replace(/^(#(?:[0-9a-f]{3}){1,2})ff$/i, '$1');
}

export function buildColorFormat({
  label,
  parse = (value: string) => colord(value),
  format,
  placeholder,
  invalidMessage = `Invalid ${label.toLowerCase()} format.`,
  type = 'text',
}: {
  label: string;
  parse?: (value: string) => Colord;
  format: (value: Colord) => string;
  placeholder?: string;
  invalidMessage?: string;
  type?: 'text' | 'color-picker';
}): ColorFormat {
  return {
    type,
    label,
    parse: (v: string) => withDefaultOnError(() => parse(v), undefined),
    format,
    placeholder,
    invalidMessage,
  };
}

export function isValidColor(value: string, parse: (value: string) => Colord | undefined): boolean {
  if (value === '') {
    return true;
  }

  const parsed = parse(value);
  return parsed?.isValid() ?? false;
}

// Define color formats
export const colorFormats = {
  picker: buildColorFormat({
    label: 'color picker',
    format: (v: Colord) => v.toHex(),
    type: 'color-picker',
  }),
  hex: buildColorFormat({
    label: 'hex',
    format: (v: Colord) => v.toHex(),
    placeholder: 'e.g. #ff0000',
  }),
  rgb: buildColorFormat({
    label: 'rgb',
    format: (v: Colord) => v.toRgbString(),
    placeholder: 'e.g. rgb(255, 0, 0)',
  }),
  hsl: buildColorFormat({
    label: 'hsl',
    format: (v: Colord) => v.toHslString(),
    placeholder: 'e.g. hsl(0, 100%, 50%)',
  }),
  hwb: buildColorFormat({
    label: 'hwb',
    format: (v: Colord) => v.toHwbString(),
    placeholder: 'e.g. hwb(0, 0%, 0%)',
  }),
  lch: buildColorFormat({
    label: 'lch',
    format: (v: Colord) => v.toLchString(),
    placeholder: 'e.g. lch(53.24, 104.55, 40.85)',
  }),
  cmyk: buildColorFormat({
    label: 'cmyk',
    format: (v: Colord) => v.toCmykString(),
    placeholder: 'e.g. cmyk(0, 100%, 100%, 0)',
  }),
  name: buildColorFormat({
    label: 'name',
    format: (v: Colord) => v.toName({ closest: true }) ?? 'Unknown',
    placeholder: 'e.g. red',
  }),
};
