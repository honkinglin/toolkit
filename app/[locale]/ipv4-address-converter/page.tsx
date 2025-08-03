'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { ipv4ToInt, ipv4ToIpv6, isValidIpv4, convertBase } from '@/lib/ipv4-address-converter';
import { useCopyWithTooltip } from '@/hooks/use-copy';

export default function Ipv4AddressConverterPage() {
  const t = useTranslations('ipv4AddressConverter');

  const [rawIpAddress, setRawIpAddress] = useState('192.168.1.1');

  // Use the custom copy hook
  const { handleCopy } = useCopyWithTooltip();

  // Validate IP address
  const isValid = useMemo(() => {
    return rawIpAddress.trim() === '' || isValidIpv4({ ip: rawIpAddress });
  }, [rawIpAddress]);

  // Convert IP to different formats
  const convertedSections = useMemo(() => {
    if (!isValid || rawIpAddress.trim() === '') {
      return [];
    }

    const ipInDecimal = ipv4ToInt({ ip: rawIpAddress });

    return [
      {
        label: 'Decimal:',
        value: String(ipInDecimal),
        key: 'decimal',
      },
      {
        label: 'Hexadecimal:',
        value: convertBase({ fromBase: 10, toBase: 16, value: String(ipInDecimal) }).toUpperCase(),
        key: 'hexadecimal',
      },
      {
        label: 'Binary:',
        value: convertBase({ fromBase: 10, toBase: 2, value: String(ipInDecimal) }),
        key: 'binary',
      },
      {
        label: 'Ipv6:',
        value: ipv4ToIpv6({ ip: rawIpAddress }),
        key: 'ipv6',
      },
      {
        label: 'Ipv6 (short):',
        value: ipv4ToIpv6({ ip: rawIpAddress, prefix: '::ffff:' }),
        key: 'ipv6_short',
      },
    ];
  }, [rawIpAddress, isValid]);

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
              <Label htmlFor="ip-input">{t('ipAddressLabel')}</Label>
              <Input
                id="ip-input"
                value={rawIpAddress}
                onChange={(e) => setRawIpAddress(e.target.value)}
                placeholder={t('ipAddressPlaceholder')}
                className={!isValid ? 'border-red-500' : ''}
              />
              {!isValid && <p className="text-sm text-red-500">{t('invalidIpAddress')}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('outputTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {convertedSections.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">{t('enterValidIp')}</p>
            ) : (
              convertedSections.map(({ label, value, key }) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className="w-32 text-right">
                    <Label className="text-sm font-medium">{label}</Label>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Input value={value} readOnly className="flex-1 bg-muted" />
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
                          <p>{t('copy')}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
