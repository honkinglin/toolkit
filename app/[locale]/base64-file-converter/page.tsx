'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/ui/file-upload';
import { useCopy } from '@/hooks/use-copy';
import { useBase64FileConverter } from '@/hooks/use-base64-file-converter';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function Base64FileConverterPage() {
  const t = useTranslations('sidebar');
  const b64 = useTranslations('base64FileConverter');

  const {
    // Base64 to file
    fileName,
    setFileName,
    fileExtension,
    setFileExtension,
    base64Input,
    setBase64Input,
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
    canPreviewImage,
    canDownloadFile,
  } = useBase64FileConverter();

  const { copy: copyFileBase64 } = useCopy({
    source: fileBase64,
    successMessage: 'Base64 string copied to the clipboard',
  });

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  return (
    <ToolLayout
      title={t('base64FileConverter')}
      description="将字符串、文件或图像转换为其 Base64 表示形式并反之亦然。"
    >
      {/* Base64 to File */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{b64('base64ToFile')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File name and extension */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="fileName">{b64('fileName')}</Label>
              <Input
                id="fileName"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder={b64('fileNamePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileExtension">{b64('extension')}</Label>
              <Input
                id="fileExtension"
                value={fileExtension}
                onChange={(e) => setFileExtension(e.target.value)}
                placeholder={b64('extensionPlaceholder')}
              />
            </div>
          </div>

          {/* Base64 input */}
          <div className="space-y-2">
            <Label htmlFor="base64Input">{b64('base64Input')}</Label>
            <Textarea
              id="base64Input"
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder={b64('base64InputPlaceholder')}
              rows={5}
              className="font-mono max-h-[180px]"
            />
            {!base64Validation.isValid && base64Input && (
              <p className="text-sm text-red-500">{b64('invalidBase64')}</p>
            )}
          </div>

          {/* Image preview */}
          {imagePreview && (
            <div className="flex justify-center py-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full max-h-96 object-contain border border-gray-200 rounded"
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-center gap-3">
            <Button onClick={previewImage} disabled={!canPreviewImage} variant="outline">
              {b64('previewImage')}
            </Button>
            <Button onClick={downloadFile} disabled={!canDownloadFile}>
              {b64('downloadFile')}
            </Button>
          </div>

          {base64Input && (
            <div className="flex justify-center">
              <Button onClick={clearBase64Input} variant="ghost" size="sm">
                {b64('clear')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File to Base64 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{b64('fileToBase64')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File upload */}
          <FileUpload
            onFileSelect={handleFileUpload}
            onClear={clearFileUpload}
            selectedFile={selectedFile}
            title={b64('fileUploadTitle')}
            description={b64('fileUploadDescription')}
            maxSize={maxFileSize}
            accept="*/*"
          />

          {/* Base64 output */}
          <div className="space-y-2">
            <Label>{b64('fileInBase64')}</Label>
            <Textarea
              value={fileBase64}
              readOnly
              placeholder={b64('fileInBase64')}
              rows={8}
              className="font-mono bg-gray-50 text-xs max-h-[180px]"
            />
          </div>

          {/* Copy button */}
          {fileBase64 && (
            <div className="flex justify-center">
              <Button onClick={copyFileBase64}>{b64('copy')}</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
