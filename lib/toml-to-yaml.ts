import { parse as parseToml } from '@iarna/toml';
import { stringify as stringifyYaml } from 'yaml';

/**
 * Convert TOML string to YAML string
 */
export function convertTomlToYaml(tomlString: string): string {
  if (!tomlString.trim()) {
    return '';
  }

  const parsed = parseToml(tomlString);
  return stringifyYaml(parsed);
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
