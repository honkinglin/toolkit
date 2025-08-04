'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumber,
  CountryCode,
} from 'libphonenumber-js/max';
import lookup from 'country-code-lookup';
import { Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopyWithTooltip } from '@/hooks/use-copy';
import { withDefaultOnError } from '@/lib/utils';
import {
  formatTypeToHumanReadable,
  getDefaultCountryCode,
  getFullCountryName,
  booleanToHumanReadable,
} from '@/lib/phone-parser-formatter.models';

interface ParsedDetail {
  label: string;
  value: string | undefined;
}

export default function PhoneParserFormatterPage() {
  const t = useTranslations('phoneParserFormatter');
  const { handleCopy } = useCopyWithTooltip();

  const [rawPhone, setRawPhone] = useState('');
  const [debouncedPhone, setDebouncedPhone] = useState('');
  const [defaultCountryCode, setDefaultCountryCode] =
    useState<CountryCode>(getDefaultCountryCode());

  // Debounce phone input to reduce parsing frequency
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPhone(rawPhone);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [rawPhone]);

  // Country options for select - moved up and memoized properly
  const countriesOptions = useMemo(() => {
    return getCountries().map((code) => ({
      label: `${lookup.byIso(code)?.country || code} (+${getCountryCallingCode(code)})`,
      value: code,
    }));
  }, []); // Empty dependency array since this data is static

  // Validation
  const isValidInput = useMemo(() => {
    return rawPhone === '' || /^[0-9 +\-()]+$/.test(rawPhone);
  }, [rawPhone]);

  // Parse phone number details - use debounced value
  const parsedDetails = useMemo((): ParsedDetail[] | undefined => {
    // Early return for empty or invalid input
    if (!debouncedPhone.trim() || !isValidInput) {
      return undefined;
    }

    // Only parse if input has meaningful content (more than just spaces and symbols)
    if (debouncedPhone.replace(/[\s\-+()]/g, '').length < 5) {
      return undefined;
    }

    const parsed = withDefaultOnError(
      () => parsePhoneNumber(debouncedPhone, defaultCountryCode),
      undefined
    );

    if (!parsed) {
      return undefined;
    }

    return [
      {
        label: t('details.countryCode'),
        value: parsed.country,
      },
      {
        label: t('details.country'),
        value: getFullCountryName(parsed.country),
      },
      {
        label: t('details.countryCallingCode'),
        value: parsed.countryCallingCode,
      },
      {
        label: t('details.isValid'),
        value: booleanToHumanReadable(parsed.isValid()),
      },
      {
        label: t('details.isPossible'),
        value: booleanToHumanReadable(parsed.isPossible()),
      },
      {
        label: t('details.type'),
        value: formatTypeToHumanReadable(parsed.getType()),
      },
      {
        label: t('details.internationalFormat'),
        value: parsed.formatInternational(),
      },
      {
        label: t('details.nationalFormat'),
        value: parsed.formatNational(),
      },
      {
        label: t('details.e164Format'),
        value: parsed.format('E.164'),
      },
      {
        label: t('details.rfc3966Format'),
        value: parsed.format('RFC3966'),
      },
    ];
  }, [debouncedPhone, defaultCountryCode, isValidInput, t]);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      {/* Input Section */}
      <Card className="w-2xl">
        <CardContent className="p-6 space-y-6">
          {/* Country Code Selector */}
          <div className="space-y-2">
            <Label htmlFor="country-select">{t('defaultCountryCode')}</Label>
            <Select
              value={defaultCountryCode}
              onValueChange={(value) => setDefaultCountryCode(value as CountryCode)}
            >
              <SelectTrigger id="country-select">
                <SelectValue placeholder={t('selectCountry')} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {countriesOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <Label htmlFor="phone-input">{t('phoneNumber')}</Label>
            <Input
              id="phone-input"
              type="text"
              value={rawPhone}
              onChange={(e) => setRawPhone(e.target.value)}
              placeholder={t('phonePlaceholder')}
              className={!isValidInput ? 'border-red-500 focus:border-red-500' : ''}
            />
            {!isValidInput && <p className="text-sm text-red-500">{t('invalidPhoneNumber')}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Parsed Details Table */}
      {parsedDetails && (
        <Card>
          <CardContent className="p-6">
            <Table>
              <TableBody>
                {parsedDetails.map(({ label, value }, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-semibold">{label}</TableCell>
                    <TableCell>
                      {value ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono">{value}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(value)}
                            className="h-8 w-8 p-0"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">{t('unknown')}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </ToolLayout>
  );
}
