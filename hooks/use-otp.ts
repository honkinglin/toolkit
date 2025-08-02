import { useState, useEffect, useMemo } from 'react';
import { generateSecret, generateTOTP, buildKeyUri } from '@/lib/otp-utils';

interface OTPTokens {
  previous: string;
  current: string;
  next: string;
}

interface UseOTPResult {
  secret: string;
  setSecret: (secret: string) => void;
  tokens: OTPTokens;
  keyUri: string;
  progress: number;
  nextInSeconds: number;
  interval: number;
  now: number;
  mounted: boolean;
  refreshSecret: () => void;
}

export function useOTP(): UseOTPResult {
  const [secret, setSecret] = useState('ABCDEFGHIJKLMNOP'); // Fixed initial value for SSR
  const [now, setNow] = useState(Date.now());
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    // Generate random secret only after mounting
    setSecret(generateSecret());
  }, []);

  // Update timestamp every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate interval progress (0-30 seconds) - only after mounting to avoid hydration mismatch
  const interval = useMemo(() => {
    if (!mounted) return 0;
    return (now / 1000) % 30;
  }, [now, mounted]);

  const progress = useMemo(() => {
    if (!mounted) return 0;
    return (100 * interval) / 30;
  }, [interval, mounted]);

  const nextInSeconds = useMemo(() => {
    if (!mounted) return 30;
    return Math.floor(30 - interval);
  }, [interval, mounted]);

  // Generate tokens - use stable values during SSR
  const tokens = useMemo((): OTPTokens => {
    if (!mounted) {
      // Return placeholder values during SSR to avoid hydration mismatch
      return {
        previous: '000000',
        current: '000000',
        next: '000000',
      };
    }
    return {
      previous: generateTOTP({ key: secret, now: now - 30000 }),
      current: generateTOTP({ key: secret, now }),
      next: generateTOTP({ key: secret, now: now + 30000 }),
    };
  }, [secret, now, mounted]);

  // Generate Key URI
  const keyUri = useMemo(() => buildKeyUri({ secret }), [secret]);

  const refreshSecret = () => {
    setSecret(generateSecret());
  };

  return {
    secret,
    setSecret,
    tokens,
    keyUri,
    progress,
    nextInSeconds,
    interval,
    now,
    mounted,
    refreshSecret,
  };
}
