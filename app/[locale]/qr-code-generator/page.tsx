'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const errorCorrectionLevels: QRCodeErrorCorrectionLevel[] = ['low', 'medium', 'quartile', 'high'];

export default function QRCodeGeneratorPage() {
  const t = useTranslations('qrCodeGenerator');

  const [text, setText] = useState('https://toolkit-ashen-two.vercel.app/en/qr-code-generator');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<QRCodeErrorCorrectionLevel>('medium');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [error, setError] = useState('');

  // 防抖生成二维码
  const generateQRCode = useCallback(
    (
      textValue: string,
      fgColor: string,
      bgColor: string,
      errorLevel: QRCodeErrorCorrectionLevel
    ) => {
      if (!textValue.trim()) {
        setQrCodeDataUrl('');
        setError('');
        return;
      }

      setError(''); // 清除之前的错误

      QRCode.toDataURL(textValue.trim(), {
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorLevel,
        width: 1024,
      })
        .then((dataUrl) => {
          setQrCodeDataUrl(dataUrl);
        })
        .catch((err) => {
          console.error('Error generating QR code:', err);
          setQrCodeDataUrl('');
          setError(err instanceof Error ? err.message : 'Failed to generate QR code');
        });
    },
    []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      generateQRCode(text, foregroundColor, backgroundColor, errorCorrectionLevel);
    }, 200); // 200ms 防抖延迟

    return () => clearTimeout(debounceTimer);
  }, [text, foregroundColor, backgroundColor, errorCorrectionLevel, generateQRCode]);

  const downloadQRCode = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.href = qrCodeDataUrl;
      link.download = 'qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left section - Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Text input */}
              <div className="space-y-2">
                <Label htmlFor="qr-text">{t('textLabel')}</Label>
                <Textarea
                  id="qr-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('textPlaceholder')}
                  rows={3}
                />
              </div>

              {/* Color controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('foregroundColor')}</Label>
                  <div className="space-y-3">
                    <HexColorPicker
                      color={foregroundColor}
                      onChange={setForegroundColor}
                      style={{ width: '100%', height: '120px' }}
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => {
                        const color = e.target.value;
                        if (colord(color).isValid() || color === '') {
                          setForegroundColor(color);
                        }
                      }}
                      placeholder="#000000"
                      className="font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('backgroundColor')}</Label>
                  <div className="space-y-3">
                    <HexColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                      style={{ width: '100%', height: '120px' }}
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => {
                        const color = e.target.value;
                        if (colord(color).isValid() || color === '') {
                          setBackgroundColor(color);
                        }
                      }}
                      placeholder="#ffffff"
                      className="font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Error correction level */}
              <div className="space-y-2">
                <Label htmlFor="error-correction">{t('errorCorrectionLevel')}</Label>
                <Select
                  value={errorCorrectionLevel}
                  onValueChange={(value: QRCodeErrorCorrectionLevel) =>
                    setErrorCorrectionLevel(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {errorCorrectionLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(`errorLevels.${level}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right section - QR Code preview and download */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {error ? (
                <div className="w-48 h-48 border-2 border-dashed border-red-300 rounded-lg flex items-center justify-center text-red-500 text-center p-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Generation Failed</div>
                    <div className="text-xs">{error}</div>
                  </div>
                </div>
              ) : qrCodeDataUrl ? (
                <>
                  <div className="border rounded-lg p-4 bg-white">
                    <Image
                      src={qrCodeDataUrl}
                      alt="Generated QR Code"
                      width={192}
                      height={192}
                      className="object-contain"
                    />
                  </div>
                  <Button onClick={downloadQRCode} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    {t('downloadButton')}
                  </Button>
                </>
              ) : (
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                  {t('noQrCode')}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
