'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convertTextToUnicode, convertUnicodeToText, isValidUnicode } from '@/lib/text-to-unicode';

export default function TextToUnicodePage() {
  const t = useTranslations('sidebar');
  const tu = useTranslations('textToUnicode');

  const [inputText, setInputText] = useState('');
  const [inputUnicode, setInputUnicode] = useState('');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  // Convert text to unicode
  const unicodeFromText = useMemo(() => {
    return inputText.trim() === '' ? '' : convertTextToUnicode(inputText);
  }, [inputText]);

  // Convert unicode to text
  const textFromUnicode = useMemo(() => {
    return inputUnicode.trim() === '' ? '' : convertUnicodeToText(inputUnicode);
  }, [inputUnicode]);

  // Validation for unicode input
  const unicodeValidation = useMemo(() => {
    if (!inputUnicode.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidUnicode(inputUnicode);
    return {
      isValid,
      error: isValid
        ? ''
        : 'Please enter valid Unicode entities (e.g., &#72;&#101;&#108;&#108;&#111;)',
    };
  }, [inputUnicode]);

  const handleCopy = async (value: string, key: string) => {
    if (!value) return;

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
    <ToolLayout title={t('textToUnicode')} description={tu('description')}>
      {/* Text to Unicode */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{tu('textToUnicodeTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{tu('textInputLabel')}</Label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={tu('textInputPlaceholder')}
              className="font-mono min-h-[100px] resize-y"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{tu('unicodeOutputLabel')}</Label>
            <Textarea
              value={unicodeFromText}
              readOnly
              className="font-mono min-h-[100px] resize-y bg-muted"
              placeholder={tu('unicodeOutputPlaceholder')}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip
              open={tooltipOpen['unicode'] ?? false}
              onOpenChange={(open) => handleTooltipOpenChange('unicode', open)}
            >
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleCopy(unicodeFromText, 'unicode')}
                  disabled={!unicodeFromText}
                  className="px-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {tu('copyUnicodeButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copiedStates['unicode'] ? 'Copied!' : 'Copy unicode to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Unicode to Text */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{tu('unicodeToTextTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{tu('unicodeInputLabel')}</Label>
            <Textarea
              value={inputUnicode}
              onChange={(e) => setInputUnicode(e.target.value)}
              placeholder={tu('unicodeInputPlaceholder')}
              className={`font-mono min-h-[100px] resize-y ${
                unicodeValidation.error ? 'border-red-500' : ''
              }`}
            />
            {unicodeValidation.error && (
              <p className="text-sm text-red-500">{unicodeValidation.error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{tu('textOutputLabel')}</Label>
            <Textarea
              value={textFromUnicode}
              readOnly
              className="font-mono min-h-[100px] resize-y bg-muted"
              placeholder={tu('textOutputPlaceholder')}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip
              open={tooltipOpen['text'] ?? false}
              onOpenChange={(open) => handleTooltipOpenChange('text', open)}
            >
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleCopy(textFromUnicode, 'text')}
                  disabled={!textFromUnicode}
                  className="px-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {tu('copyTextButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copiedStates['text'] ? 'Copied!' : 'Copy text to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
