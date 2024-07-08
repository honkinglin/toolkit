'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import JSON5 from 'json5';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCopy } from '@/hooks/use-copy';
import { AlertCircle, Copy } from 'lucide-react';

// CSV conversion utilities
function getHeaders(array: Record<string, unknown>[]): string[] {
  const headers = new Set<string>();
  array.forEach((item) => Object.keys(item).forEach((key) => headers.add(key)));
  return Array.from(headers);
}

function serializeValue(value: unknown): string {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return '';
  }

  const valueAsString = String(value)
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/"/g, '\\"');

  if (valueAsString.includes(',')) {
    return `"${valueAsString}"`;
  }

  return valueAsString;
}

function convertArrayToCsv(array: Record<string, unknown>[]): string {
  const headers = getHeaders(array);
  const rows = array.map((item) => headers.map((header) => serializeValue(item[header])));
  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export default function JsonToCsvPage() {
  const t = useTranslations('jsonToCsv');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const { copy } = useCopy({
    source: output,
    successMessage: t('copyMessages.success'),
    errorMessage: t('copyMessages.error'),
  });

  const validateAndConvert = (value: string) => {
    setError('');

    if (value.trim() === '') {
      setOutput('');
      return;
    }

    try {
      const parsed = JSON5.parse(value);

      if (!Array.isArray(parsed)) {
        setError(t('validation.mustBeArray'));
        setOutput('');
        return;
      }

      if (parsed.length === 0) {
        setError(t('validation.arrayNotEmpty'));
        setOutput('');
        return;
      }

      if (
        !parsed.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
      ) {
        setError(t('validation.mustBeObjectArray'));
        setOutput('');
        return;
      }

      const csvResult = convertArrayToCsv(parsed);
      setOutput(csvResult);
    } catch {
      setError(t('validation.invalidJson'));
      setOutput('');
    }
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    validateAndConvert(value);
  };

  const handleCopy = () => {
    copy();
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* 输入区域 */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">{t('input.label')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea
              id="json-input"
              placeholder={t('input.placeholder')}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              className={`h-full min-h-[400px] font-mono text-sm resize-none ${
                error ? 'border-red-500' : ''
              }`}
              spellCheck={false}
            />
            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-600 mt-2">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 输出区域 */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t('output.label')}</CardTitle>
            <Button
              onClick={handleCopy}
              disabled={!output}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <Copy className="h-4 w-4" />
              {t('copy')}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 relative">
              <Textarea
                id="csv-output"
                value={output}
                readOnly
                className="h-full min-h-[400px] font-mono text-sm resize-none bg-muted"
                placeholder={t('output.placeholder')}
                spellCheck={false}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
