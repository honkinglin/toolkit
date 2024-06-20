import { useState, useMemo } from 'react';
import { textToBase64, base64ToText, isValidBase64 } from '@/lib/base64-utils';

export function useBase64StringConverter() {
  const [textInput, setTextInput] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [encodeUrlSafe, setEncodeUrlSafe] = useState(false);
  const [decodeUrlSafe, setDecodeUrlSafe] = useState(false);

  const base64Output = useMemo(() => {
    return textToBase64(textInput, { makeUrlSafe: encodeUrlSafe });
  }, [textInput, encodeUrlSafe]);

  const textOutput = useMemo(() => {
    const trimmed = base64Input.trim();
    if (!trimmed) return '';

    // 简单的 base64 格式检查
    const base64Regex = decodeUrlSafe ? /^[A-Za-z0-9_-]*={0,2}$/ : /^[A-Za-z0-9+/]*={0,2}$/;

    if (!base64Regex.test(trimmed)) return '';

    try {
      return base64ToText(trimmed, { makeUrlSafe: decodeUrlSafe });
    } catch {
      return '';
    }
  }, [base64Input, decodeUrlSafe]);

  const base64Validation = useMemo(() => {
    const isValid = isValidBase64(base64Input.trim(), { makeUrlSafe: decodeUrlSafe });
    return {
      isValid,
      error: isValid ? null : 'Invalid base64 string',
    };
  }, [base64Input, decodeUrlSafe]);

  return {
    textInput,
    setTextInput,
    base64Input,
    setBase64Input,
    encodeUrlSafe,
    setEncodeUrlSafe,
    decodeUrlSafe,
    setDecodeUrlSafe,
    base64Output,
    textOutput,
    base64Validation,
  };
}
