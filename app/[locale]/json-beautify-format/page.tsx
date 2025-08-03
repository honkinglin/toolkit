'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import JSON5 from 'json5';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopy } from '@/hooks/use-copy';

export default function JsonBeautifyFormatPage() {
  const t = useTranslations('jsonBeautifyFormat');

  const [rawJson, setRawJson] = useState('{"hello": "world", "foo": "bar"}');
  const [indentSize, setIndentSize] = useState(3);
  const [sortKeys, setSortKeys] = useState(true);

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

  // 排序对象键
  const sortObjectKeys = (obj: unknown): unknown => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }

    return Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .reduce(
        (sortedObj, key) => {
          (sortedObj as Record<string, unknown>)[key] = sortObjectKeys(
            (obj as Record<string, unknown>)[key]
          );
          return sortedObj;
        },
        {} as Record<string, unknown>
      );
  };

  // 格式化JSON
  const formatJson = (): string => {
    if (!rawJson || !isValidJson(rawJson)) {
      return '';
    }

    const parsedObject = JSON5.parse(rawJson);
    const processedObject = sortKeys ? sortObjectKeys(parsedObject) : parsedObject;
    return JSON.stringify(processedObject, null, indentSize);
  };

  const prettifiedJson = formatJson();
  const validationError = !isValidJson(rawJson) ? t('validation.invalid') : '';

  const { copy } = useCopy({
    source: prettifiedJson,
    successMessage: t('copy.success'),
    errorMessage: t('copy.error'),
  });

  const handleCopy = () => {
    copy();
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-6xl space-y-6">
        {/* 配置选项 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="flex gap-8 items-center">
                <div className="flex items-center gap-3">
                  <Label htmlFor="sortKeys" className="text-sm font-medium whitespace-nowrap">
                    {t('config.sortKeys')}:
                  </Label>
                  <Switch id="sortKeys" checked={sortKeys} onCheckedChange={setSortKeys} />
                </div>

                <div className="flex items-center gap-3">
                  <Label htmlFor="indentSize" className="text-sm font-medium whitespace-nowrap">
                    {t('config.indentSize')}:
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIndentSize(Math.max(0, indentSize - 1))}
                      disabled={indentSize <= 0}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm font-mono">{indentSize}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIndentSize(Math.min(10, indentSize + 1))}
                      disabled={indentSize >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
                disabled={!prettifiedJson}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {t('output.copy')}
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={prettifiedJson}
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
