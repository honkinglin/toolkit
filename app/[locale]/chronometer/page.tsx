'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ToolLayout } from '@/components/layout/tool-layout';

// Format milliseconds to HH:MM:SS.mmm format
function formatMs(msTotal: number): string {
  const ms = msTotal % 1000;
  const secs = ((msTotal - ms) / 1000) % 60;
  const mins = (((msTotal - ms) / 1000 - secs) / 60) % 60;
  const hrs = (((msTotal - ms) / 1000 - secs) / 60 - mins) / 60;
  const hrsString = hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : '';

  return `${hrsString}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms
    .toString()
    .padStart(3, '0')}`;
}

export default function ChronometerPage() {
  const t = useTranslations('measurement.chronometer');

  const [isRunning, setIsRunning] = useState(false);
  const [counter, setCounter] = useState(0);
  const previousRafDateRef = useRef(Date.now());
  const rafIdRef = useRef<number | null>(null);

  const rafCallback = useCallback(() => {
    const deltaMs = Date.now() - previousRafDateRef.current;
    previousRafDateRef.current = Date.now();
    setCounter((prev) => prev + deltaMs);

    if (rafIdRef.current !== null) {
      rafIdRef.current = requestAnimationFrame(rafCallback);
    }
  }, []);

  const resume = useCallback(() => {
    previousRafDateRef.current = Date.now();
    rafIdRef.current = requestAnimationFrame(rafCallback);
    setIsRunning(true);
  }, [rafCallback]);

  const pause = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setCounter(0);
    setIsRunning(false);
  }, []);

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto">
        <Card className="w-full">
          <CardContent className="p-8">
            <div className="text-center text-4xl font-mono font-bold text-foreground">
              {formatMs(counter)}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-3">
          {!isRunning ? (
            <Button onClick={resume} size="lg">
              <Play className="h-5 w-5 mr-2" />
              {t('start')}
            </Button>
          ) : (
            <Button onClick={pause} variant="destructive" size="lg">
              <Pause className="h-5 w-5 mr-2" />
              {t('stop')}
            </Button>
          )}

          <Button onClick={reset} variant="outline" size="lg">
            <RotateCcw className="h-5 w-5 mr-2" />
            {t('reset')}
          </Button>
        </div>
      </div>
    </ToolLayout>
  );
}
