import type { LucideIcon } from 'lucide-react';

export interface UserAgentResultSection {
  heading: string;
  icon: LucideIcon;
  content: {
    label: string;
    getValue: (blocks?: UAParser.IResult) => string | undefined;
    undefinedFallback?: string;
  }[];
}
