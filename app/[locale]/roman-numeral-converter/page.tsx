'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/use-copy';
import { useRomanNumeralConverter } from '@/hooks/use-roman-numeral-converter';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function RomanNumeralConverterPage() {
  const t = useTranslations('sidebar');
  const rnc = useTranslations('romanNumeralConverter');
  const {
    inputNumeral,
    setInputNumeral,
    inputRoman,
    setInputRoman,
    outputRoman,
    outputNumeral,
    numeralValidation,
    romanValidation,
  } = useRomanNumeralConverter();

  const { copy: copyRoman } = useCopy({
    source: outputRoman,
    successMessage: 'Roman number copied to the clipboard',
  });

  const { copy: copyArabic } = useCopy({
    source: String(outputNumeral || ''),
    successMessage: 'Arabic number copied to the clipboard',
  });

  return (
    <ToolLayout
      title={t('romanNumeralConverter')}
      description="将罗马数字转换为数字，并将数字转换为罗马数字。"
    >
      <div className="space-y-6">
        {/* Arabic to Roman */}
        <Card>
          <CardHeader>
            <CardTitle>{rnc('arabicToRoman')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="w-[200px]">
                <NumberInput
                  value={inputNumeral}
                  onChange={setInputNumeral}
                  min={1}
                  className="w-full"
                />
                {!numeralValidation.isValid && (
                  <p className="text-sm text-red-500 mt-1">{numeralValidation.error}</p>
                )}
              </div>

              <div className="text-2xl font-mono flex-1 text-center">{outputRoman}</div>

              <Button onClick={copyRoman} disabled={!numeralValidation.isValid} className="w-20">
                {rnc('copy')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Roman to Arabic */}
        <Card>
          <CardHeader>
            <CardTitle>{rnc('romanToArabic')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div className="w-[200px]">
                <Input
                  value={inputRoman}
                  onChange={(e) => setInputRoman(e.target.value.toUpperCase())}
                  className="w-full"
                  placeholder="Enter roman numerals"
                />
                {!romanValidation.isValid && (
                  <p className="text-sm text-red-500 mt-1">{romanValidation.error}</p>
                )}
              </div>

              <div className="text-2xl font-mono flex-1 text-center">{outputNumeral}</div>

              <Button onClick={copyArabic} disabled={!romanValidation.isValid} className="w-20">
                {rnc('copy')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
