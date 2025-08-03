'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Info } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { generateIPv6ULA } from '@/lib/ipv6-ula-generator';
import { isValidMacAddress } from '@/lib/mac-address-utils';
import { useCopyWithTooltip } from '@/hooks/use-copy';

export default function Ipv6UlaGeneratorPage() {
  const t = useTranslations('ipv6UlaGenerator');

  const [macAddress, setMacAddress] = useState('20:37:06:12:34:56');

  // Use the custom copy hook
  const { handleCopy } = useCopyWithTooltip({
    successMessage: t('copySuccess'),
    duration: 2000,
  });

  // Validate MAC address
  const isValid = useMemo(() => {
    return macAddress.trim() === '' || isValidMacAddress(macAddress);
  }, [macAddress]);

  // Generate ULA sections
  const calculatedSections = useMemo(() => {
    if (!isValid || macAddress.trim() === '') {
      return [];
    }
    return generateIPv6ULA(macAddress);
  }, [macAddress, isValid]);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6 w-full">
        {/* Info Alert */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="inline" suppressHydrationWarning>
            {t('infoDescription')}
          </AlertDescription>
        </Alert>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('inputTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mac-input">{t('macAddressLabel')}</Label>
              <Input
                id="mac-input"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                placeholder={t('macAddressPlaceholder')}
                className={!isValid ? 'border-red-500' : ''}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              {!isValid && <p className="text-sm text-red-500">{t('invalidMacAddress')}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isValid && calculatedSections.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calculatedSections.map(({ label, value }) => (
                <div key={label} className="flex items-center space-x-2">
                  <div className="w-40 text-right">
                    <Label className="text-sm font-medium">{label}</Label>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Input value={value} readOnly className="flex-1 bg-muted font-mono" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(value)}
                            className="shrink-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t('copyTooltip')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* No valid input message */}
        {(!isValid || calculatedSections.length === 0) && (
          <Card>
            <CardContent className="py-8">
              <p className="text-muted-foreground text-center">{t('enterValidMac')}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
