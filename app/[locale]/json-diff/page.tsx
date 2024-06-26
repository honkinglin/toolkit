'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import JSON5 from 'json5';
import isEqual from 'lodash/isEqual';

import { diff } from './diff-utils';
import { DiffRootViewer } from './diff-viewer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function JsonDiffPage() {
  const t = useTranslations('jsonDiff');
  const [rawLeftJson, setRawLeftJson] = useState('');
  const [rawRightJson, setRawRightJson] = useState('');
  const [onlyShowDifferences, setOnlyShowDifferences] = useState(false);

  // Validation function to check if JSON is valid
  const isValidJson = (value: string): boolean => {
    if (value === '') return true;
    try {
      JSON5.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  // Parse JSON with error handling
  const leftJson = useMemo(() => {
    try {
      return rawLeftJson === '' ? undefined : JSON5.parse(rawLeftJson);
    } catch {
      return undefined;
    }
  }, [rawLeftJson]);

  const rightJson = useMemo(() => {
    try {
      return rawRightJson === '' ? undefined : JSON5.parse(rawRightJson);
    } catch {
      return undefined;
    }
  }, [rawRightJson]);

  // Calculate diff result
  const result = useMemo(() => {
    if (leftJson === undefined || rightJson === undefined) return null;
    return diff(leftJson, rightJson, { onlyShowDifferences });
  }, [leftJson, rightJson, onlyShowDifferences]);

  const jsonAreTheSame = useMemo(() => {
    if (leftJson === undefined || rightJson === undefined) return false;
    return isEqual(leftJson, rightJson);
  }, [leftJson, rightJson]);

  const showResults = leftJson !== undefined && rightJson !== undefined;

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      {/* JSON Input Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Left JSON Input */}
        <Card className="w-full">
          <CardHeader>
            <Label htmlFor="leftJson">{t('yourFirstJson')}</Label>
          </CardHeader>
          <CardContent>
            <Textarea
              id="leftJson"
              value={rawLeftJson}
              onChange={(e) => setRawLeftJson(e.target.value)}
              placeholder={t('pasteFirstJsonHere')}
              rows={15}
              className={`font-mono min-h-[200px] max-h-[380px] ${!isValidJson(rawLeftJson) ? 'border-red-500' : ''}`}
            />
            {!isValidJson(rawLeftJson) && (
              <p className="text-sm text-red-500">{t('invalidJsonFormat')}</p>
            )}
          </CardContent>
        </Card>

        {/* Right JSON Input */}
        <Card className="w-full">
          <CardHeader>
            <Label htmlFor="rightJson">{t('yourJsonToCompare')}</Label>
          </CardHeader>
          <CardContent>
            <Textarea
              id="rightJson"
              value={rawRightJson}
              onChange={(e) => setRawRightJson(e.target.value)}
              placeholder={t('pasteJsonToCompareHere')}
              rows={15}
              className={`font-mono min-h-[200px] max-h-[380px] ${!isValidJson(rawRightJson) ? 'border-red-500' : ''}`}
            />
            {!isValidJson(rawRightJson) && (
              <p className="text-sm text-red-500">{t('invalidJsonFormat')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="onlyShowDifferences"
                checked={onlyShowDifferences}
                onCheckedChange={setOnlyShowDifferences}
              />
              <Label htmlFor="onlyShowDifferences">{t('onlyShowDifferences')}</Label>
            </div>
          </div>

          {/* Diff Result */}
          <Card data-testid="diff-result" className="w-full">
            <CardContent>
              {jsonAreTheSame ? (
                <div className="text-center text-muted-foreground">{t('jsonAreTheSame')}</div>
              ) : (
                result && <DiffRootViewer diff={result} />
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </ToolLayout>
  );
}
