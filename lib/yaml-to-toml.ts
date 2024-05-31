import { stringify as stringifyToml } from '@iarna/toml';
import { parse as parseYaml } from 'yaml';

export function convertYamlToToml(yamlString: string): string {
  if (!yamlString.trim()) return '';

  try {
    const parsed = parseYaml(yamlString);
    if (parsed === null || parsed === undefined) return '';

    const tomlResult = stringifyToml(parsed);
    return Array.isArray(tomlResult) ? tomlResult.join('\n').trim() : tomlResult.trim();
  } catch {
    throw new Error('Invalid YAML format or conversion failed');
  }
}

export function isValidYamlForToml(yamlString: string): boolean {
  if (!yamlString.trim()) return true;

  try {
    const parsed = parseYaml(yamlString);
    if (parsed === null || parsed === undefined) return true;

    // Try to convert to TOML to ensure it's valid
    stringifyToml(parsed);
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
