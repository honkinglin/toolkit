'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useCopy } from '@/hooks/use-copy';
import { Editor } from './components';
import { formatHtml } from './utils/format-html';

export default function HtmlWysiwygEditorPage() {
  const t = useTranslations('htmlWysiwygEditor');

  const [html, setHtml] = useState('<h1>Hey!</h1><p>Welcome to this html wysiwyg editor</p>');
  const [formattedHtml, setFormattedHtml] = useState('');

  const { copy } = useCopy({
    source: formattedHtml,
    successMessage: 'HTML copied to clipboard',
  });

  const handleHtmlChange = useCallback(async (newHtml: string) => {
    setHtml(newHtml);

    // Format HTML asynchronously
    try {
      const formatted = await formatHtml(newHtml);
      setFormattedHtml(formatted);
    } catch (error) {
      console.error('Failed to format HTML:', error);
      setFormattedHtml(newHtml);
    }
  }, []);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-6">
        {/* Editor */}
        <Editor html={html} onHtmlChange={handleHtmlChange} />

        {/* HTML Output */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold" suppressHydrationWarning>
              Generated HTML
            </h3>
            <Button onClick={copy} disabled={!formattedHtml} size="sm" variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copy HTML
            </Button>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formattedHtml || html || ''}
              readOnly
              className="font-mono text-sm min-h-[200px] bg-muted/50"
              placeholder="Generated HTML will appear here..."
            />
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
