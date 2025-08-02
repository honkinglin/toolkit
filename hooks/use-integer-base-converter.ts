import { useState, useMemo } from 'react';
import { convertBase } from '@/lib/integer-base-converter.models';

export function useIntegerBaseConverter() {
  const [input, setInput] = useState('42');
  const [inputBase, setInputBase] = useState(10);
  const [outputBase, setOutputBase] = useState(42);

  const errorlessConvert = (value: string, fromBase: number, toBase: number) => {
    try {
      return convertBase({ value, fromBase, toBase });
    } catch {
      return '';
    }
  };

  const error = useMemo(() => {
    try {
      convertBase({ value: input, fromBase: inputBase, toBase: outputBase });
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'An error occurred';
    }
  }, [input, inputBase, outputBase]);

  const conversions = useMemo(
    () => [
      { label: 'Binary (2)', base: 2, key: 'binary' },
      { label: 'Octal (8)', base: 8, key: 'octal' },
      { label: 'Decimal (10)', base: 10, key: 'decimal' },
      { label: 'Hexadecimal (16)', base: 16, key: 'hexadecimal' },
      { label: 'Base64 (64)', base: 64, key: 'base64' },
    ],
    []
  );

  return {
    input,
    setInput,
    inputBase,
    setInputBase,
    outputBase,
    setOutputBase,
    errorlessConvert,
    error,
    conversions,
  };
}
