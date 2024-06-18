import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface UseQRCodeResult {
  qrCodeData: string;
  isLoading: boolean;
  error: string | null;
}

export function useQRCode(data: string): UseQRCodeResult {
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;

    setIsLoading(true);
    setError(null);

    QRCode.toDataURL(data, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
      width: 192,
    })
      .then((url) => {
        setQrCodeData(url);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to generate QR code:', err);
        setError(err.message);
        // Fallback to a placeholder
        setQrCodeData(
          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192"><rect width="192" height="192" fill="white"/><text x="96" y="96" text-anchor="middle" font-size="12">QR Error</text></svg>'
        );
        setIsLoading(false);
      });
  }, [data]);

  return {
    qrCodeData,
    isLoading,
    error,
  };
}
