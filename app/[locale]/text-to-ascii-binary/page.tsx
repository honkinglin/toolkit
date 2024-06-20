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
import {
  convertTextToAsciiBinary,
  convertAsciiBinaryToText,
  isValidAsciiBinary,
} from '@/lib/text-to-ascii-binary';

export default function TextToAsciiBinaryPage() {
  const t = useTranslations('sidebar');
  const tb = useTranslations('textToAsciiBinary');

  const [inputText, setInputText] = useState('');
  const [inputBinary, setInputBinary] = useState('');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

  // Convert text to binary
  const binaryFromText = useMemo(() => {
    return convertTextToAsciiBinary(inputText);
  }, [inputText]);

  // Convert binary to text
  const textFromBinary = useMemo(() => {
    return convertAsciiBinaryToText(inputBinary);
  }, [inputBinary]);

  // Validation for binary input
  const binaryValidation = useMemo(() => {
    if (!inputBinary.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isValidAsciiBinary(inputBinary);
    return {
      isValid,
      error: isValid ? '' : 'Binary should be a valid ASCII binary string with multiples of 8 bits',
    };
  }, [inputBinary]);

  const handleCopy = async (value: string, key: string) => {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);

      // Set copied state for this specific key
      setCopiedStates((prev) => ({ ...prev, [key]: true }));

      // Keep tooltip open and show "Copied!" message
      setTooltipOpen((prev) => ({ ...prev, [key]: true }));

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
    <ToolLayout title={t('textToAsciiBinary')} description={tb('description')}>
      {/* Text to ASCII Binary */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{tb('textToBinaryTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{tb('textInputLabel')}</Label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={tb('textInputPlaceholder')}
              className="font-mono min-h-[100px] resize-y"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{tb('binaryOutputLabel')}</Label>
            <Textarea
              value={binaryFromText}
              readOnly
              className="font-mono min-h-[100px] resize-y bg-muted"
              placeholder={tb('binaryOutputPlaceholder')}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip
              open={tooltipOpen['binary'] ?? false}
              onOpenChange={(open) => handleTooltipOpenChange('binary', open)}
            >
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleCopy(binaryFromText, 'binary')}
                  disabled={!binaryFromText}
                  className="px-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {tb('copyBinaryButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copiedStates['binary'] ? 'Copied!' : 'Copy binary to clipboard'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* ASCII Binary to Text */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{tb('binaryToTextTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">{tb('binaryInputLabel')}</Label>
            <Textarea
              value={inputBinary}
              onChange={(e) => setInputBinary(e.target.value)}
              placeholder={tb('binaryInputPlaceholder')}
              className={`font-mono min-h-[100px] resize-y ${
                binaryValidation.error ? 'border-red-500' : ''
              }`}
            />
            {binaryValidation.error && (
              <p className="text-sm text-red-500">{binaryValidation.error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">{tb('textOutputLabel')}</Label>
            <Textarea
              value={textFromBinary}
              readOnly
              className="font-mono min-h-[100px] resize-y bg-muted"
              placeholder={tb('textOutputPlaceholder')}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip
              open={tooltipOpen['text'] ?? false}
              onOpenChange={(open) => handleTooltipOpenChange('text', open)}
            >
              <TooltipTrigger asChild>
                <Button
                  onClick={() => handleCopy(textFromBinary, 'text')}
                  disabled={!textFromBinary}
                  className="px-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {tb('copyTextButton')}
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
