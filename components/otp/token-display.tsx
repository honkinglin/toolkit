import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useCopyWithTooltip } from '@/hooks/use-copy';

interface TokenDisplayProps {
  tokens: {
    previous: string;
    current: string;
    next: string;
  };
}

export function TokenDisplay({ tokens }: TokenDisplayProps) {
  const otp = useTranslations('otpCodeGenerator');

  const { copied: previousCopied, handleCopy: handlePreviousCopy } = useCopyWithTooltip();
  const { copied: currentCopied, handleCopy: handleCurrentCopy } = useCopyWithTooltip();
  const { copied: nextCopied, handleCopy: handleNextCopy } = useCopyWithTooltip();

  return (
    <div className="space-y-2">
      <div className="flex items-center w-full text-sm">
        <div className="flex-1 text-left">{otp('previous')}</div>
        <div className="flex-1 text-center">{otp('currentOtp')}</div>
        <div className="flex-1 text-right">{otp('next')}</div>
      </div>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-r-none font-mono"
              onClick={() => handlePreviousCopy(tokens.previous)}
            >
              {tokens.previous}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{previousCopied ? otp('copied') : otp('copyPrevious')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-none border-x text-xl font-mono"
              onClick={() => handleCurrentCopy(tokens.current)}
            >
              {tokens.current}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{currentCopied ? otp('copied') : otp('copyCurrent')}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-l-none font-mono"
              onClick={() => handleNextCopy(tokens.next)}
            >
              {tokens.next}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{nextCopied ? otp('copied') : otp('copyNext')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
