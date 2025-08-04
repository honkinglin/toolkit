'use client';

import React, { useState, useMemo } from 'react';
import { addMilliseconds, formatRelative, format } from 'date-fns';
import { enGB, zhCN } from 'date-fns/locale';
import { useTranslations, useLocale } from 'next-intl';
import { Clock, Minus, Plus, CalendarIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ToolLayout } from '@/components/layout/tool-layout';
import { formatMsDuration } from '@/lib/eta-calculator';
import { cn } from '@/lib/utils';

const timeSpanOptions = [
  { label: 'milliseconds', value: '1' },
  { label: 'seconds', value: '1000' },
  { label: 'minutes', value: '60000' },
  { label: 'hours', value: '3600000' },
  { label: 'days', value: '86400000' },
];

export default function EtaCalculatorPage() {
  const t = useTranslations('math.etaCalculator');
  const locale = useLocale();

  const [unitCount, setUnitCount] = useState(186);
  const [unitPerTimeSpan, setUnitPerTimeSpan] = useState(3);
  const [timeSpan, setTimeSpan] = useState(5);
  const [timeSpanUnitMultiplier, setTimeSpanUnitMultiplier] = useState(60000); // minutes
  const [startedAt, setStartedAt] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [timeInput, setTimeInput] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const durationMs = useMemo(() => {
    const timeSpanMs = timeSpan * timeSpanUnitMultiplier;
    return unitCount / (unitPerTimeSpan / timeSpanMs);
  }, [unitCount, unitPerTimeSpan, timeSpan, timeSpanUnitMultiplier]);

  const endAt = useMemo(() => {
    const dateLocale = locale === 'zh' ? zhCN : enGB;
    return formatRelative(addMilliseconds(startedAt, durationMs), Date.now(), {
      locale: dateLocale,
    });
  }, [startedAt, durationMs, locale]);

  const incrementValue = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter((prev) => prev + 1);
  };

  const decrementValue = (setter: React.Dispatch<React.SetStateAction<number>>, min = 1) => {
    setter((prev) => Math.max(min, prev - 1));
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6">
        <div className="text-sm text-muted-foreground text-justify">{t('example')}</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t('amountLabel')}</Label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrementValue(setUnitCount, 1)}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={unitCount}
                onChange={(e) => setUnitCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => incrementValue(setUnitCount)}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('startedAtLabel')}</Label>
            <div className="flex items-center space-x-2">
              <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'flex-1 justify-start text-left font-normal',
                      !startedAt && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startedAt
                      ? format(startedAt, 'PPP', { locale: locale === 'zh' ? zhCN : enGB })
                      : t('selectDate')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startedAt}
                    onSelect={(date) => {
                      if (date) {
                        // 保持原有的时间，只更新日期
                        const newDate = new Date(date);
                        newDate.setHours(startedAt.getHours());
                        newDate.setMinutes(startedAt.getMinutes());
                        setStartedAt(newDate);
                        setIsDatePickerOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
              <Input
                type="time"
                value={timeInput}
                onChange={(e) => {
                  setTimeInput(e.target.value);
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const newDate = new Date(startedAt);
                  newDate.setHours(hours, minutes);
                  setStartedAt(newDate);
                }}
                className="w-26"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium">{t('consumptionRateLabel')}</Label>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrementValue(setUnitPerTimeSpan, 1)}
                className="h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={unitPerTimeSpan}
                onChange={(e) => setUnitPerTimeSpan(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => incrementValue(setUnitPerTimeSpan)}
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{t('in')}</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => decrementValue(setTimeSpan, 1)}
                  className="h-10 w-10"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={timeSpan}
                  onChange={(e) => setTimeSpan(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                  min="1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => incrementValue(setTimeSpan)}
                  className="h-10 w-10"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Select
                value={timeSpanUnitMultiplier.toString()}
                onValueChange={(value) => setTimeSpanUnitMultiplier(parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeSpanOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {t(option.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {t('totalDuration')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatMsDuration(durationMs)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{t('willEnd')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{endAt}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
