'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convertXmlToJson, withDefaultOnError } from '@/lib/xml-to-json';
import { useCopyWithTooltip } from '@/hooks/use-copy';

const defaultValue = '<a x="1.234" y="It\'s"/>';

// Client-side XML validation function
function isValidXMLClient(value: string): boolean {
  if (!value.trim()) {
    return true;
  }

  try {
    // Only run on client side
    if (typeof window === 'undefined') {
      return true; // Skip validation on server side
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/xml');
    const parseError = doc.getElementsByTagName('parsererror');
    return parseError.length === 0;
  } catch {
    return false;
  }
}

export default function XmlToJsonPage() {
  const t = useTranslations('sidebar');
  const xj = useTranslations('xmlToJson');

  const [inputXml, setInputXml] = useState(defaultValue);
  const [isClient, setIsClient] = useState(false);

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert XML to JSON with error handling
  const jsonFromXml = useMemo(() => {
    return withDefaultOnError(() => convertXmlToJson(inputXml), '');
  }, [inputXml]);

  // Validation for XML input - only validate on client side
  const xmlValidation = useMemo(() => {
    if (!inputXml.trim() || !isClient) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidXMLClient(inputXml);
    return {
      isValid,
      error: isValid ? '' : 'Provided XML is not valid.',
    };
  }, [inputXml, isClient]);

  const handleCopyJson = () => {
    handleCopy(jsonFromXml);
  };

  return (
    <ToolLayout title={t('xmlToJson')} description={xj('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{xj('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* XML Input */}
          <Textarea
            value={inputXml}
            onChange={(e) => setInputXml(e.target.value)}
            placeholder={xj('inputPlaceholder')}
            className={`font-mono min-h-[200px] max-h-[380px] resize-y ${
              isClient && xmlValidation.error ? 'border-red-500' : ''
            }`}
            autoFocus
          />
          {isClient && xmlValidation.error && (
            <p className="text-sm text-red-500">{xmlValidation.error}</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{xj('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Output */}
          <Textarea
            value={jsonFromXml}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={xj('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyJson} disabled={!jsonFromXml} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {xj('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy JSON to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
