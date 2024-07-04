'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import cronstrue from 'cronstrue';
import { isValidCron } from 'cron-validator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCronHelpers, getCronLabels } from './constants';

interface CronstrueConfig {
  verbose: boolean;
  dayOfWeekStartIndexZero: boolean;
  use24HourTimeFormat: boolean;
  throwExceptionOnParseError: boolean;
}

interface Helper {
  symbol: string;
  meaning: string;
  example: string;
  equivalent: string;
}

interface CronLabels {
  formatTitle: string;
  symbol: string;
  meaning: string;
  example: string;
  equivalent: string;
  placeholder: string;
  invalid: string;
  verbose: string;
  use24HourFormat: string;
  dayStartsAtZero: string;
}

export default function CrontabExpressionGeneratorPage() {
  const t = useTranslations('crontabExpressionGenerator');
  const locale = useLocale();
  const isMobile = useIsMobile();

  const [cron, setCron] = useState('40 * * * *');
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [labels, setLabels] = useState<CronLabels | null>(null);
  const [loading, setLoading] = useState(true);
  const [cronstrueConfig, setCronstrueConfig] = useState<CronstrueConfig>({
    verbose: true,
    dayOfWeekStartIndexZero: true,
    use24HourTimeFormat: true,
    throwExceptionOnParseError: true,
  });

  // 加载当前语言的数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [helpersData, labelsData] = await Promise.all([
          getCronHelpers(locale),
          getCronLabels(locale),
        ]);
        setHelpers(helpersData);
        setLabels(labelsData);
      } catch (error) {
        console.error('Failed to load cron data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [locale]);

  const isCronValid = (value: string): boolean => {
    return isValidCron(value, { allowBlankDay: true, alias: true, seconds: true });
  };

  const getCronString = (): string => {
    if (isCronValid(cron)) {
      try {
        return cronstrue.toString(cron, cronstrueConfig);
      } catch {
        return 'Invalid cron expression';
      }
    }
    return 'Invalid cron expression';
  };

  const updateConfig = (key: keyof CronstrueConfig, value: boolean) => {
    setCronstrueConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-4xl space-y-6">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {/* 主要输入和显示区域 */}
            <Card>
              <CardContent className="p-6">
                <div className="mx-auto max-w-sm mb-6">
                  <Input
                    value={cron}
                    onChange={(e) => setCron(e.target.value)}
                    placeholder={labels?.placeholder || '* * * * *'}
                    className={`text-3xl font-mono text-center p-3 ${
                      !isCronValid(cron) ? 'border-red-500' : ''
                    }`}
                  />
                  {!isCronValid(cron) && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                      {labels?.invalid || 'This cron expression is invalid'}
                    </p>
                  )}
                </div>

                <div className="text-center text-xl opacity-80 mb-4 min-h-[2rem]">
                  {getCronString()}
                </div>

                <Separator className="my-6" />

                {/* 配置选项 */}
                <div className="flex justify-center">
                  <div className="space-y-4 min-w-[300px]">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verbose" className="text-sm font-medium">
                        {labels?.verbose || 'Verbose'}
                      </Label>
                      <Switch
                        id="verbose"
                        checked={cronstrueConfig.verbose}
                        onCheckedChange={(checked) => updateConfig('verbose', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeFormat" className="text-sm font-medium">
                        {labels?.use24HourFormat || 'Use 24 hour time format'}
                      </Label>
                      <Switch
                        id="timeFormat"
                        checked={cronstrueConfig.use24HourTimeFormat}
                        onCheckedChange={(checked) => updateConfig('use24HourTimeFormat', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="dayStart" className="text-sm font-medium">
                        {labels?.dayStartsAtZero || 'Days start at 0'}
                      </Label>
                      <Switch
                        id="dayStart"
                        checked={cronstrueConfig.dayOfWeekStartIndexZero}
                        onCheckedChange={(checked) =>
                          updateConfig('dayOfWeekStartIndexZero', checked)
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 语法说明和帮助表格 */}
            <Card>
              <CardHeader>
                <CardTitle>{labels?.formatTitle || 'Cron Expression Format'}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="overflow-auto p-4 bg-muted rounded-md text-sm mb-6">
                  {`┌──────────── [optional] seconds (0 - 59)
| ┌────────── minute (0 - 59)
| | ┌──────── hour (0 - 23)
| | | ┌────── day of month (1 - 31)
| | | | ┌──── month (1 - 12) OR jan,feb,mar,apr ...
| | | | | ┌── day of week (0 - 6, sunday=0) OR sun,mon ...
| | | | | |
* * * * * * command`}
                </pre>

                {/* 移动端显示卡片，桌面端显示表格 */}
                {isMobile ? (
                  <div className="space-y-3">
                    {helpers.map(({ symbol, meaning, example, equivalent }) => (
                      <Card key={symbol} className="border-none shadow-sm">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {labels?.symbol || 'Symbol'}:{' '}
                              </span>
                              <strong className="font-mono">{symbol}</strong>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                {labels?.meaning || 'Meaning'}:{' '}
                              </span>
                              <strong>{meaning}</strong>
                            </div>
                            {example && (
                              <div>
                                <span className="text-sm text-muted-foreground">
                                  {labels?.example || 'Example'}:{' '}
                                </span>
                                <strong>
                                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                                    {example}
                                  </code>
                                </strong>
                              </div>
                            )}
                            {equivalent && (
                              <div>
                                <span className="text-sm text-muted-foreground">
                                  {labels?.equivalent || 'Equivalent'}:{' '}
                                </span>
                                <strong>{equivalent}</strong>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">
                          {labels?.symbol || 'Symbol'}
                        </TableHead>
                        <TableHead className="font-semibold">
                          {labels?.meaning || 'Meaning'}
                        </TableHead>
                        <TableHead className="font-semibold">
                          {labels?.example || 'Example'}
                        </TableHead>
                        <TableHead className="font-semibold">
                          {labels?.equivalent || 'Equivalent'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {helpers.map(({ symbol, meaning, example, equivalent }) => (
                        <TableRow key={symbol}>
                          <TableCell className="font-mono font-semibold">{symbol}</TableCell>
                          <TableCell>{meaning}</TableCell>
                          <TableCell>
                            {example && (
                              <code className="bg-muted px-2 py-1 rounded text-sm">{example}</code>
                            )}
                          </TableCell>
                          <TableCell>{equivalent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
