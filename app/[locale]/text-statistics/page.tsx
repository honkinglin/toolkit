'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ToolLayout } from '@/components/layout/tool-layout';
import { getStringSizeInBytes, formatBytes } from '@/lib/text-statistics';

export default function TextStatisticsPage() {
  const t = useTranslations('text.textStatistics');
  const [text, setText] = useState('');

  // Calculate statistics
  const statistics = useMemo(() => {
    const characterCount = text.length;
    const wordCount = text === '' ? 0 : text.split(/\s+/).filter((word) => word.length > 0).length;
    const lineCount = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;
    const byteSize = getStringSizeInBytes(text);

    return {
      characterCount,
      wordCount,
      lineCount,
      byteSize,
      formattedByteSize: formatBytes(byteSize),
    };
  }, [text]);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card className="w-3xl">
        <CardContent className="p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('placeholder')}
            rows={8}
            className="min-h-32 mb-6"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {statistics.characterCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{t('characterCount')}</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {statistics.wordCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{t('wordCount')}</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {statistics.lineCount.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">{t('lineCount')}</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {statistics.formattedByteSize}
              </div>
              <div className="text-sm text-muted-foreground">{t('byteSize')}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
