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
import { convertTomlToJson, isValidToml, withDefaultOnError } from '@/lib/toml-to-json';
import { useCopyWithTooltip } from '@/hooks/use-copy';

export default function TomlToJsonPage() {
  const t = useTranslations('sidebar');
  const tj = useTranslations('tomlToJson');

  const [inputToml, setInputToml] = useState('');

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  // Convert TOML to JSON with error handling
  const jsonFromToml = useMemo(() => {
    return withDefaultOnError(() => convertTomlToJson(inputToml), '');
  }, [inputToml]);

  // Validation for TOML input
  const tomlValidation = useMemo(() => {
    if (!inputToml.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidToml(inputToml);
    return {
      isValid,
      error: isValid ? '' : 'Provided TOML is not valid.',
    };
  }, [inputToml]);

  const handleCopyJson = () => {
    handleCopy(jsonFromToml);
  };

  return (
    <ToolLayout title={t('tomlToJson')} description={tj('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{tj('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* TOML Input */}
          <Textarea
            value={inputToml}
            onChange={(e) => setInputToml(e.target.value)}
            placeholder={tj('inputPlaceholder')}
            className={`font-mono min-h-[200px] max-h-[380px] resize-y ${
              tomlValidation.error ? 'border-red-500' : ''
            }`}
            autoFocus
          />
          {tomlValidation.error && <p className="text-sm text-red-500">{tomlValidation.error}</p>}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{tj('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Output */}
          <Textarea
            value={jsonFromToml}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={tj('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyJson} disabled={!jsonFromToml} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {tj('copyButton')}
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
