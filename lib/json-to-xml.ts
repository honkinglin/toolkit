import * as convert from 'xml-js';
import JSON5 from 'json5';

/**
 * Convert JSON string to XML string
 */
export function convertJsonToXml(jsonString: string): string {
  if (!jsonString.trim()) {
    return '';
  }

  const parsed = JSON5.parse(jsonString);
  return convert.js2xml(parsed, { compact: true });
}

/**
 * Check if a string is valid JSON that can be converted to XML
 */
export function isValidJsonForXml(value: string): boolean {
  if (!value.trim()) {
    return true;
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
