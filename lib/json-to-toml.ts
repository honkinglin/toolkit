import { stringify as stringifyToml } from '@iarna/toml';
import JSON5 from 'json5';

/**
 * Convert JSON string to TOML string
 */
export function convertJsonToToml(jsonString: string): string {
  if (!jsonString.trim()) {
    return '';
  }

  const parsed = JSON5.parse(jsonString);
  return stringifyToml(parsed);
}

/**
 * Check if a string is valid JSON that can be converted to TOML
 */
export function isValidJsonForToml(value: string): boolean {
  if (!value.trim()) {
    return true;
  }

  // 简单的 JSON 格式预检查
  const trimmed = value.trim();
  if (
    !(
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    )
  ) {
    return false;
  }

  try {
    JSON5.parse(value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Utility function that returns a default value when an error occurs
 */
export function withDefaultOnError<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
