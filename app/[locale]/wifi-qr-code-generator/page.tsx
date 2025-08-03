'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { HexColorPicker } from 'react-colorful';
import { colord } from 'colord';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, Eye, EyeOff } from 'lucide-react';
import {
  useWifiQRCode,
  type WifiEncryption,
  type EAPMethod,
  type EAPPhase2Method,
  EAPMethods,
  EAPPhase2Methods,
} from '@/hooks/use-wifi-qrcode';

export default function WifiQRCodeGeneratorPage() {
  const t = useTranslations('wifiQrCodeGenerator');

  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState<WifiEncryption>('WPA');
  const [eapMethod, setEapMethod] = useState<EAPMethod>('PEAP');
  const [isHiddenSSID, setIsHiddenSSID] = useState(false);
  const [eapAnonymous, setEapAnonymous] = useState(false);
  const [eapIdentity, setEapIdentity] = useState('');
  const [eapPhase2Method, setEapPhase2Method] = useState<EAPPhase2Method>('MSCHAPV2');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showPassword, setShowPassword] = useState(false);

  const { qrCodeData, isLoading, error } = useWifiQRCode({
    ssid,
    password,
    encryption,
    eapMethod,
    isHiddenSSID,
    eapAnonymous,
    eapIdentity,
    eapPhase2Method,
    foregroundColor,
    backgroundColor,
  });

  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement('a');
      link.href = qrCodeData;
      link.download = 'wifi-qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const encryptionOptions = [
    { value: 'nopass', label: t('encryptionOptions.nopass') },
    { value: 'WPA', label: t('encryptionOptions.wpa') },
    { value: 'WEP', label: t('encryptionOptions.wep') },
    { value: 'WPA2-EAP', label: t('encryptionOptions.wpa2eap') },
  ] as const;

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left section - Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Encryption method */}
              <div className="space-y-2">
                <Label htmlFor="encryption">{t('encryptionMethod')}</Label>
                <Select
                  value={encryption}
                  onValueChange={(value: WifiEncryption) => setEncryption(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {encryptionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* SSID and Hidden checkbox */}
              <div className="space-y-2">
                <Label htmlFor="ssid">{t('ssid')}</Label>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      id="ssid"
                      value={ssid}
                      onChange={(e) => setSsid(e.target.value)}
                      placeholder={t('ssidPlaceholder')}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pb-1">
                    <Checkbox
                      id="hidden-ssid"
                      checked={isHiddenSSID}
                      onCheckedChange={(checked: boolean) => setIsHiddenSSID(checked === true)}
                    />
                    <Label htmlFor="hidden-ssid" className="text-sm">
                      {t('hiddenSsid')}
                    </Label>
                  </div>
                </div>
              </div>

              {/* Password */}
              {encryption !== 'nopass' && (
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('passwordPlaceholder')}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* EAP specific fields */}
              {encryption === 'WPA2-EAP' && (
                <>
                  {/* EAP Method */}
                  <div className="space-y-2">
                    <Label htmlFor="eap-method">{t('eapMethod')}</Label>
                    <Select
                      value={eapMethod}
                      onValueChange={(value: EAPMethod) => setEapMethod(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EAPMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* EAP Identity and Anonymous */}
                  <div className="space-y-2">
                    <Label htmlFor="eap-identity">{t('eapIdentity')}</Label>
                    <div className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          id="eap-identity"
                          value={eapIdentity}
                          onChange={(e) => setEapIdentity(e.target.value)}
                          placeholder={t('eapIdentityPlaceholder')}
                          disabled={eapAnonymous}
                        />
                      </div>
                      <div className="flex items-center space-x-2 pb-1">
                        <Checkbox
                          id="eap-anonymous"
                          checked={eapAnonymous}
                          onCheckedChange={(checked: boolean) => setEapAnonymous(checked === true)}
                        />
                        <Label htmlFor="eap-anonymous" className="text-sm">
                          {t('anonymous')}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* EAP Phase 2 Method */}
                  <div className="space-y-2">
                    <Label htmlFor="eap-phase2">{t('eapPhase2Method')}</Label>
                    <Select
                      value={eapPhase2Method}
                      onValueChange={(value: EAPPhase2Method) => setEapPhase2Method(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {EAPPhase2Methods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

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
            </div>

            {/* Right section - QR Code preview and download */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {isLoading ? (
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                    <div className="text-sm">Generating...</div>
                  </div>
                </div>
              ) : error ? (
                <div className="w-48 h-48 border-2 border-dashed border-red-300 rounded-lg flex items-center justify-center text-red-500 text-center p-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Generation Failed</div>
                    <div className="text-xs">{error}</div>
                  </div>
                </div>
              ) : qrCodeData ? (
                <>
                  <div className="border rounded-lg p-4 bg-white">
                    <Image
                      src={qrCodeData}
                      alt="Generated WiFi QR Code"
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
                <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-center p-4">
                  <div className="text-sm">{t('noQrCode')}</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
}
