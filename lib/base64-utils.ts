import {
  extension as getExtensionFromMimeType,
  lookup as getMimeTypeFromExtension,
} from 'mime-types';

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

// Common MIME type signatures for base64 detection
const commonMimeTypesSignatures = {
  JVBERi0: 'application/pdf',
  R0lGODdh: 'image/gif',
  R0lGODlh: 'image/gif',
  iVBORw0KGgo: 'image/png',
  '/9j/': 'image/jpeg',
};

// File conversion utilities
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function base64ToBlob(base64: string, mimeType?: string): Blob {
  // Remove any data URL prefix
  const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '');

  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType || 'application/octet-stream' });
}

export function downloadBase64AsFile(base64: string, filename: string, mimeType?: string) {
  if (!base64) {
    throw new Error('Base64 string is empty');
  }

  let finalBase64 = base64;
  let finalMimeType = mimeType;

  // If base64 doesn't have data URL prefix, detect MIME type and add it
  if (!base64.startsWith('data:')) {
    finalMimeType = finalMimeType || getMimeTypeFromBase64(base64) || 'application/octet-stream';
    finalBase64 = `data:${finalMimeType};base64,${base64}`;
  }

  // Handle filename extension intelligently
  let finalFilename = filename;
  if (finalMimeType) {
    const detectedExtension = getFileExtensionFromMimeType(finalMimeType);

    // If filename has no extension, add the detected one
    if (!filename.includes('.') && detectedExtension) {
      finalFilename = `${filename}.${detectedExtension}`;
    }
    // If filename has an extension but it doesn't match the MIME type, prefer the MIME type extension
    else if (filename.includes('.') && detectedExtension) {
      const currentExtension = filename.split('.').pop()?.toLowerCase();
      const expectedMimeType = getMimeTypeFromFileExtension(currentExtension || '');

      // If the current extension doesn't match the MIME type, use the correct extension
      if (expectedMimeType !== finalMimeType) {
        const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
        finalFilename = `${nameWithoutExt}.${detectedExtension}`;
      }
    }
  }

  const blob = base64ToBlob(finalBase64, finalMimeType);
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = finalFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  URL.revokeObjectURL(url);
}
export function getMimeTypeFromBase64(base64: string): string | null {
  try {
    // First check if it's a data URL with explicit MIME type
    const dataUrlMatch = base64.match(/data:(.*?);base64/i);
    if (dataUrlMatch && dataUrlMatch[1]) {
      return dataUrlMatch[1];
    }

    // Clean the base64 string (remove data URL prefix if present)
    const cleanBase64 = base64.replace(/^data:[^;]+;base64,/, '');

    // Check common MIME type signatures
    for (const [signature, mimeType] of Object.entries(commonMimeTypesSignatures)) {
      if (cleanBase64.startsWith(signature)) {
        return mimeType;
      }
    }

    // Fallback to binary signature detection for some formats
    const binaryString = atob(cleanBase64.substring(0, 50));
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Check file signatures
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return 'image/jpeg';
    }
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      return 'image/png';
    }
    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      return 'image/gif';
    }
    if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
      return 'application/pdf';
    }

    return null;
  } catch {
    return null;
  }
}
export function getFileExtensionFromMimeType(mimeType: string): string {
  // Use mime-types library for better MIME type to extension mapping
  const extension = getExtensionFromMimeType(mimeType);
  if (extension) {
    return extension;
  }

  // Fallback to manual mapping for edge cases
  const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  };

  return mimeToExt[mimeType] || '';
}

export function getMimeTypeFromFileExtension(extension: string): string | null {
  // Use mime-types library to get MIME type from extension
  const mimeType = getMimeTypeFromExtension(extension);
  return mimeType || null;
}

export function isImageMimeType(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function createImagePreviewFromBase64(base64: string): HTMLImageElement | null {
  try {
    if (!base64) {
      throw new Error('Base64 string is empty');
    }

    const mimeType = getMimeTypeFromBase64(base64);
    if (!mimeType || !isImageMimeType(mimeType)) {
      return null;
    }

    const img = document.createElement('img');

    // Ensure proper data URL format
    if (base64.startsWith('data:')) {
      img.src = base64;
    } else {
      img.src = `data:${mimeType};base64,${base64}`;
    }

    img.style.maxWidth = '100%';
    img.style.maxHeight = '400px';
    img.style.objectFit = 'contain';

    return img;
  } catch {
    return null;
  }
}
