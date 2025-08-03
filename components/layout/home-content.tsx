'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { implementedTools, categories } from '@/lib/tools-data';
import { ToolCard } from '@/components/layout/tool-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Zap, Users } from 'lucide-react';

export function HomeContent() {
  const t = useTranslations('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = implementedTools.filter((tool) => {
    const matchesSearch =
      searchTerm === '' ||
      tool.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(`tools.${tool.id}.title`).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(`tools.${tool.id}.description`).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === null || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredTools = filteredTools.filter((tool) => tool.featured);
  const categoryTools = selectedCategory
    ? filteredTools.filter((tool) => tool.category === selectedCategory && !tool.featured)
    : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge
            variant={selectedCategory === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            {t('allCategories')}
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {t(`categories.${category}`)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Tools */}
      {featuredTools.length > 0 && searchTerm === '' && selectedCategory === null && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            {t('featuredTools')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured />
            ))}
          </div>
        </div>
      )}

      {/* Category Tools or Search Results */}
      {selectedCategory ? (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-500" />
            {t(`categories.${selectedCategory}`)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      ) : searchTerm ? (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {t('searchResults')} ({filteredTools.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} featured={tool.featured} />
            ))}
          </div>
        </div>
      ) : (
        /* All Categories */
        categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-green-500" />
              {t(`categories.${category}`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {implementedTools
                .filter((tool) => tool.category === category && !tool.featured)
                .map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
            </div>
          </div>
        ))
      )}

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('noToolsFound')}</p>
        </div>
      )}
    </div>
  );
}
