'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { ToolLayout } from '@/components/layout/tool-layout';
import { Progress } from '@/components/ui/progress';
import { useOTP } from '@/hooks/use-otp';
import { TokenDisplay } from './components/token-display';
import { QRCodeDisplay } from './components/qrcode-display';
import { TechnicalDetails } from './components/technical-details';
import { SecretInput } from './components/secret-input';

export default function OtpCodeGeneratorPage() {
  const otp = useTranslations('otpCodeGenerator');
  const {
    secret,
    setSecret,
    tokens,
    keyUri,
    progress,
    nextInSeconds,
    now,
    mounted,
    refreshSecret,
  } = useOTP();

  return (
    <ToolLayout title={otp('title')} description={otp('description')}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Main TOTP Section */}
        <Card className="w-full">
          <CardContent className="p-6">
            {/* Secret Input */}
            <SecretInput
              secret={secret}
              onSecretChange={setSecret}
              onRefreshSecret={refreshSecret}
            />

            {/* Token Display */}
            <TokenDisplay tokens={tokens} />

            {/* Progress Bar */}
            <div className="mt-4 space-y-2">
              <Progress value={progress} className="w-full" />
              <div className="text-center text-sm">
                {otp('nextIn')} {String(nextInSeconds).padStart(2, '0')}s
              </div>
            </div>

            {/* QR Code and Key URI */}
            <QRCodeDisplay keyUri={keyUri} />
          </CardContent>
        </Card>

        {/* Technical Details Section */}
        <TechnicalDetails secret={secret} now={now} mounted={mounted} />
      </div>
    </ToolLayout>
  );
}
