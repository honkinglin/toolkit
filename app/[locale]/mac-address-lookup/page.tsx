'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ToolLayout } from '@/components/layout/tool-layout';
import { getVendorValue, isValidMacAddress } from '@/lib/mac-address-utils';
import { useCopyWithTooltip } from '@/hooks/use-copy';

// Import OUI database
import db from 'oui-data';

export default function MacAddressLookupPage() {
  const t = useTranslations('macAddressLookup');

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

  // Get vendor details
  const details = useMemo(() => {
    if (!isValid || macAddress.trim() === '') {
      return undefined;
    }

    const vendorKey = getVendorValue(macAddress);
    return (db as Record<string, string>)[vendorKey];
  }, [macAddress, isValid]);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6 w-full">
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

        {/* Vendor Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('vendorInfoTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="min-h-[100px] p-4 rounded-md border bg-muted/50">
              {details ? (
                <div className="space-y-1">
                  {details.split('\n').map((line, index) => (
                    <div key={index} className="text-sm">
                      {line}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground italic text-center py-8">
                  {t('unknownVendor')}
                </div>
              )}
            </div>

            {/* Copy Button */}
            <div className="flex justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => details && handleCopy(details)}
                    disabled={!details}
                    variant="outline"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {t('copyVendorInfo')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('copyTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
