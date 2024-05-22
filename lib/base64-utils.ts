export function textToBase64(text: string, options: { makeUrlSafe?: boolean } = {}) {
  if (!text) return '';

  try {
    const encoded = btoa(unescape(encodeURIComponent(text)));

    if (options.makeUrlSafe) {
      return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    }

    return encoded;
  } catch {
    return '';
  }
}

export function base64ToText(base64: string, options: { makeUrlSafe?: boolean } = {}) {
  if (!base64) return '';

  try {
    let normalizedBase64 = base64;

    if (options.makeUrlSafe) {
      // Convert URL-safe base64 back to standard base64
      normalizedBase64 = base64.replace(/-/g, '+').replace(/_/g, '/');

      // Add padding if needed
      while (normalizedBase64.length % 4) {
        normalizedBase64 += '=';
      }
    }

    return decodeURIComponent(escape(atob(normalizedBase64)));
  } catch {
    throw new Error('Invalid base64 string');
  }
}

export function isValidBase64(base64: string, options: { makeUrlSafe?: boolean } = {}) {
  if (!base64) return true; // Empty string is valid

  try {
    base64ToText(base64, options);
    return true;
  } catch {
    return false;
  }
}
