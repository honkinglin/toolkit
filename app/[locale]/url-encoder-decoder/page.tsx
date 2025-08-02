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
import { useCopyWithTooltip } from '@/hooks/use-copy';

const defaultEncodeInput = 'Hello world :)';
const defaultDecodeInput = 'Hello%20world%20%3A)';

// Utility function to safely encode/decode
function withDefaultOnError<T>(fn: () => T, defaultValue: T): T {
  try {
    return fn();
  } catch {
    return defaultValue;
  }
}

// Validation function to check if encoding/decoding is possible
function isNotThrowing(fn: () => unknown): boolean {
  try {
    fn();
    return true;
  } catch {
    return false;
  }
}

export default function UrlEncoderDecoderPage() {
  const t = useTranslations('urlEncoderDecoder');

  // Encode section state
  const [encodeInput, setEncodeInput] = useState(defaultEncodeInput);
  const [decodeInput, setDecodeInput] = useState(defaultDecodeInput);

  // Use the custom copy hook for both sections
  const {
    copied: encodeCopied,
    tooltipOpen: encodeTooltipOpen,
    handleCopy: handleEncodeCodeCopy,
    handleTooltipOpenChange: handleEncodeTooltipOpenChange,
  } = useCopyWithTooltip();

  const {
    copied: decodeCopied,
    tooltipOpen: decodeTooltipOpen,
    handleCopy: handleDecodeCodeCopy,
    handleTooltipOpenChange: handleDecodeTooltipOpenChange,
  } = useCopyWithTooltip();

  // Encode output computation
  const encodeOutput = useMemo(() => {
    return withDefaultOnError(() => encodeURIComponent(encodeInput), '');
  }, [encodeInput]);

  // Decode output computation
  const decodeOutput = useMemo(() => {
    return withDefaultOnError(() => decodeURIComponent(decodeInput), '');
  }, [decodeInput]);

  // Validation for encode input
  const encodeValidation = useMemo(() => {
    if (!encodeInput.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isNotThrowing(() => encodeURIComponent(encodeInput));
    return {
      isValid,
      error: isValid ? '' : t('parseError'),
    };
  }, [encodeInput, t]);

  // Validation for decode input
  const decodeValidation = useMemo(() => {
    if (!decodeInput.trim()) {
      return { isValid: true, error: '' };
    }

    const isValid = isNotThrowing(() => decodeURIComponent(decodeInput));
    return {
      isValid,
      error: isValid ? '' : t('parseError'),
    };
  }, [decodeInput, t]);

  const handleCopyEncoded = () => {
    handleEncodeCodeCopy(encodeOutput);
  };

  const handleCopyDecoded = () => {
    handleDecodeCodeCopy(decodeOutput);
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      {/* Encode Section */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{t('encodeTitle')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input String */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('inputStringLabel')}</Label>
            <Textarea
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              placeholder={t('encodeInputPlaceholder')}
              className={`font-mono min-h-[80px] resize-y ${
                encodeValidation.error ? 'border-red-500' : ''
              }`}
              rows={2}
            />
            {encodeValidation.error && (
              <p className="text-sm text-red-500">{encodeValidation.error}</p>
            )}
          </div>

          {/* Encoded Output */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('encodedStringLabel')}</Label>
            <Textarea
              value={encodeOutput}
              readOnly
              className="font-mono min-h-[80px] resize-y bg-muted"
              placeholder={t('encodedOutputPlaceholder')}
              rows={2}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip open={encodeTooltipOpen} onOpenChange={handleEncodeTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyEncoded} disabled={!encodeOutput} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {t('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{encodeCopied ? t('copySuccessTooltip') : t('copyEncodedTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Decode Section */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{t('decodeTitle')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Encoded String */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('encodedInputLabel')}</Label>
            <Textarea
              value={decodeInput}
              onChange={(e) => setDecodeInput(e.target.value)}
              placeholder={t('decodeInputPlaceholder')}
              className={`font-mono min-h-[80px] resize-y ${
                decodeValidation.error ? 'border-red-500' : ''
              }`}
              rows={2}
            />
            {decodeValidation.error && (
              <p className="text-sm text-red-500">{decodeValidation.error}</p>
            )}
          </div>

          {/* Decoded Output */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">{t('decodedStringLabel')}</Label>
            <Textarea
              value={decodeOutput}
              readOnly
              className="font-mono min-h-[80px] resize-y bg-muted"
              placeholder={t('decodedOutputPlaceholder')}
              rows={2}
            />
          </div>

          <div className="flex justify-center">
            <Tooltip open={decodeTooltipOpen} onOpenChange={handleDecodeTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyDecoded} disabled={!decodeOutput} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {t('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{decodeCopied ? t('copySuccessTooltip') : t('copyDecodedTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
