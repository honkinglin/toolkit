'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Printer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ToolLayout } from '@/components/layout/tool-layout';
import { convertMarkdownToHtml, printHtmlAsPdf } from '@/lib/markdown-to-html';

export default function MarkdownToHtmlPage() {
  const t = useTranslations('sidebar');
  const mh = useTranslations('markdownToHtml');

  const [inputMarkdown, setInputMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert Markdown to HTML
  const outputHtml = useMemo(() => {
    if (!isClient) return '';
    return convertMarkdownToHtml(inputMarkdown);
  }, [inputMarkdown, isClient]);

  const handleCopy = async () => {
    if (!outputHtml) return;

    try {
      await navigator.clipboard.writeText(outputHtml);

      // Set copied state
      setCopied(true);
      setTooltipOpen(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
        setTooltipOpen(false);
      }, 2000);

      console.log('HTML copied to clipboard');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePrintAsPdf = () => {
    if (!outputHtml) return;
    printHtmlAsPdf(outputHtml);
  };

  const handleTooltipOpenChange = (open: boolean) => {
    setTooltipOpen(open);

    // If tooltip is being closed, also reset copied state
    if (!open) {
      setCopied(false);
    }
  };

  return (
    <ToolLayout title={t('markdownToHtml')} description={mh('description')}>
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{mh('inputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Markdown Input */}
          <Textarea
            value={inputMarkdown}
            onChange={(e) => setInputMarkdown(e.target.value)}
            placeholder={mh('inputPlaceholder')}
            className="font-mono min-h-[200px] max-h-[380px] resize-y"
            autoFocus
          />
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{mh('outputLabel')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* HTML Output */}
          <Textarea
            value={outputHtml}
            readOnly
            className="font-mono min-h-[200px] max-h-[380px] resize-y bg-muted"
            placeholder={mh('outputPlaceholder')}
          />

          <div className="flex justify-center gap-4">
            <Tooltip open={tooltipOpen} onOpenChange={handleTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleCopy}
                  disabled={!outputHtml}
                  variant="outline"
                  className="px-6"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {mh('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? 'Copied!' : 'Copy HTML to clipboard'}</p>
              </TooltipContent>
            </Tooltip>

            <Button onClick={handlePrintAsPdf} disabled={!outputHtml} className="px-6">
              <Printer className="h-4 w-4 mr-2" />
              {mh('printButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
