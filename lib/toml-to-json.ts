import { parse as parseToml } from '@iarna/toml';

/**
 * Convert TOML string to JSON string
 */
export function convertTomlToJson(tomlString: string): string {
  if (!tomlString.trim()) {
    return '';
  }

  const parsed = parseToml(tomlString);
  return JSON.stringify(parsed, null, 2);
}

/**
 * Check if a string is valid TOML
 */
export function isValidToml(value: string): boolean {
  if (!value.trim()) {
    return true;
  }

  try {
    parseToml(value);
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
