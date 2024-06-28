import { useTranslations } from 'next-intl';
import { implementedTools, categories } from '@/lib/tools-data';
import { HomeContent } from '@/components/layout/home-content';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">{t('subtitle')}</p>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto" suppressHydrationWarning>
            {t('description')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{implementedTools.length}</div>
              <div className="text-sm text-muted-foreground">{t('stats.totalTools')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{categories.length}</div>
              <div className="text-sm text-muted-foreground">{t('stats.categories')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">{t('stats.freeToUse')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Tools Section */}
      <HomeContent />
    </div>
  );
}
