import type { ConvertOptions, SortOrder } from './list-converter.types';

/**
 * Sort function that handles ascending and descending order
 */
function byOrder(options: { order: SortOrder }) {
  return (a: string, b: string): number => {
    if (options.order === 'asc') {
      return a.localeCompare(b);
    } else if (options.order === 'desc') {
      return b.localeCompare(a);
    }
    return 0;
  };
}

/**
 * Remove duplicates from array while preserving order
 */
function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Convert list string according to the provided options
 */
export function convert(list: string, options: ConvertOptions): string {
  if (!list.trim()) {
    return '';
  }

  const lineBreak = options.keepLineBreaks ? '\n' : '';

  // Start with the input text
  let text = list;

  // Apply lowercase transformation if needed
  if (options.lowerCase) {
    text = text.toLowerCase();
  }

  // Split into array of lines
  let parts = text.split('\n');

  // Remove duplicates if needed
  if (options.removeDuplicates) {
    parts = uniq(parts);
  }

  // Reverse the list if needed
  if (options.reverseList) {
    parts = parts.reverse();
  }

  // Sort the list if needed
  if (options.sortList !== null) {
    parts = parts.sort(byOrder({ order: options.sortList }));
  }

  // Trim items if needed and remove empty lines
  if (options.trimItems) {
    parts = parts.map((p) => p.trim());
  }

  // Remove empty items
  parts = parts.filter((p) => p !== '');

  // Add prefix and suffix to each item
  parts = parts.map((p) => options.itemPrefix + p + options.itemSuffix);

  // Join with separator and line breaks
  const joinedText = parts.join(options.separator + lineBreak);

  // Add list prefix and suffix
  const result = [options.listPrefix, joinedText, options.listSuffix]
    .filter((part) => part !== '')
    .join(lineBreak);

  return result;
}
