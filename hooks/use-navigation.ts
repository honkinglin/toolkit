import { useTranslations, useLocale } from 'next-intl';
import { navigationConfig, type NavGroup, type NavItem } from '@/constants/routes';
import { type LucideIcon } from 'lucide-react';

interface TranslatedNavItem extends Omit<NavItem, 'titleKey'> {
  title: string;
  titleKey: string;
  icon?: LucideIcon;
}

interface TranslatedNavGroup extends Omit<NavGroup, 'titleKey' | 'items'> {
  title: string;
  titleKey: string;
  icon?: LucideIcon;
  items: TranslatedNavItem[];
}

export const useNavigation = () => {
  const t = useTranslations('sidebar');
  const locale = useLocale();

  const getNavigationData = (): TranslatedNavGroup[] => {
    return navigationConfig.map(group => ({
      ...group,
      title: t(group.titleKey as string),
      items: group.items.map(item => ({
        ...item,
        title: t(item.titleKey as string),
        // 在这里添加语言前缀
        url: `/${locale}${item.url}`,
      })),
    }));
  };

  return {
    navigationData: getNavigationData(),
  };
};