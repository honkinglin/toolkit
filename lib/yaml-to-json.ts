import { parse as parseYaml } from 'yaml';

export function convertYamlToJson(yamlString: string): string {
  if (!yamlString.trim()) return '';

  try {
    const obj = parseYaml(yamlString, { merge: true });
    return obj ? JSON.stringify(obj, null, 2) : '';
  } catch {
    return '';
  }
}

export function isValidYaml(yamlString: string): boolean {
  if (!yamlString.trim()) return true;

  try {
    parseYaml(yamlString);
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
