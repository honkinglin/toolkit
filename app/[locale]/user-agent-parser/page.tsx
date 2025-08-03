'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { UAParser } from 'ua-parser-js';
import { Monitor, Zap, Settings, Smartphone, Cpu } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/layout/tool-layout';
import UserAgentResultCards from './user-agent-result-cards';
import type { UserAgentResultSection } from './types';
import { withDefaultOnError } from '@/lib/utils';

function getUserAgentInfo(userAgent: string): UAParser.IResult {
  return userAgent.trim().length > 0
    ? UAParser(userAgent.trim())
    : ({ ua: '', browser: {}, cpu: {}, device: {}, engine: {}, os: {} } as UAParser.IResult);
}

export default function UserAgentParserPage() {
  const t = useTranslations('userAgentParser');
  const [mounted, setMounted] = useState(false);
  const [ua, setUa] = useState('');

  useEffect(() => {
    setMounted(true);
    // Set the current user agent as default
    if (typeof navigator !== 'undefined') {
      setUa(navigator.userAgent);
    }
  }, []);

  const userAgentInfo = useMemo(
    () => withDefaultOnError(() => getUserAgentInfo(ua), {} as UAParser.IResult),
    [ua]
  );

  const sections: UserAgentResultSection[] = [
    {
      heading: t('sections.browser'),
      icon: Monitor,
      content: [
        {
          label: t('labels.name'),
          getValue: (block) => block?.browser.name,
          undefinedFallback: t('fallbacks.noBrowserName'),
        },
        {
          label: t('labels.version'),
          getValue: (block) => block?.browser.version,
          undefinedFallback: t('fallbacks.noBrowserVersion'),
        },
      ],
    },
    {
      heading: t('sections.engine'),
      icon: Zap,
      content: [
        {
          label: t('labels.name'),
          getValue: (block) => block?.engine.name,
          undefinedFallback: t('fallbacks.noEngineName'),
        },
        {
          label: t('labels.version'),
          getValue: (block) => block?.engine.version,
          undefinedFallback: t('fallbacks.noEngineVersion'),
        },
      ],
    },
    {
      heading: t('sections.os'),
      icon: Settings,
      content: [
        {
          label: t('labels.name'),
          getValue: (block) => block?.os.name,
          undefinedFallback: t('fallbacks.noOsName'),
        },
        {
          label: t('labels.version'),
          getValue: (block) => block?.os.version,
          undefinedFallback: t('fallbacks.noOsVersion'),
        },
      ],
    },
    {
      heading: t('sections.device'),
      icon: Smartphone,
      content: [
        {
          label: t('labels.model'),
          getValue: (block) => block?.device.model,
          undefinedFallback: t('fallbacks.noDeviceModel'),
        },
        {
          label: t('labels.type'),
          getValue: (block) => block?.device.type,
          undefinedFallback: t('fallbacks.noDeviceType'),
        },
        {
          label: t('labels.vendor'),
          getValue: (block) => block?.device.vendor,
          undefinedFallback: t('fallbacks.noDeviceVendor'),
        },
      ],
    },
    {
      heading: t('sections.cpu'),
      icon: Cpu,
      content: [
        {
          label: t('labels.architecture'),
          getValue: (block) => block?.cpu.architecture,
          undefinedFallback: t('fallbacks.noCpuArchitecture'),
        },
      ],
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-agent">{t('userAgentStringLabel')}</Label>
          <Textarea
            id="user-agent"
            value={ua}
            onChange={(e) => setUa(e.target.value)}
            placeholder={t('userAgentStringPlaceholder')}
            className="min-h-[80px] font-mono text-sm"
            rows={2}
          />
        </div>

        <UserAgentResultCards userAgentInfo={userAgentInfo} sections={sections} />
      </div>
    </ToolLayout>
  );
}
