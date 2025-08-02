"use client";

import { useTranslations } from "next-intl";
import { implementedTools, categories } from "@/lib/tools-data";
import { ToolCard } from "@/components/layout/tool-card";

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {t('subtitle')}
          </p>
          <p className="text-muted-foreground">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="container mx-auto px-4 py-12">
        {/* 特色工具 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-primary">⭐</span>
            {t('featuredTools')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementedTools.filter(tool => tool.featured).map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>

        {/* 按分类展示工具 */}
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              {t(`categories.${category}`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {implementedTools
                .filter(tool => tool.category === category && !tool.featured)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
          </div>
        ))}

        {/* 统计信息 */}
        <div className="mt-16 pt-8 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{implementedTools.length}</div>
              <div className="text-muted-foreground">{t('stats.totalTools')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
              <div className="text-muted-foreground">{t('stats.categories')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">{t('stats.freeToUse')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t('stats.available')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
