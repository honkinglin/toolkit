import { stringify } from 'yaml';
import JSON5 from 'json5';

export function convertJsonToYaml(jsonString: string): string {
  if (!jsonString.trim()) return '';

  try {
    const parsed = JSON5.parse(jsonString);
    return stringify(parsed);
  } catch {
    return '';
  }
}

export function isValidJsonForYaml(jsonString: string): boolean {
  if (!jsonString.trim()) return true;

  // 简单的 JSON 格式预检查
  const trimmed = jsonString.trim();
  if (
    !(
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    )
  ) {
    return false;
  }

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
