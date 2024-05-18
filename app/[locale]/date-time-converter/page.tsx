'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { InputCopyable } from '@/components/ui/input-copyable';
import { Label } from '@/components/ui/label';
import { useDateTimeConverter } from '@/hooks/use-date-time-converter';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function DateTimeConverterPage() {
  const t = useTranslations('sidebar');
  const dt = useTranslations('dateTimeConverter');
  const {
    inputDate,
    setInputDate,
    formatIndex,
    setFormatIndex,
    formats,
    normalizedDate,
    isValidDate,
    formatDateUsingFormatter,
  } = useDateTimeConverter();

  return (
    <ToolLayout title={t('dateTimeConverter')} description="将日期和时间转换为各种不同的格式">
      <div className="space-y-6 w-full">
        <div className="flex gap-4">
          <Input
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            placeholder={dt('inputPlaceholder')}
            className="flex-1"
            autoFocus
          />

          <Select
            value={formatIndex.toString()}
            onValueChange={(value) => setFormatIndex(parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formats.map((format, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {format.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!isValidDate && inputDate && (
          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
            {dt('invalidDateError')}
          </div>
        )}

        <Separator />

        <div className="space-y-4">
          {formats.map(({ name, fromDate }) => (
            <div key={name} className="flex items-center gap-4">
              <Label className="w-[150px] text-right text-sm font-medium">{name}</Label>
              <InputCopyable
                value={formatDateUsingFormatter(fromDate, normalizedDate)}
                readonly
                className="flex-1"
              />
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
