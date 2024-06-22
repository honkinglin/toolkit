'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { InputCopyable } from '@/components/ui/input-copyable';

export default function KeycodeClient() {
  const t = useTranslations('keycodeInfo');

  const [event, setEvent] = useState<KeyboardEvent | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setEvent(e);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fields = [
    {
      label: 'Key :',
      value: event?.key || '',
      placeholder: t('noKeyPressed'),
    },
    {
      label: 'Keycode :',
      value: event ? String(event.keyCode) : '',
      placeholder: t('noKeyPressed'),
    },
    {
      label: 'Code :',
      value: event?.code || '',
      placeholder: t('noKeyPressed'),
    },
    {
      label: 'Location :',
      value: event ? String(event.location) : '',
      placeholder: t('noKeyPressed'),
    },
    {
      label: 'Modifiers :',
      value: event
        ? [
            event.metaKey && 'Meta',
            event.shiftKey && 'Shift',
            event.ctrlKey && 'Ctrl',
            event.altKey && 'Alt',
          ]
            .filter(Boolean)
            .join(' + ')
        : '',
      placeholder: 'None',
    },
  ];

  return (
    <Card className="w-full max-w-2xl">
      <CardContent>
        <div className="text-center py-8 mb-6">
          {event && <div className="text-3xl mb-2">{event.key}</div>}
          <span className="text-muted-foreground leading-none">{t('instructions')}</span>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={index} className="flex items-center gap-3">
              <Label className="w-32 flex-shrink-0 text-right">{field.label}</Label>
              <InputCopyable
                value={field.value || field.placeholder}
                readonly={true}
                className="flex-1"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
