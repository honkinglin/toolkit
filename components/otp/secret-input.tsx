import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { RefreshCw } from 'lucide-react';
import { validateSecret } from '@/lib/otp-utils';

interface SecretInputProps {
  secret: string;
  onSecretChange: (secret: string) => void;
  onRefreshSecret: () => void;
}

export function SecretInput({ secret, onSecretChange, onRefreshSecret }: SecretInputProps) {
  const otp = useTranslations('otpCodeGenerator');
  const isValidSecret = validateSecret(secret);

  return (
    <div className="space-y-2 mb-6">
      <Label htmlFor="secret">{otp('secret')}</Label>
      <div className="flex">
        <Input
          id="secret"
          value={secret}
          onChange={(e) => onSecretChange(e.target.value)}
          placeholder={otp('secretPlaceholder')}
          className={`font-mono ${!isValidSecret ? 'border-red-500' : ''}`}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" className="ml-2" onClick={onRefreshSecret}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{otp('generateSecret')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {!isValidSecret && <p className="text-sm text-red-500">{otp('secretValidation')}</p>}
    </div>
  );
}
