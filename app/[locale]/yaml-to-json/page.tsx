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
import { convertYamlToJson, isValidYaml, withDefaultOnError } from '@/lib/yaml-to-json';

export default function YamlToJsonPage() {
  const t = useTranslations('sidebar');
  const yj = useTranslations('yamlToJson');

  const [inputYaml, setInputYaml] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Convert YAML to JSON with error handling
  const jsonFromYaml = useMemo(() => {
    return withDefaultOnError(() => convertYamlToJson(inputYaml), '');
  }, [inputYaml]);

  // Validation for YAML input
  const yamlValidation = useMemo(() => {
    if (!inputYaml.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidYaml(inputYaml);
    return {
      isValid,
      error: isValid ? '' : 'Provided YAML is not valid.',
    };
  }, [inputYaml]);

  const handleCopy = async () => {
    if (!jsonFromYaml) return;

    try {
      await navigator.clipboard.writeText(jsonFromYaml);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('JSON copied to clipboard');
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
    <ToolLayout title={t('yamlToJson')} description={yj('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{yj('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* YAML Input */}
          <Textarea
            value={inputYaml}
            onChange={(e) => setInputYaml(e.target.value)}
            placeholder={yj('inputPlaceholder')}
            className={`font-mono min-h-[200px] max-h-[380px] resize-y ${
              yamlValidation.error ? 'border-red-500' : ''
            }`}
            autoFocus
          />
          {yamlValidation.error && <p className="text-sm text-red-500">{yamlValidation.error}</p>}
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{yj('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* JSON Output */}
          <Textarea
            value={jsonFromYaml}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={yj('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} disabled={!jsonFromYaml} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {yj('copyButton')}
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
