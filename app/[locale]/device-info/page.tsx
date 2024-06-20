'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ToolLayout } from '@/components/layout/tool-layout';

interface DeviceInfo {
  label: string;
  value: string | (() => string);
}

interface Section {
  name: string;
  information: DeviceInfo[];
}

// Custom hook to get window size
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateSize();

    // Add event listener
    window.addEventListener('resize', updateSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}

export default function DeviceInfoPage() {
  const di = useTranslations('deviceInfo');
  const { width, height } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ToolLayout title={di('title')} description={di('description')}>
        <div className="text-center py-8">Loading device information...</div>
      </ToolLayout>
    );
  }

  const sections: Section[] = [
    {
      name: di('sections.screen'),
      information: [
        {
          label: di('screen.screenSize'),
          value: `${window.screen?.availWidth || 0} x ${window.screen?.availHeight || 0}`,
        },
        {
          label: di('screen.orientation'),
          value: window.screen?.orientation?.type || 'unknown',
        },
        {
          label: di('screen.orientationAngle'),
          value: `${window.screen?.orientation?.angle || 0}°`,
        },
        {
          label: di('screen.colorDepth'),
          value: `${window.screen?.colorDepth || 0} bits`,
        },
        {
          label: di('screen.pixelRatio'),
          value: `${window.devicePixelRatio || 1} dppx`,
        },
        {
          label: di('screen.windowSize'),
          value: `${width} x ${height}`,
        },
      ],
    },
    {
      name: di('sections.device'),
      information: [
        {
          label: di('device.browserVendor'),
          value: navigator?.vendor || 'unknown',
        },
        {
          label: di('device.languages'),
          value: navigator?.languages?.join(', ') || 'unknown',
        },
        {
          label: di('device.platform'),
          value: navigator?.platform || 'unknown',
        },
        {
          label: di('device.userAgent'),
          value: navigator?.userAgent || 'unknown',
        },
      ],
    },
  ];

  return (
    <ToolLayout title={di('title')} description={di('description')}>
      <div className="space-y-6">
        {sections.map(({ name, information }) => (
          <Card key={name} className="w-full">
            <CardHeader>
              <Label className="text-lg font-semibold">{name}</Label>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {information.map(({ label, value }) => (
                  <div key={label} className="p-4 rounded-md bg-muted/50 space-y-2">
                    <div className="text-sm text-muted-foreground font-medium">{label}</div>
                    <div className="text-lg font-medium break-all">
                      {typeof value === 'function'
                        ? value()
                        : value || <span className="text-muted-foreground">unknown</span>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ToolLayout>
  );
}
