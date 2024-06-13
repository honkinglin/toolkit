'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useCopyWithTooltip } from '@/hooks/use-copy';

// HTML entities mapping for escape
const htmlEntities: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
};

// Reverse mapping for unescape
const htmlEntitiesReverse: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&#x2F;': '/',
  '&#47;': '/',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char] || char);
}

function unescapeHtml(text: string): string {
  return text.replace(
    /&(?:amp|lt|gt|quot|#x27|#39|#x2F|#47);/g,
    (entity) => htmlEntitiesReverse[entity] || entity
  );
}

export default function HtmlEntitiesPage() {
  const hed = useTranslations('htmlEntities');

  const [escapeInput, setEscapeInput] = useState('<title>IT Tool</title>');
  const [unescapeInput, setUnescapeInput] = useState('&lt;title&gt;IT Tool&lt;/title&gt;');

  const escapeOutput = escapeHtml(escapeInput);
  const unescapeOutput = unescapeHtml(unescapeInput);

  // Use the custom copy hook for both sections
  const {
    copied: escapeCopied,
    tooltipOpen: escapeTooltipOpen,
    handleCopy: handleEscapeCopy,
    handleTooltipOpenChange: handleEscapeTooltipOpenChange,
  } = useCopyWithTooltip();

  const {
    copied: unescapeCopied,
    tooltipOpen: unescapeTooltipOpen,
    handleCopy: handleUnescapeCopy,
    handleTooltipOpenChange: handleUnescapeTooltipOpenChange,
  } = useCopyWithTooltip();

  const handleCopyEscaped = () => {
    handleEscapeCopy(escapeOutput);
  };

  const handleCopyUnescaped = () => {
    handleUnescapeCopy(unescapeOutput);
  };

  return (
    <ToolLayout title={hed('title')} description={hed('description')}>
      {/* Escape HTML Entities */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{hed('escape.title')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="escape-input">{hed('escape.inputLabel')}</Label>
            <Textarea
              id="escape-input"
              value={escapeInput}
              onChange={(e) => setEscapeInput(e.target.value)}
              placeholder={hed('escape.inputPlaceholder')}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="escape-output">{hed('escape.outputLabel')}</Label>
            <Textarea
              id="escape-output"
              value={escapeOutput}
              readOnly
              placeholder={hed('escape.outputPlaceholder')}
              rows={3}
              className="resize-none bg-muted"
            />
          </div>

          <div className="flex justify-center">
            <Tooltip open={escapeTooltipOpen} onOpenChange={handleEscapeTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyEscaped} disabled={!escapeOutput} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {hed('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{escapeCopied ? hed('copySuccessTooltip') : hed('copyTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {/* Unescape HTML Entities */}
      <Card className="w-full">
        <CardHeader>
          <Label className="text-lg font-semibold">{hed('unescape.title')}</Label>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="unescape-input">{hed('unescape.inputLabel')}</Label>
            <Textarea
              id="unescape-input"
              value={unescapeInput}
              onChange={(e) => setUnescapeInput(e.target.value)}
              placeholder={hed('unescape.inputPlaceholder')}
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unescape-output">{hed('unescape.outputLabel')}</Label>
            <Textarea
              id="unescape-output"
              value={unescapeOutput}
              readOnly
              placeholder={hed('unescape.outputPlaceholder')}
              rows={3}
              className="resize-none bg-muted"
            />
          </div>

          <div className="flex justify-center">
            <Tooltip open={unescapeTooltipOpen} onOpenChange={handleUnescapeTooltipOpenChange}>
              <TooltipTrigger asChild>
                <Button onClick={handleCopyUnescaped} disabled={!unescapeOutput} className="px-6">
                  <Copy className="h-4 w-4 mr-2" />
                  {hed('copyButton')}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{unescapeCopied ? hed('copySuccessTooltip') : hed('copyTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
