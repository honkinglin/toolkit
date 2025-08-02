'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  kebabCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function CaseConverterPage() {
  const t = useTranslations('sidebar');
  const cc = useTranslations('caseConverter');

  const [input, setInput] = useState('lorem ipsum dolor sit amet');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  const formats = [
    {
      label: 'Lowercase',
      key: 'lowercase',
      value: input.toLocaleLowerCase(),
    },
    {
      label: 'Uppercase',
      key: 'uppercase',
      value: input.toLocaleUpperCase(),
    },
    {
      label: 'Camelcase',
      key: 'camelcase',
      value: camelCase(input),
    },
    {
      label: 'Capitalcase',
      key: 'capitalcase',
      value: capitalCase(input),
    },
    {
      label: 'Constantcase',
      key: 'constantcase',
      value: constantCase(input),
    },
    {
      label: 'Dotcase',
      key: 'dotcase',
      value: dotCase(input),
    },
    {
      label: 'Headercase',
      key: 'headercase',
      value: kebabCase(input)
        .replace(/-/g, '-')
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-'),
    },
    {
      label: 'Nocase',
      key: 'nocase',
      value: noCase(input),
    },
    {
      label: 'Paramcase',
      key: 'paramcase',
      value: kebabCase(input),
    },
    {
      label: 'Pascalcase',
      key: 'pascalcase',
      value: pascalCase(input),
    },
    {
      label: 'Pathcase',
      key: 'pathcase',
      value: pathCase(input),
    },
    {
      label: 'Sentencecase',
      key: 'sentencecase',
      value: sentenceCase(input),
    },
    {
      label: 'Snakecase',
      key: 'snakecase',
      value: snakeCase(input),
    },
    {
      label: 'Mockingcase',
      key: 'mockingcase',
      value: input
        .split('')
        .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
        .join(''),
    },
  ];

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);

      // Set copied state for this specific key
      setCopiedStates((prev) => ({ ...prev, [key]: true }));

      // Keep tooltip open and show "Copied!" message
      setTooltipOpen((prev) => ({ ...prev, [key]: true }));

      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }));
        setTooltipOpen((prev) => ({ ...prev, [key]: false }));
      }, 2000);

      console.log('Copied to clipboard:', value);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTooltipOpenChange = (key: string, open: boolean) => {
    setTooltipOpen((prev) => ({ ...prev, [key]: open }));

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopiedStates((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <ToolLayout title={t('caseConverter')} description={cc('description')}>
      <TooltipProvider>
        <Card className="w-full">
          <CardContent className="space-y-6 pt-6">
            {/* Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium min-w-[120px] text-right">
                  {cc('yourString')}
                </Label>
                <div className="flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={cc('yourStringPlaceholder')}
                    className="font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t"></div>

            {/* Format Results */}
            {formats.map((format) => {
              const isCopied = copiedStates[format.key] || false;
              const isTooltipOpen = tooltipOpen[format.key] ?? false;

              return (
                <div key={format.key} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Label className="text-sm font-medium min-w-[120px] text-right">
                      {cc(format.key)}:
                    </Label>
                    <div className="flex-1 flex gap-2">
                      <Input value={format.value} readOnly className="font-mono bg-muted" />
                      <Tooltip
                        open={isTooltipOpen}
                        onOpenChange={(open) => handleTooltipOpenChange(format.key, open)}
                      >
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(format.value, format.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isCopied ? 'Copied!' : 'Copy to clipboard'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </TooltipProvider>
    </ToolLayout>
  );
}
