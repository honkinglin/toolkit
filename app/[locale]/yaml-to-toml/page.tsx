'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convertYamlToToml, isValidYamlForToml, withDefaultOnError } from '@/lib/yaml-to-toml';
import { useCopyWithTooltip } from '@/hooks/use-copy';

export default function YamlToTomlPage() {
  const t = useTranslations('sidebar');
  const yt = useTranslations('yamlToToml');

  const [inputYaml, setInputYaml] = useState('');

  // Use the custom copy hook
  const { copied, tooltipOpen, handleCopy, handleTooltipOpenChange } = useCopyWithTooltip();

  // Convert YAML to TOML with error handling
  const tomlFromYaml = useMemo(() => {
    return inputYaml.trim() === ''
      ? ''
      : withDefaultOnError(() => convertYamlToToml(inputYaml), '');
  }, [inputYaml]);

  // Validation for YAML input
  const yamlValidation = useMemo(() => {
    if (!inputYaml.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidYamlForToml(inputYaml);
    return {
      isValid,
      error: isValid ? '' : 'Provided YAML is not valid or cannot be converted to TOML.',
    };
  }, [inputYaml]);

  const handleCopyToml = () => {
    handleCopy(tomlFromYaml);
  };

  return (
    <ToolLayout title={t('yamlToToml')} description={yt('description')}>
      <TooltipProvider>
        <Card className="w-full">
          <CardHeader>
            <Label className="text-lg font-semibold">{yt('inputLabel')}</Label>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* YAML Input */}
            <Textarea
              value={inputYaml}
              onChange={(e) => setInputYaml(e.target.value)}
              placeholder={yt('inputPlaceholder')}
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
            <Label className="text-lg font-semibold">{yt('outputLabel')}</Label>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* TOML Output */}
            <Textarea
              value={tomlFromYaml}
              readOnly
              className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
              placeholder={yt('outputPlaceholder')}
            />

            <div className="flex justify-center">
              <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
                <TooltipTrigger asChild>
                  <Button onClick={handleCopyToml} disabled={!tomlFromYaml} className="px-6">
                    <Copy className="h-4 w-4 mr-2" />
                    {yt('copyButton')}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Copied!' : 'Copy TOML to clipboard'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </ToolLayout>
  );
}
