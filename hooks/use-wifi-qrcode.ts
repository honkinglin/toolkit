import { useState, useEffect, useMemo } from 'react';
import QRCode, { QRCodeToDataURLOptions } from 'qrcode';

export const wifiEncryptions = ['nopass', 'WPA', 'WEP', 'WPA2-EAP'] as const;
export type WifiEncryption = (typeof wifiEncryptions)[number];

// EAP methods based on the WiFi QR Code specification
export const EAPMethods = [
  'MD5',
  'POTP',
  'GTC',
  'TLS',
  'IKEv2',
  'SIM',
  'AKA',
  "AKA'",
  'TTLS',
  'PWD',
  'LEAP',
  'PSK',
  'FAST',
  'TEAP',
  'EKE',
  'NOOB',
  'PEAP',
] as const;
export type EAPMethod = (typeof EAPMethods)[number];

export const EAPPhase2Methods = ['None', 'MSCHAPV2'] as const;
export type EAPPhase2Method = (typeof EAPPhase2Methods)[number];

interface WifiQRCodeOptions {
  ssid: string;
  password: string;
  encryption: WifiEncryption;
  eapMethod?: EAPMethod;
  isHiddenSSID: boolean;
  eapAnonymous: boolean;
  eapIdentity?: string;
  eapPhase2Method?: EAPPhase2Method;
  foregroundColor: string;
  backgroundColor: string;
  options?: QRCodeToDataURLOptions;
}

interface UseWifiQRCodeResult {
  qrCodeData: string;
  isLoading: boolean;
  error: string | null;
}

function escapeString(str: string): string {
  // Replaces \, ;, ,, " and : with the same character preceded by a backslash
  return str.replace(/([\\;,:"])/g, '\\$1');
}

function generateWifiQRCodeText({
  ssid,
  password,
  encryption,
  eapMethod,
  isHiddenSSID,
  eapAnonymous,
  eapIdentity,
  eapPhase2Method,
}: Omit<WifiQRCodeOptions, 'foregroundColor' | 'backgroundColor' | 'options'>): string | null {
  if (!ssid.trim()) {
    return null;
  }

  const escapedSSID = escapeString(ssid.trim());
  const hiddenPart = isHiddenSSID ? 'H:true;' : '';

  if (encryption === 'nopass') {
    return `WIFI:S:${escapedSSID};;${hiddenPart}`;
  }

  if (encryption !== 'WPA2-EAP' && password.trim()) {
    const escapedPassword = escapeString(password.trim());
    return `WIFI:S:${escapedSSID};T:${encryption};P:${escapedPassword};${hiddenPart}`;
  }

  if (encryption === 'WPA2-EAP' && password.trim() && eapMethod) {
    // WPA2-EAP requires identity or anonymous mode
    if (!eapIdentity?.trim() && !eapAnonymous) {
      return null;
    }

    // PEAP method requires phase 2 method
    if (eapMethod === 'PEAP' && (!eapPhase2Method || eapPhase2Method === 'None')) {
      return null;
    }

    const escapedPassword = escapeString(password.trim());
    const identity = eapAnonymous ? 'A:anon;' : `I:${escapeString(eapIdentity?.trim() || '')};`;
    const phase2 = eapPhase2Method && eapPhase2Method !== 'None' ? `PH2:${eapPhase2Method};` : '';

    return `WIFI:S:${escapedSSID};T:WPA2-EAP;P:${escapedPassword};E:${eapMethod};${phase2}${identity}${hiddenPart}`;
  }

  return null;
}

export function useWifiQRCode(options: WifiQRCodeOptions): UseWifiQRCodeResult {
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
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
  } = options;

  const wifiText = useMemo(
    () =>
      generateWifiQRCodeText({
        ssid,
        password,
        encryption,
        eapMethod,
        isHiddenSSID,
        eapAnonymous,
        eapIdentity,
        eapPhase2Method,
      }),
    [
      ssid,
      password,
      encryption,
      eapMethod,
      isHiddenSSID,
      eapAnonymous,
      eapIdentity,
      eapPhase2Method,
    ]
  );

  useEffect(() => {
    if (!wifiText) {
      setQrCodeData('');
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const qrOptions: QRCodeToDataURLOptions = {
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      errorCorrectionLevel: 'M',
      width: 1024,
      ...options.options,
    };

    QRCode.toDataURL(wifiText, qrOptions)
      .then((dataUrl) => {
        setQrCodeData(dataUrl);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error generating WiFi QR code:', err);
        setQrCodeData('');
        setError(err instanceof Error ? err.message : 'Failed to generate QR code');
        setIsLoading(false);
      });
  }, [wifiText, foregroundColor, backgroundColor, options.options]);

  return {
    qrCodeData,
    isLoading,
    error,
  };
}
