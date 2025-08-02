'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NumberInput } from '@/components/ui/number-input';
import { Separator } from '@/components/ui/separator';
import { InputCopyable } from '@/components/ui/input-copyable';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useIntegerBaseConverter } from '@/hooks/use-integer-base-converter';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function IntegerBaseConverterPage() {
  const t = useTranslations('sidebar');
  const ibc = useTranslations('integerBaseConverter');
  const {
    input,
    setInput,
    inputBase,
    setInputBase,
    outputBase,
    setOutputBase,
    errorlessConvert,
    error,
    conversions,
  } = useIntegerBaseConverter();

  return (
    <ToolLayout
      title={t('integerBaseConverter')}
      description="在不同的基数（十进制、十六进制、二进制、八进制、base64...）之间转换数字"
    >
      <Card className="w-full">
        <CardContent className="space-y-6 p-6">
          {/* Input number */}
          <div className="flex items-center gap-4">
            <Label className="w-[110px] text-right text-sm font-medium">{ibc('inputNumber')}</Label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ibc('inputNumberPlaceholder')}
              className="flex-1"
            />
          </div>

          {/* Input base */}
          <div className="flex items-center gap-4">
            <Label className="w-[110px] text-right text-sm font-medium">{ibc('inputBase')}</Label>
            <NumberInput
              value={inputBase}
              onChange={setInputBase}
              min={2}
              max={64}
              className="flex-1"
            />
          </div>

          {/* Error alert */}
          {error && <Alert variant="destructive">{error}</Alert>}

          <Separator />

          {/* Conversion results */}
          <div className="space-y-4">
            {conversions.map(({ base, key }) => (
              <div key={base} className="flex items-center gap-4">
                <Label className="w-[170px] text-right text-sm font-medium">
                  {ibc(key as keyof typeof ibc)}
                </Label>
                <InputCopyable
                  value={errorlessConvert(input, inputBase, base)}
                  readonly
                  className="flex-1"
                />
              </div>
            ))}

            {/* Custom base */}
            <div className="flex items-center gap-4 justify-between">
              <div className="w-[220px] flex items-center gap-2">
                <Label className="text-sm font-medium">{ibc('custom')}</Label>
                <NumberInput
                  value={outputBase}
                  onChange={setOutputBase}
                  min={2}
                  max={64}
                  className="w-[150px]"
                />
              </div>
              <InputCopyable
                value={errorlessConvert(input, inputBase, outputBase)}
                readonly
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
