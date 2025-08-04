'use client';

import React, { useState, useMemo } from 'react';
import { evaluate } from 'mathjs';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ToolLayout } from '@/components/layout/tool-layout';
import { withDefaultOnError } from '@/lib/utils';

export default function MathEvaluatorPage() {
  const t = useTranslations('math.mathEvaluator');
  const [expression, setExpression] = useState('');

  const result = useMemo(() => {
    if (!expression.trim()) return '';
    return withDefaultOnError(() => {
      const evalResult = evaluate(expression);
      return evalResult?.toString() ?? '';
    }, '');
  }, [expression]);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={t('placeholder')}
            className="font-mono min-h-[100px] w-[400px]"
            autoFocus
          />
        </div>

        {result && (
          <Card>
            <CardHeader>
              <CardTitle>{t('resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="font-mono text-lg p-4 bg-muted rounded-md">{result}</div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
