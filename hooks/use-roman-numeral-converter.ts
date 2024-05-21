import { useState, useMemo } from 'react';
import {
  MIN_ARABIC_TO_ROMAN,
  MAX_ARABIC_TO_ROMAN,
  arabicToRoman,
  isValidRomanNumber,
  romanToArabic,
} from '@/lib/roman-numeral-converter.models';

export function useRomanNumeralConverter() {
  const [inputNumeral, setInputNumeral] = useState(42);
  const [inputRoman, setInputRoman] = useState('XLII');

  const outputRoman = useMemo(() => arabicToRoman(inputNumeral), [inputNumeral]);
  const outputNumeral = useMemo(() => romanToArabic(inputRoman), [inputRoman]);

  const numeralValidation = useMemo(() => {
    const isValid = inputNumeral >= MIN_ARABIC_TO_ROMAN && inputNumeral <= MAX_ARABIC_TO_ROMAN;
    return {
      isValid,
      error: isValid
        ? null
        : `We can only convert numbers between ${MIN_ARABIC_TO_ROMAN.toLocaleString()} and ${MAX_ARABIC_TO_ROMAN.toLocaleString()}`,
    };
  }, [inputNumeral]);

  const romanValidation = useMemo(() => {
    const isValid = isValidRomanNumber(inputRoman);
    return {
      isValid,
      error: isValid ? null : 'The input you entered is not a valid roman number',
    };
  }, [inputRoman]);

  return {
    inputNumeral,
    setInputNumeral,
    inputRoman,
    setInputRoman,
    outputRoman,
    outputNumeral,
    numeralValidation,
    romanValidation,
  };
}
