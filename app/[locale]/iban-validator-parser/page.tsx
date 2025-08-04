'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { extractIBAN, friendlyFormatIBAN, isQRIBAN, validateIBAN } from 'ibantools';
import { Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopyWithTooltip } from '@/hooks/use-copy';
import { getFriendlyErrors, type IbanDetail } from '@/lib/iban-validator-parser.models';

export default function IbanValidatorParserPage() {
  const t = useTranslations('ibanValidatorParser');
  const { handleCopy } = useCopyWithTooltip();

  const [rawIban, setRawIban] = useState('');

  // Process IBAN and generate details
  const ibanInfo = useMemo((): IbanDetail[] => {
    const iban = rawIban.toUpperCase().replace(/\s/g, '').replace(/-/g, '');

    if (iban === '') {
      return [];
    }

    const { valid: isIbanValid, errorCodes } = validateIBAN(iban);
    const { countryCode, bban } = extractIBAN(iban);
    const errors = getFriendlyErrors(errorCodes);

    return [
      {
        label: t('details.isValid'),
        value: isIbanValid,
        showCopyButton: false,
      },
      {
        label: t('details.errors'),
        value: errors.length === 0 ? undefined : errors,
        hideOnNil: true,
        showCopyButton: false,
      },
      {
        label: t('details.isQRIBAN'),
        value: isQRIBAN(iban),
        showCopyButton: false,
      },
      {
        label: t('details.countryCode'),
        value: countryCode,
      },
      {
        label: t('details.bban'),
        value: bban,
      },
      {
        label: t('details.friendlyFormat'),
        value: friendlyFormatIBAN(iban) || undefined,
      },
    ];
  }, [rawIban, t]);

  // IBAN examples
  const ibanExamples = [
    'FR7630006000011234567890189',
    'DE89370400440532013000',
    'GB29NWBK60161331926819',
  ];

  // Helper to render value based on type
  const renderValue = (detail: IbanDetail) => {
    const { value } = detail;

    if (value === undefined || value === null) {
      return <span className="text-muted-foreground">{t('unknown')}</span>;
    }

    if (typeof value === 'boolean') {
      return (
        <span className={value ? 'text-green-600' : 'text-red-600'}>
          {value ? t('yes') : t('no')}
        </span>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.map((error, index) => (
            <div key={index} className="text-red-600 text-sm">
              • {error}
            </div>
          ))}
        </div>
      );
    }

    return <span className="font-mono">{value}</span>;
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Input Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Label htmlFor="iban-input">{t('inputLabel')}</Label>
              <Input
                id="iban-input"
                type="text"
                value={rawIban}
                onChange={(e) => setRawIban(e.target.value)}
                placeholder={t('inputPlaceholder')}
                className="font-mono"
              />
            </div>
          </CardContent>
        </Card>

        {/* IBAN Details */}
        {ibanInfo.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('detailsTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  {ibanInfo
                    .filter((detail) => !detail.hideOnNil || detail.value !== undefined)
                    .map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">{detail.label}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {renderValue(detail)}
                            {detail.showCopyButton !== false &&
                              detail.value &&
                              typeof detail.value === 'string' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopy(detail.value as string)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle>{t('examplesTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ibanExamples.map((iban) => (
                <div key={iban} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <span className="font-mono flex-1">{friendlyFormatIBAN(iban)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(iban)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
