'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ToolLayout } from '@/components/layout/tool-layout';

// 动态导入客户端组件，禁用 SSR
const KeycodeClient = dynamic(() => import('./keycode-client'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  ),
});

export default function KeycodeInfoPage() {
  const t = useTranslations('keycodeInfo');

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <KeycodeClient />
    </ToolLayout>
  );
}
