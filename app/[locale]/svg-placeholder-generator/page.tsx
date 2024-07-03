'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { NumberInput } from '@/components/ui/number-input';
import { TextareaCopyable } from '@/components/ui/textarea-copyable';
import { ColorPickerInput } from '@/components/ui/color-picker-input';
import { Download, Copy } from 'lucide-react';
import { textToBase64 } from '@/lib/base64-utils';
import { useCopy } from '@/hooks/use-copy';

export default function SvgPlaceholderGeneratorPage() {
  const t = useTranslations('svgPlaceholderGenerator');

  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(350);
  const [fontSize, setFontSize] = useState(26);
  const [bgColor, setBgColor] = useState('#cccccc');
  const [fgColor, setFgColor] = useState('#333333');
  const [useExactSize, setUseExactSize] = useState(true);
  const [customText, setCustomText] = useState('');

  const svgString = useMemo(() => {
    const text = customText.length > 0 ? customText : `${width}x${height}`;
    const sizeAttr = useExactSize ? ` width="${width}" height="${height}"` : '';

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"${sizeAttr}>
  <rect width="${width}" height="${height}" fill="${bgColor}"></rect>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize}px" fill="${fgColor}">${text}</text>   
</svg>`;
  }, [width, height, fontSize, bgColor, fgColor, useExactSize, customText]);

  const base64 = useMemo(() => {
    return `data:image/svg+xml;base64,${textToBase64(svgString)}`;
  }, [svgString]);

  const { copy: copySVG } = useCopy({
    source: svgString,
    successMessage: 'SVG copied to clipboard',
  });

  const { copy: copyBase64 } = useCopy({
    source: base64,
    successMessage: 'Base64 copied to clipboard',
  });

  const downloadSVG = () => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `placeholder-${width}x${height}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card className="w-full">
        <CardContent className="space-y-6">
          {/* All Controls in 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">{t('width')}</Label>
              <NumberInput value={width} onChange={setWidth} min={1} max={5000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">{t('height')}</Label>
              <NumberInput value={height} onChange={setHeight} min={1} max={5000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fontSize">{t('fontSize')}</Label>
              <NumberInput value={fontSize} onChange={setFontSize} min={1} max={200} />
            </div>
            <div className="space-y-2">
              <Label>{t('useExactSize')}</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="useExactSize"
                  checked={useExactSize}
                  onCheckedChange={setUseExactSize}
                />
                <Label htmlFor="useExactSize">{t('useExactSize')}</Label>
              </div>
            </div>
          </div>

          {/* Colors and Switch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customText">{t('customText')}</Label>
              <Input
                id="customText"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={t('customTextPlaceholder', { dimensions: `${width}x${height}` })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t('background')}</Label>
              <ColorPickerInput value={bgColor} onChange={setBgColor} placeholder="#cccccc" />
            </div>
            <div className="space-y-2">
              <Label>{t('textColor')}</Label>
              <ColorPickerInput value={fgColor} onChange={setFgColor} placeholder="#333333" />
            </div>
          </div>

          {/* SVG Output */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t('svgHtmlElement')}</Label>
              <TextareaCopyable
                value={svgString}
                rows={6}
                copyMessage="SVG HTML copied to clipboard"
              />
            </div>

            <div className="space-y-2">
              <Label>{t('svgInBase64')}</Label>
              <TextareaCopyable value={base64} rows={3} copyMessage="Base64 copied to clipboard" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={copySVG} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              {t('copySvg')}
            </Button>
            <Button onClick={copyBase64} variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              {t('copyBase64')}
            </Button>
            <Button onClick={downloadSVG}>
              <Download className="w-4 h-4 mr-2" />
              {t('downloadSvg')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={base64} alt="SVG Placeholder Preview" className="object-contain" />
    </ToolLayout>
  );
}
