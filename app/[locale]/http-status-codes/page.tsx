'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ToolLayout } from '@/components/layout/tool-layout';
import { useFuzzySearch } from '@/hooks/use-fuzzy-search';
import { getCodesByCategories, type HttpStatusCode, type HttpStatusCategory } from './constants';

export default function HttpStatusCodesPage() {
  const t = useTranslations('httpStatusCodes');
  const locale = useLocale();
  const [search, setSearch] = useState('');
  const [codesByCategories, setCodesByCategories] = useState<HttpStatusCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // 加载当前语言的状态码数据
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getCodesByCategories(locale);
        setCodesByCategories(JSON.parse(JSON.stringify(data)));
      } catch (error) {
        console.error('Failed to load status codes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [locale]);

  // 将所有状态码扁平化，包含分类信息
  const allCodes = useMemo(
    () =>
      codesByCategories.flatMap(({ codes, category }) =>
        codes.map((code: HttpStatusCode) => ({ ...code, category }))
      ),
    [codesByCategories]
  );

  const { searchResult } = useFuzzySearch({
    search,
    data: allCodes,
    options: {
      keys: [{ name: 'code', weight: 3 }, { name: 'name', weight: 2 }, 'description', 'category'],
      threshold: 0.4,
    },
  });

  // 根据搜索结果重新分组
  const codesByCategoryFiltered = useMemo(() => {
    if (!search.trim()) {
      return codesByCategories;
    }
    return [{ category: t('searchResults'), codes: searchResult }];
  }, [search, searchResult, t, codesByCategories]);

  if (loading) {
    return (
      <ToolLayout title={t('title')} description={t('description')}>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout title={t('title')} description={t('description')}>
      <div className="space-y-8 w-full">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="mb-10"
          autoFocus
        />

        {codesByCategoryFiltered.map(({ codes, category }) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold">{category}</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">{t('code')}</TableHead>
                      <TableHead className="w-48">{t('name')}</TableHead>
                      <TableHead>{t('descriptionHeader')}</TableHead>
                      <TableHead className="w-20">{t('type')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {codes.map(({ code, description, name, type }: HttpStatusCode) => (
                      <TableRow key={code}>
                        <TableCell className="font-bold">{code}</TableCell>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {description}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              type === 'HTTP'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                            }`}
                          >
                            {type}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
