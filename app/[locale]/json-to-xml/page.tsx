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
import { convertJsonToXml, isValidJsonForXml, withDefaultOnError } from '@/lib/json-to-xml';
import { useCopyWithTooltip } from '@/hooks/use-copy';

const defaultValue = '{"a":{"_attributes":{"x":"1.234","y":"It\'s"}}}';

export default function JsonToXmlPage() {
  const t = useTranslations('sidebar');
  const jx = useTranslations('jsonToXml');

  const [inputJson, setInputJson] = useState(defaultValue);
  const [isClient, setIsClient] = useState(false);

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert JSON to XML with error handling
  const xmlFromJson = useMemo(() => {
    return withDefaultOnError(() => convertJsonToXml(inputJson), '');
  }, [inputJson]);

  // Validation for JSON input - only validate on client side
  const jsonValidation = useMemo(() => {
    if (!inputJson.trim() || !isClient) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidJsonForXml(inputJson);
    return {
      isValid,
      error: isValid ? '' : 'Provided JSON is not valid.',
    };
  }, [inputJson, isClient]);

  const handleCopyXml = () => {
    handleCopy(xmlFromJson);
  };

  return (
    <ToolLayout title={t('jsonToXml')} description={jx('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{jx('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Input */}
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder={jx('inputPlaceholder')}
            className={`font-mono min-h-[200px] max-h-[380px] resize-y ${
              isClient && jsonValidation.error ? 'border-red-500' : ''
            }`}
            autoFocus
          />
          {isClient && jsonValidation.error && (
            <p className="text-sm text-red-500">{jsonValidation.error}</p>
          )}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{jx('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* XML Output */}
          <Textarea
            value={xmlFromJson}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={jx('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyXml} disabled={!xmlFromJson} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {jx('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy XML to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
