import * as convert from 'xml-js';

/**
 * Convert XML string to JSON string
 */
export function convertXmlToJson(xmlString: string): string {
  if (!xmlString.trim()) {
    return '';
  }

  const result = convert.xml2js(xmlString, { compact: true });
  return JSON.stringify(result, null, 2);
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
