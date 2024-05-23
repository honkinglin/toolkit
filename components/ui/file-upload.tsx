import React, { useCallback, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  accept?: string;
  maxSize?: number; // in bytes
  disabled?: boolean;
  selectedFile?: File | null;
  title?: string;
  description?: string;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  onClear,
  accept,
  maxSize,
  disabled = false,
  selectedFile,
  title = 'Drag and drop a file here, or click to select a file',
  description,
  className,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file) {
        if (maxSize && file.size > maxSize) {
          alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
          return;
        }
        onFileSelect(file);
      }
    },
    [disabled, maxSize, onFileSelect]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (maxSize && file.size > maxSize) {
          alert(`File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit`);
          return;
        }
        onFileSelect(file);
      }
    },
    [maxSize, onFileSelect]
  );

  const handleClear = useCallback(() => {
    onClear?.();
  }, [onClear]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full', className)}>
      {!selectedFile ? (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
            isDragOver ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && document.getElementById('file-input')?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">{title}</p>
          {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
          <p className="mt-1 text-xs text-gray-500">
            {maxSize && `Max file size: ${Math.round(maxSize / 1024 / 1024)}MB`}
          </p>

          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            disabled={disabled}
          />
        </div>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
            </div>
            {onClear && (
              <button
                onClick={handleClear}
                className="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
