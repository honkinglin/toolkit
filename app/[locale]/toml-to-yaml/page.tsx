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
import { convertTomlToYaml, isValidToml, withDefaultOnError } from '@/lib/toml-to-yaml';

export default function TomlToYamlPage() {
  const t = useTranslations('sidebar');
  const ty = useTranslations('tomlToYaml');

  const [inputToml, setInputToml] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Convert TOML to YAML with error handling
  const yamlFromToml = useMemo(() => {
    return withDefaultOnError(() => convertTomlToYaml(inputToml), '');
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

  const handleCopy = async () => {
    if (!yamlFromToml) return;

    try {
      await navigator.clipboard.writeText(yamlFromToml);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('YAML copied to clipboard');
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
    <ToolLayout title={t('tomlToYaml')} description={ty('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{ty('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* TOML Input */}
          <Textarea
            value={inputToml}
            onChange={(e) => setInputToml(e.target.value)}
            placeholder={ty('inputPlaceholder')}
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
          <Label className="text-lg font-semibold">{ty('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* YAML Output */}
          <Textarea
            value={yamlFromToml}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={ty('outputPlaceholder')}
          />

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} disabled={!yamlFromToml} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {ty('copyButton')}
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
