'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { types as extensionToMimeType, extensions as mimeTypeToExtension } from 'mime-types';
import mimeDb from 'mime-db';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ToolLayout } from '@/components/layout/tool-layout';
import { VirtualSelect } from '@/components/ui/virtual-select';
import { VirtualTable } from '@/components/ui/virtual-table';

export default function MimeTypesPage() {
  const t = useTranslations('mimeTypes');

  const [selectedMimeType, setSelectedMimeType] = useState<string>('');
  const [selectedExtension, setSelectedExtension] = useState<string>('');

  // Enhanced MIME data combining both libraries for comprehensive coverage
  const enhancedMimeData = useMemo(() => {
    const combinedData = new Map<string, string[]>();

    // Add data from mime-types library
    Object.entries(mimeTypeToExtension).forEach(([mimeType, extensions]) => {
      if (extensions && extensions.length > 0) {
        combinedData.set(mimeType, extensions);
      }
    });

    // Add data from mime-db for additional coverage
    Object.entries(mimeDb).forEach(([mimeType, data]) => {
      if (data.extensions && data.extensions.length > 0) {
        const existing = combinedData.get(mimeType) || [];
        const merged = Array.from(new Set([...existing, ...data.extensions]));
        combinedData.set(mimeType, merged);
      }
    });

    return combinedData;
  }, []);

  // Enhanced extension to MIME type mapping
  const enhancedExtensionData = useMemo(() => {
    const extToMime = new Map<string, string>();

    // Add from mime-types
    Object.entries(extensionToMimeType).forEach(([ext, mimeType]) => {
      extToMime.set(ext, mimeType);
    });

    // Add from mime-db
    Object.entries(mimeDb).forEach(([mimeType, data]) => {
      if (data.extensions) {
        data.extensions.forEach((ext) => {
          if (!extToMime.has(ext)) {
            // Don't override existing mappings
            extToMime.set(ext, mimeType);
          }
        });
      }
    });

    return extToMime;
  }, []);

  // Prepare options for dropdowns
  const mimeToExtensionsOptions = useMemo(
    () => Array.from(enhancedMimeData.keys()).sort(),
    [enhancedMimeData]
  );

  const extensionToMimeTypeOptions = useMemo(
    () =>
      Array.from(enhancedExtensionData.keys())
        .map((ext) => `.${ext}`)
        .sort(),
    [enhancedExtensionData]
  );

  // Get extensions for selected MIME type
  const extensionsFound = useMemo(() => {
    if (!selectedMimeType) return [];
    return enhancedMimeData.get(selectedMimeType) || [];
  }, [selectedMimeType, enhancedMimeData]);

  // Get MIME type for selected extension
  const mimeTypeFound = useMemo(() => {
    if (!selectedExtension) return '';
    const ext = selectedExtension.replace('.', '');
    return enhancedExtensionData.get(ext) || '';
  }, [selectedExtension, enhancedExtensionData]);

  // Prepare table data
  const mimeInfos = useMemo(
    () =>
      Array.from(enhancedMimeData.entries())
        .map(([mimeType, extensions]) => ({
          mimeType,
          extensions: extensions || [],
        }))
        .sort((a, b) => a.mimeType.localeCompare(b.mimeType)),
    [enhancedMimeData]
  );

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card className="w-full h-fit">
        <CardHeader>
          <Label className="text-lg font-semibold">{t('mimeToExtension.title')}</Label>
          <p className="text-sm text-muted-foreground">{t('mimeToExtension.description')}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('mimeToExtension.selectLabel')}</Label>
            <VirtualSelect
              options={mimeToExtensionsOptions}
              value={selectedMimeType}
              onValueChange={setSelectedMimeType}
              placeholder={t('mimeToExtension.placeholder')}
              searchPlaceholder="Search MIME types..."
            />
          </div>

          {extensionsFound.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">
                {t('mimeToExtension.resultText')}{' '}
                <Badge variant="secondary">{selectedMimeType}</Badge>{' '}
                {t('mimeToExtension.mimeType')}:
              </p>
              <div className="flex flex-wrap gap-2">
                {extensionsFound.map((extension) => (
                  <Badge key={extension} variant="default">
                    .{extension}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t pt-4 mt-6">
            <Label className="text-lg font-semibold">{t('extensionToMime.title')}</Label>
            <p className="text-sm text-muted-foreground mb-4">{t('extensionToMime.description')}</p>

            <div className="space-y-2">
              <Label>{t('extensionToMime.selectLabel')}</Label>
              <VirtualSelect
                options={extensionToMimeTypeOptions}
                value={selectedExtension}
                onValueChange={setSelectedExtension}
                placeholder={t('extensionToMime.placeholder')}
                searchPlaceholder="Search extensions..."
              />
            </div>

            {mimeTypeFound && (
              <div className="space-y-2 mt-4">
                <p className="text-sm">
                  {t('extensionToMime.resultText')}{' '}
                  <Badge variant="secondary">{selectedExtension}</Badge>{' '}
                  {t('extensionToMime.fileExtension')}:
                </p>
                <div>
                  <Badge variant="default">{mimeTypeFound}</Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-fit">
        <CardHeader>
          <Label className="text-lg font-semibold">{t('table.title')}</Label>
          <p className="text-sm text-muted-foreground">{t('table.description')}</p>
        </CardHeader>
        <CardContent>
          <VirtualTable
            data={mimeInfos}
            mimeTypeHeader={t('table.mimeTypeHeader')}
            extensionsHeader={t('table.extensionsHeader')}
          />
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
