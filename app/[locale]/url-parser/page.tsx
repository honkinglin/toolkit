'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowDownRight } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { InputCopyable } from '@/components/ui/input-copyable';
import { Separator } from '@/components/ui/separator';
import { withDefaultOnError, isNotThrowing } from '@/lib/utils';

const defaultUrl =
  'https://me:pwd@toolkit-ashen-two.vercel.app:3000/url-parser?key1=value&key2=value2#the-hash';

interface UrlProperty {
  title: string;
  key: keyof URL;
}

const properties: UrlProperty[] = [
  { title: 'Protocol', key: 'protocol' },
  { title: 'Username', key: 'username' },
  { title: 'Password', key: 'password' },
  { title: 'Hostname', key: 'hostname' },
  { title: 'Port', key: 'port' },
  { title: 'Path', key: 'pathname' },
  { title: 'Params', key: 'search' },
];

export default function UrlParserPage() {
  const up = useTranslations('urlParser');

  const [urlInput, setUrlInput] = useState(defaultUrl);

  // Parse URL with error handling
  const urlParsed = useMemo(() => {
    return withDefaultOnError(() => new URL(urlInput), undefined);
  }, [urlInput]);

  // URL validation
  const urlValidation = useMemo(() => {
    if (!urlInput.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isNotThrowing(() => new URL(urlInput));
    return {
      isValid,
      error: isValid ? '' : up('invalidUrl'),
    };
  }, [urlInput, up]);

  // Get search params as key-value pairs
  const searchParams = useMemo(() => {
    if (!urlParsed?.searchParams) return [];
    return Array.from(urlParsed.searchParams.entries());
  }, [urlParsed]);

  return (
    <ToolLayout title={up('title')} description={up('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{up('cardTitle')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="url-input">{up('inputLabel')}</Label>
            <Textarea
              id="url-input"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={up('inputPlaceholder')}
              className={`font-mono min-h-[80px] resize-y ${
                urlValidation.error ? 'border-red-500' : ''
              }`}
              rows={2}
            />
            {urlValidation.error && <p className="text-sm text-red-500">{urlValidation.error}</p>}
          </div>

          <Separator />

          {/* URL Properties */}
          {properties.map(({ key }) => (
            <div key={key} className="flex items-center space-x-4">
              <Label className="text-sm font-medium min-w-[110px] text-right">
                {up(`properties.${key}`)}
              </Label>
              <div className="flex-1">
                <InputCopyable value={(urlParsed?.[key] as string) ?? ''} readonly />
              </div>
            </div>
          ))}

          {/* Search Parameters */}
          {searchParams.map(([key, value]) => (
            <div key={key} className="flex items-center space-x-4">
              <div className="min-w-[110px] flex justify-end">
                <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 flex space-x-2">
                <InputCopyable value={key} readonly />
                <InputCopyable value={value} readonly />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
