'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, ArrowRightLeft, AlertTriangle } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { isValidIpv4 } from '@/lib/ipv4-address-converter';
import { calculateCidr } from '@/lib/ipv4-range-expander';
import type { Ipv4RangeExpanderResult } from '@/lib/ipv4-range-expander.types';
import { useCopyWithTooltip } from '@/hooks/use-copy';

interface CalculatedValue {
  label: string;
  getOldValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined;
  getNewValue: (result: Ipv4RangeExpanderResult | undefined) => string | undefined;
}

export default function Ipv4RangeExpanderPage() {
  const t = useTranslations('ipv4RangeExpander');

  const [rawStartAddress, setRawStartAddress] = useState('192.168.1.1');
  const [rawEndAddress, setRawEndAddress] = useState('192.168.6.255');

  // Use the custom copy hook
  const { handleCopy } = useCopyWithTooltip();

  // Calculate the result
  const result = useMemo(() => {
    return calculateCidr({ startIp: rawStartAddress, endIp: rawEndAddress });
  }, [rawStartAddress, rawEndAddress]);

  // Validate IP addresses
  const startIpValidation = useMemo(() => {
    return rawStartAddress.trim() === '' || isValidIpv4({ ip: rawStartAddress });
  }, [rawStartAddress]);

  const endIpValidation = useMemo(() => {
    return rawEndAddress.trim() === '' || isValidIpv4({ ip: rawEndAddress });
  }, [rawEndAddress]);

  // Show result condition
  const showResult = useMemo(() => {
    return endIpValidation && startIpValidation && result !== undefined;
  }, [endIpValidation, startIpValidation, result]);

  // Calculated values configuration
  const calculatedValues: CalculatedValue[] = [
    {
      label: 'Start address',
      getOldValue: () => rawStartAddress,
      getNewValue: (result) => result?.newStart,
    },
    {
      label: 'End address',
      getOldValue: () => rawEndAddress,
      getNewValue: (result) => result?.newEnd,
    },
    {
      label: 'Addresses in range',
      getOldValue: (result) => result?.oldSize?.toLocaleString(),
      getNewValue: (result) => result?.newSize?.toLocaleString(),
    },
    {
      label: 'CIDR',
      getOldValue: () => '',
      getNewValue: (result) => result?.newCidr,
    },
  ];

  // Switch start and end addresses
  const handleSwitchStartEnd = () => {
    const tmpStart = rawStartAddress;
    setRawStartAddress(rawEndAddress);
    setRawEndAddress(tmpStart);
  };

  // Result row component
  const ResultRow = ({
    label,
    oldValue,
    newValue,
  }: {
    label: string;
    oldValue?: string;
    newValue?: string;
  }) => (
    <TableRow>
      <TableCell className="font-bold">{label}</TableCell>
      <TableCell className="font-mono">
        {oldValue && (
          <div className="flex items-center space-x-2">
            <span className="flex-1">{oldValue}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(oldValue)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('copy')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </TableCell>
      <TableCell className="font-mono">
        {newValue && (
          <div className="flex items-center space-x-2">
            <span className="flex-1">{newValue}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(newValue)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('copy')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6 w-full">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>{t('inputTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-address">{t('startAddressLabel')}</Label>
                <Input
                  id="start-address"
                  value={rawStartAddress}
                  onChange={(e) => setRawStartAddress(e.target.value)}
                  placeholder={t('startAddressPlaceholder')}
                  className={!startIpValidation ? 'border-red-500' : ''}
                />
                {!startIpValidation && (
                  <p className="text-sm text-red-500">{t('invalidIpAddress')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-address">{t('endAddressLabel')}</Label>
                <Input
                  id="end-address"
                  value={rawEndAddress}
                  onChange={(e) => setRawEndAddress(e.target.value)}
                  placeholder={t('endAddressPlaceholder')}
                  className={!endIpValidation ? 'border-red-500' : ''}
                />
                {!endIpValidation && (
                  <p className="text-sm text-red-500">{t('invalidIpAddress')}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {showResult ? (
          <Card>
            <CardHeader>
              <CardTitle>{t('resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">&nbsp;</TableHead>
                    <TableHead className="w-1/3">{t('oldValue')}</TableHead>
                    <TableHead className="w-1/3">{t('newValue')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calculatedValues.map(({ label, getOldValue, getNewValue }) => (
                    <ResultRow
                      key={label}
                      label={label}
                      oldValue={getOldValue(result)}
                      newValue={getNewValue(result)}
                    />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : startIpValidation && endIpValidation ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('invalidCombinationTitle')}</AlertTitle>
            <AlertDescription>
              <div className="my-3 opacity-70">{t('invalidCombinationDescription')}</div>
              <Button onClick={handleSwitchStartEnd} variant="outline">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                {t('switchAddresses')}
              </Button>
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
    </ToolLayout>
  );
}
