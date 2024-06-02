'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convertJsonToToml, isValidJsonForToml, withDefaultOnError } from '@/lib/json-to-toml';

export default function JsonToTomlPage() {
  const t = useTranslations('sidebar');
  const jt = useTranslations('jsonToToml');

  const [inputJson, setInputJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Convert JSON to TOML with error handling
  const tomlFromJson = useMemo(() => {
    return withDefaultOnError(() => convertJsonToToml(inputJson), '');
  }, [inputJson]);

  // Validation for JSON input
  const jsonValidation = useMemo(() => {
    if (!inputJson.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidJsonForToml(inputJson);
    return {
      isValid,
      error: isValid ? '' : 'Provided JSON is not valid.',
    };
  }, [inputJson]);

  const handleCopy = async () => {
    if (!tomlFromJson) return;

    try {
      await navigator.clipboard.writeText(tomlFromJson);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('TOML copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setTooltipOpen(open);

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopied(false);
    }
  };

  return (
    <ToolLayout title={t('jsonToToml')} description={jt('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{jt('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Input */}
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder={jt('inputPlaceholder')}
            className={`font-mono min-h-[200px] max-h-[380px] resize-y ${
              jsonValidation.error ? 'border-red-500' : ''
            }`}
            autoFocus
          />
          {jsonValidation.error && <p className="text-sm text-red-500">{jsonValidation.error}</p>}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{jt('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* TOML Output */}
          <Textarea
            value={tomlFromJson}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={jt('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} disabled={!tomlFromJson} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {jt('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy TOML to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
