'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Netmask } from 'netmask';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { useCopy } from '@/hooks/use-copy';
import { Copy, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { withDefaultOnError, isNotThrowing } from '@/lib/utils';

function getIPClass(ip: string): string | undefined {
  const [firstOctet] = ip.split('.').map(Number);

  if (firstOctet < 128) {
    return 'A';
  }
  if (firstOctet > 127 && firstOctet < 192) {
    return 'B';
  }
  if (firstOctet > 191 && firstOctet < 224) {
    return 'C';
  }
  if (firstOctet > 223 && firstOctet < 240) {
    return 'D';
  }
  if (firstOctet > 239 && firstOctet < 256) {
    return 'E';
  }

  return undefined;
}

function getNetworkInfo(address: string): Netmask {
  return new Netmask(address.trim());
}

interface NetworkSection {
  label: string;
  getValue: (block: Netmask) => string | undefined;
  undefinedFallback?: string;
}

export default function IPv4NetworkCalculatorPage() {
  const t = useTranslations('ipv4NetworkCalculator');
  const [ip, setIp] = useState('192.167.247.0/24');
  const [error, setError] = useState('');

  // 网络信息计算
  const networkInfo = useMemo(() => withDefaultOnError(() => getNetworkInfo(ip), undefined), [ip]);

  // 验证IP地址
  const validateIP = (value: string): boolean => {
    const isValid = isNotThrowing(() => getNetworkInfo(value.trim()));
    if (!isValid) {
      setError(t('validation.invalidFormat'));
    } else {
      setError('');
    }
    return isValid;
  };

  // 网络信息配置
  const sections: NetworkSection[] = [
    {
      label: t('fields.netmask'),
      getValue: (block) => block.toString(),
    },
    {
      label: t('fields.networkAddress'),
      getValue: ({ base }) => base,
    },
    {
      label: t('fields.networkMask'),
      getValue: ({ mask }) => mask,
    },
    {
      label: t('fields.networkMaskBinary'),
      getValue: ({ bitmask }) =>
        ('1'.repeat(bitmask) + '0'.repeat(32 - bitmask)).match(/.{8}/g)?.join('.') ?? '',
    },
    {
      label: t('fields.cidrNotation'),
      getValue: ({ bitmask }) => `/${bitmask}`,
    },
    {
      label: t('fields.wildcardMask'),
      getValue: ({ hostmask }) => hostmask,
    },
    {
      label: t('fields.networkSize'),
      getValue: ({ size }) => String(size),
    },
    {
      label: t('fields.firstAddress'),
      getValue: ({ first }) => first,
    },
    {
      label: t('fields.lastAddress'),
      getValue: ({ last }) => last,
    },
    {
      label: t('fields.broadcastAddress'),
      getValue: ({ broadcast }) => broadcast,
      undefinedFallback: t('fields.noBroadcast'),
    },
    {
      label: t('fields.ipClass'),
      getValue: ({ base }) => getIPClass(base),
      undefinedFallback: t('fields.unknownClass'),
    },
  ];

  const [copyValue, setCopyValue] = useState('');
  const { copy } = useCopy({
    source: copyValue,
    successMessage: t('copyMessages.success'),
    errorMessage: t('copyMessages.error'),
  });

  const handleInputChange = (value: string) => {
    setIp(value);
    validateIP(value);
  };

  const handleCopyValue = (value: string) => {
    setCopyValue(value);
    setTimeout(() => copy(), 0);
  };

  const switchToBlock = (count: number) => {
    if (networkInfo) {
      const next = networkInfo.next(count);
      if (next) {
        setIp(next.toString());
      }
    }
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="w-full max-w-4xl space-y-6">
        {/* 输入区域 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('input.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="ip-input">{t('input.label')}</Label>
              <Input
                id="ip-input"
                value={ip}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={t('input.placeholder')}
                className={`font-mono ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <div className="flex items-center space-x-2 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 网络信息表格 */}
        {networkInfo && !error && (
          <>
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableBody>
                    {sections.map(({ label, getValue, undefinedFallback }, index) => {
                      const value = getValue(networkInfo);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-semibold w-1/3">{label}</TableCell>
                          <TableCell className="font-mono">
                            {value ? (
                              <div className="flex items-center justify-between group">
                                <span>{value}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleCopyValue(value)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">{undefinedFallback}</span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 导航按钮 */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => switchToBlock(-1)} className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                {t('navigation.previousBlock')}
              </Button>
              <Button variant="outline" onClick={() => switchToBlock(1)} className="gap-2">
                {t('navigation.nextBlock')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
