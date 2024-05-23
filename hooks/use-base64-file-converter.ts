import { useState, useCallback } from 'react';
import {
  fileToBase64,
  downloadBase64AsFile,
  getMimeTypeFromBase64,
  getFileExtensionFromMimeType,
  createImagePreviewFromBase64,
} from '@/lib/base64-utils';

export function useBase64FileConverter() {
  // Base64 to file states
  const [fileName, setFileName] = useState('file');
  const [fileExtension, setFileExtension] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // File to base64 states
  const [fileBase64, setFileBase64] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Validation - improved to handle both raw base64 and data URLs
  const base64Validation = {
    isValid: base64Input ? isValidBase64ForFile(base64Input.trim()) : true,
    error: base64Input && !isValidBase64ForFile(base64Input.trim()) ? 'Invalid Base64 string' : '',
  };

  // Helper function to validate base64 for file operations
  function isValidBase64ForFile(base64: string): boolean {
    if (!base64) return true;

    try {
      // Handle data URLs
      if (base64.startsWith('data:')) {
        const base64Part = base64.split(',')[1];
        if (!base64Part) return false;
        atob(base64Part);
        return true;
      }

      // Handle raw base64
      atob(base64);
      return true;
    } catch {
      return false;
    }
  }

  // Auto-detect file extension from base64
  const updateFileExtension = useCallback((base64: string) => {
    if (!base64) return;

    const mimeType = getMimeTypeFromBase64(base64);
    if (mimeType) {
      const extension = getFileExtensionFromMimeType(mimeType);
      if (extension) {
        setFileExtension(extension);
      }
    }
  }, []);

  // Handle base64 input change
  const handleBase64InputChange = useCallback(
    (value: string) => {
      setBase64Input(value);
      updateFileExtension(value);
      // Clear preview when input changes
      setImagePreview(null);
    },
    [updateFileExtension]
  );

  // Preview image from base64
  const previewImage = useCallback(() => {
    if (!base64Validation.isValid || !base64Input) {
      setImagePreview(null);
      return;
    }

    try {
      const img = createImagePreviewFromBase64(base64Input);
      if (img) {
        setImagePreview(img.src);
      } else {
        setImagePreview(null);
      }
    } catch {
      setImagePreview(null);
    }
  }, [base64Input, base64Validation.isValid]);

  // Download file from base64
  const downloadFile = useCallback(() => {
    if (!base64Validation.isValid || !base64Input) return;

    try {
      const mimeType = getMimeTypeFromBase64(base64Input);

      // Build filename with extension
      let fullFileName = fileName;
      if (fileExtension) {
        // Remove existing extension if present, then add the correct one
        const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
        fullFileName = `${nameWithoutExt}.${fileExtension}`;
      } else if (mimeType) {
        // Auto-detect extension from MIME type if not specified
        const autoExtension = getFileExtensionFromMimeType(mimeType);
        if (autoExtension) {
          const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
          fullFileName = `${nameWithoutExt}.${autoExtension}`;
        }
      }

      downloadBase64AsFile(base64Input, fullFileName, mimeType || undefined);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  }, [base64Input, fileName, fileExtension, base64Validation.isValid]);

  // Handle file upload
  const handleFileUpload = useCallback(async (file: File) => {
    setSelectedFile(file);

    try {
      const base64 = await fileToBase64(file);
      setFileBase64(base64);
    } catch (error) {
      console.error('Failed to convert file to base64:', error);
      setFileBase64('');
    }
  }, []);

  // Clear file upload
  const clearFileUpload = useCallback(() => {
    setSelectedFile(null);
    setFileBase64('');
  }, []);

  // Clear base64 input
  const clearBase64Input = useCallback(() => {
    setBase64Input('');
    setImagePreview(null);
    setFileExtension('');
  }, []);

  return {
    // Base64 to file
    fileName,
    setFileName,
    fileExtension,
    setFileExtension,
    base64Input,
    setBase64Input: handleBase64InputChange,
    base64Validation,
    imagePreview,
    previewImage,
    downloadFile,
    clearBase64Input,

    // File to base64
    fileBase64,
    selectedFile,
    handleFileUpload,
    clearFileUpload,

    // Computed values
    canPreviewImage: base64Validation.isValid && base64Input.length > 0,
    canDownloadFile: base64Validation.isValid && base64Input.length > 0,
  };
}
