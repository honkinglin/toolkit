'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import JSON5 from 'json5';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopy } from '@/hooks/use-copy';

export default function JsonCompressPage() {
  const t = useTranslations('jsonCompress');

  const defaultValue = '{\n\t"hello": [\n\t\t"world"\n\t]\n}';
  const [rawJson, setRawJson] = useState(defaultValue);

  // 验证JSON是否有效
  const isValidJson = (value: string): boolean => {
    if (value === '') return true;
    try {
      JSON5.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  // 压缩JSON
  const compressJson = (): string => {
    if (!rawJson || !isValidJson(rawJson)) {
      return '';
    }

    const parsedObject = JSON5.parse(rawJson);
    return JSON.stringify(parsedObject, null, 0);
  };

  const compressedJson = compressJson();
  const validationError = !isValidJson(rawJson) ? t('validation.invalid') : '';

  const { copy } = useCopy({
    source: compressedJson,
    successMessage: t('copy.success'),
    errorMessage: t('copy.error'),
  });

  const handleCopy = () => {
    copy();
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-6xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">{t('input.title')}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={rawJson}
                  onChange={(e) => setRawJson(e.target.value)}
                  placeholder={t('input.placeholder')}
                  className={`h-full min-h-[400px] font-mono text-sm resize-none ${
                    validationError ? 'border-red-500' : ''
                  }`}
                  spellCheck={false}
                />
                {validationError && <p className="text-red-500 text-sm mt-2">{validationError}</p>}
              </div>
            </CardContent>
          </Card>

          {/* 输出区域 */}
          <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('output.title')}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                disabled={!compressedJson}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {t('output.copy')}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={compressedJson}
                  readOnly
                  className="h-full min-h-[400px] font-mono text-sm resize-none bg-muted"
                  spellCheck={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
