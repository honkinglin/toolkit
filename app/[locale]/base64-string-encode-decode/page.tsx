'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCopy } from '@/hooks/use-copy';
import { useBase64StringConverter } from '@/hooks/use-base64-string-converter';
import { ToolLayout } from '@/components/layout/tool-layout';

export default function Base64StringConverterPage() {
  const t = useTranslations('sidebar');
  const b64 = useTranslations('base64StringConverter');
  const {
    textInput,
    setTextInput,
    base64Input,
    setBase64Input,
    encodeUrlSafe,
    setEncodeUrlSafe,
    decodeUrlSafe,
    setDecodeUrlSafe,
    base64Output,
    textOutput,
    base64Validation,
  } = useBase64StringConverter();

  const { copy: copyBase64 } = useCopy({
    source: base64Output,
    successMessage: 'Base64 string copied to the clipboard',
  });

  const { copy: copyText } = useCopy({
    source: textOutput,
    successMessage: 'String copied to the clipboard',
  });

  return (
    <ToolLayout
      title={t('base64StringEncodeDecode')}
      description="将字符串编码和解码为其 Base64 格式表示形式即可。"
    >
      {/* String to Base64 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{b64('stringToBase64')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Encode URL safe toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="encode-url-safe">{b64('encodeUrlSafe')}</Label>
            <Switch
              id="encode-url-safe"
              checked={encodeUrlSafe}
              onCheckedChange={setEncodeUrlSafe}
            />
          </div>

          {/* Input text */}
          <div className="space-y-2">
            <Label>{b64('stringToEncode')}</Label>
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={b64('stringPlaceholder')}
              rows={5}
              className="font-mono"
            />
          </div>

          {/* Output base64 */}
          <div className="space-y-2">
            <Label>{b64('base64OfString')}</Label>
            <Textarea
              value={base64Output}
              readOnly
              placeholder={b64('base64OutputPlaceholder')}
              rows={5}
              className="font-mono bg-gray-50"
            />
          </div>

          {/* Copy button */}
          <div className="flex justify-center">
            <Button onClick={copyBase64}>{b64('copyBase64')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Base64 to String */}
      <Card className="w-full mt-6">
        <CardHeader>
          <CardTitle>{b64('base64ToString')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Decode URL safe toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="decode-url-safe">{b64('decodeUrlSafe')}</Label>
            <Switch
              id="decode-url-safe"
              checked={decodeUrlSafe}
              onCheckedChange={setDecodeUrlSafe}
            />
          </div>

          {/* Input base64 */}
          <div className="space-y-2">
            <Label>{b64('base64StringToDecode')}</Label>
            <Textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder={b64('base64Placeholder')}
              rows={5}
              className="font-mono"
            />
            {!base64Validation.isValid && base64Input && (
              <p className="text-sm text-red-500">{base64Validation.error}</p>
            )}
          </div>

          {/* Output text */}
          <div className="space-y-2">
            <Label>{b64('decodedString')}</Label>
            <Textarea
              value={textOutput}
              readOnly
              placeholder={b64('decodedPlaceholder')}
              rows={5}
              className="font-mono bg-gray-50"
            />
          </div>

          {/* Copy button */}
          <div className="flex justify-center">
            <Button onClick={copyText}>{b64('copyDecodedString')}</Button>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
