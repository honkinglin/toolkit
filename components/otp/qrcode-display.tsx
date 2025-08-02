import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useQRCode } from '@/hooks/use-qrcode';

interface QRCodeDisplayProps {
  keyUri: string;
}

export function QRCodeDisplay({ keyUri }: QRCodeDisplayProps) {
  const otp = useTranslations('otpCodeGenerator');
  const { qrCodeData, isLoading } = useQRCode(keyUri);

  return (
    <div className="mt-6 flex flex-col items-center space-y-4">
      <div className="w-52 h-52 border rounded-lg flex items-center justify-center bg-white">
        {qrCodeData && !isLoading ? (
          <Image src={qrCodeData} alt="QR Code" width={192} height={192} className="w-48 h-48" />
        ) : (
          <div className="w-48 h-48 flex items-center justify-center text-gray-400">
            {otp('generatingQR')}
          </div>
        )}
      </div>
      <Button asChild variant="outline">
        <a href={keyUri} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4 mr-2" />
          {otp('openKeyUri')}
        </a>
      </Button>
    </div>
  );
}
