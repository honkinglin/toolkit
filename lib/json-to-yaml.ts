import { stringify } from 'yaml';
import JSON5 from 'json5';

export function convertJsonToYaml(jsonString: string): string {
  if (!jsonString.trim()) return '';

  try {
    const parsed = JSON5.parse(jsonString);
    return stringify(parsed);
  } catch {
    throw new Error('Invalid JSON format');
  }
}

export function isValidJsonForYaml(jsonString: string): boolean {
  if (!jsonString.trim()) return true;

  try {
    const parsed = JSON5.parse(jsonString);
    stringify(parsed);
    return true;
  } catch {
    return false;
  }
}

export function withDefaultOnError<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}
