import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputCopyable } from '@/components/ui/input-copyable';
import { base32toHex, getCounterFromTime } from '@/lib/otp-utils';

interface TechnicalDetailsProps {
  secret: string;
  now: number;
  mounted: boolean;
}

export function TechnicalDetails({ secret, now, mounted }: TechnicalDetailsProps) {
  const otp = useTranslations('otpCodeGenerator');

  return (
    <Card className="w-full">
      <CardHeader>
        <Label className="text-lg font-semibold">{otp('technicalDetails')}</Label>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">{otp('secretInHex')}</Label>
          <InputCopyable value={base32toHex(secret)} readonly />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">{otp('epoch')}</Label>
          <InputCopyable value={mounted ? Math.floor(now / 1000).toString() : '0'} readonly />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">{otp('iteration')}</Label>

          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium min-w-[90px] text-right">{otp('count')}:</Label>
            <div className="flex-1">
              <InputCopyable
                value={mounted ? String(getCounterFromTime({ now, timeStep: 30 })) : '0'}
                readonly
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Label className="text-sm font-medium min-w-[90px] text-right">
              {otp('paddedHex')}:
            </Label>
            <div className="flex-1">
              <InputCopyable
                value={
                  mounted
                    ? getCounterFromTime({ now, timeStep: 30 }).toString(16).padStart(16, '0')
                    : '0000000000000000'
                }
                readonly
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
