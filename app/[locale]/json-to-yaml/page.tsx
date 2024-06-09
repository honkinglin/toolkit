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
import { convertJsonToYaml, isValidJsonForYaml, withDefaultOnError } from '@/lib/json-to-yaml';
import { useCopyWithTooltip } from '@/hooks/use-copy';

export default function JsonToYamlPage() {
  const t = useTranslations('sidebar');
  const jy = useTranslations('jsonToYaml');

  const [inputJson, setInputJson] = useState('');

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  // Convert JSON to YAML with error handling
  const yamlFromJson = useMemo(() => {
    return withDefaultOnError(() => convertJsonToYaml(inputJson), '');
  }, [inputJson]);

  // Validation for JSON input
  const jsonValidation = useMemo(() => {
    if (!inputJson.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidJsonForYaml(inputJson);
    return {
      isValid,
      error: isValid ? '' : 'Provided JSON is not valid.',
    };
  }, [inputJson]);

  const handleCopyYaml = () => {
    handleCopy(yamlFromJson);
  };

  return (
    <ToolLayout title={t('jsonToYaml')} description={jy('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{jy('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Input */}
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder={jy('inputPlaceholder')}
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
          <Label className="text-lg font-semibold">{jy('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* YAML Output */}
          <Textarea
            value={yamlFromJson}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={jy('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyYaml} disabled={!yamlFromJson} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {jy('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy YAML to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
