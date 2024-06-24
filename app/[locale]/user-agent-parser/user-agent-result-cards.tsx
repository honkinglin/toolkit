'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { UserAgentResultSection } from './types';

interface UserAgentResultCardsProps {
  userAgentInfo?: UAParser.IResult;
  sections: UserAgentResultSection[];
}

export default function UserAgentResultCards({
  userAgentInfo,
  sections,
}: UserAgentResultCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {sections.map(({ heading, icon: Icon, content }) => (
        <Card key={heading} className="h-full">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={24} className="text-muted-foreground" />
              <span className="text-lg font-medium">{heading}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {content.map(({ label, getValue }) => {
                const value = getValue(userAgentInfo);
                return value ? (
                  <TooltipProvider key={label}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="text-sm">
                          {value}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null;
              })}
            </div>

            <div className="flex flex-col gap-1">
              {content.map(({ label, getValue, undefinedFallback }) => {
                const value = getValue(userAgentInfo);
                return value === undefined && undefinedFallback ? (
                  <span key={label} className="text-sm text-muted-foreground opacity-70">
                    {undefinedFallback}
                  </span>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
