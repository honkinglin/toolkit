'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, X } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { textToNatoAlphabet } from '@/lib/text-to-nato-alphabet';

export default function TextToNatoAlphabetPage() {
  const t = useTranslations('sidebar');
  const tn = useTranslations('textToNatoAlphabet');

  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const natoText = textToNatoAlphabet({ text: input });

  const handleCopy = async () => {
    if (!natoText) return;

    try {
      await navigator.clipboard.writeText(natoText);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('NATO alphabet string copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setTooltipOpen(open);

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopied(false);
    }
  };

  return (
    <ToolLayout title={t('textToNatoAlphabet')} description={tn('description')}>
      {/* Input */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-sm font-medium">{tn('inputLabel')}</Label>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tn('inputPlaceholder')}
              className="font-mono"
            />
            {input && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={handleClear}>
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Output */}
      {natoText && (
        <div className="space-y-4">
          <Card className="w-full">
            <CardHeader>
              <Label className="text-sm font-medium">{tn('outputLabel')}</Label>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted rounded-md font-mono text-sm leading-relaxed">
                {natoText}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopy} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {tn('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy NATO string'}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
