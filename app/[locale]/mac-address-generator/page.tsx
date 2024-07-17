'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw, Copy, Plus, Minus } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { generateRandomMacAddress } from '@/lib/mac-address-generator';
import { isValidPartialMacAddress } from '@/lib/mac-address-utils';
import { useComputedRefreshable } from '@/hooks/use-computed-refreshable';
import { useCopyWithTooltip } from '@/hooks/use-copy';
import times from 'lodash/times';

interface CaseTransformer {
  label: string;
  value: (value: string) => string;
}

interface Separator {
  label: string;
  value: string;
}

export default function MacAddressGeneratorPage() {
  const t = useTranslations('macAddressGenerator');

  const [amount, setAmount] = useState(1);
  const [macAddressPrefix, setMacAddressPrefix] = useState('64:16:7F');
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [selectedSeparator, setSelectedSeparator] = useState(':');

  // Use the custom copy hook
  const { handleCopy } = useCopyWithTooltip({
    successMessage: t('copySuccess'),
    duration: 2000,
  });

  // Case transformers
  const casesTransformers: CaseTransformer[] = [
    { label: 'Uppercase', value: (value: string) => value.toUpperCase() },
    { label: 'Lowercase', value: (value: string) => value.toLowerCase() },
  ];

  // Separators
  const separators: Separator[] = [
    { label: ':', value: ':' },
    { label: '-', value: '-' },
    { label: '.', value: '.' },
    { label: 'None', value: '' },
  ];

  // Validate MAC address prefix
  const prefixValidation = useMemo(() => {
    return macAddressPrefix.trim() === '' || isValidPartialMacAddress(macAddressPrefix);
  }, [macAddressPrefix]);

  // Generate MAC addresses with refresh capability
  const [macAddresses, refreshMacAddresses] = useComputedRefreshable(() => {
    if (!prefixValidation) {
      return '';
    }

    const caseTransformer = casesTransformers[selectedCaseIndex].value;
    const ids = times(amount, () =>
      caseTransformer(
        generateRandomMacAddress({
          prefix: macAddressPrefix,
          separator: selectedSeparator,
        })
      )
    );
    return ids.join('\n');
  });

  // Handle quantity changes
  const handleQuantityChange = (delta: number) => {
    setAmount((prev) => Math.max(1, Math.min(100, prev + delta)));
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6 w-full">
        {/* Configuration Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('configTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quantity */}
            <div className="flex items-center space-x-4">
              <Label className="w-32 text-right">{t('quantityLabel')}</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={amount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) =>
                    setAmount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))
                  }
                  className="w-20 text-center"
                  min="1"
                  max="100"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={amount >= 100}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* MAC Address Prefix */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="prefix-input" className="w-32 text-right">
                {t('prefixLabel')}
              </Label>
              <div className="flex-1 space-y-2">
                <Input
                  id="prefix-input"
                  value={macAddressPrefix}
                  onChange={(e) => setMacAddressPrefix(e.target.value)}
                  placeholder={t('prefixPlaceholder')}
                  className={!prefixValidation ? 'border-red-500' : ''}
                  spellCheck="false"
                />
                {!prefixValidation && <p className="text-sm text-red-500">{t('invalidPrefix')}</p>}
              </div>
            </div>

            {/* Case Selection */}
            <div className="flex items-center space-x-4">
              <Label className="w-32 text-right">{t('caseLabel')}</Label>
              <div className="flex space-x-2">
                {casesTransformers.map((transformer, index) => (
                  <Button
                    key={transformer.label}
                    variant={selectedCaseIndex === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCaseIndex(index)}
                  >
                    {transformer.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Separator Selection */}
            <div className="flex items-center space-x-4">
              <Label className="w-32 text-right">{t('separatorLabel')}</Label>
              <div className="flex space-x-2">
                {separators.map((separator) => (
                  <Button
                    key={separator.label}
                    variant={selectedSeparator === separator.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedSeparator(separator.value)}
                  >
                    {separator.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated MAC Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>{t('resultTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[200px] p-4 rounded-md border bg-muted/50 font-mono text-sm">
              {macAddresses ? (
                <pre className="whitespace-pre-wrap" suppressHydrationWarning>
                  {macAddresses}
                </pre>
              ) : (
                <div className="text-muted-foreground text-center py-8">{t('noValidPrefix')}</div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-2 mt-4">
              <Button onClick={refreshMacAddresses} variant="outline" disabled={!prefixValidation}>
                <RefreshCw className="mr-2 h-4 w-4" />
                {t('refreshButton')}
              </Button>
              <Button
                onClick={() => macAddresses && handleCopy(macAddresses)}
                disabled={!macAddresses}
                variant="outline"
              >
                <Copy className="mr-2 h-4 w-4" />
                {t('copyButton')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
