import { LucideIcon } from 'lucide-react';

import { CRYPTO_ROUTES, cryptoNavigationConfig } from './crypto';
import { CONVERTER_ROUTES, converterNavigationConfig } from './converter';
import { WEB_ROUTES, webNavigationConfig } from './web';
import { MEDIA_ROUTES, mediaNavigationConfig } from './media';
import { DEVELOPER_ROUTES, developerNavigationConfig } from './developer';
import { MATH_ROUTES, mathNavigationConfig } from './math';
import { MEASUREMENT_ROUTES, measurementNavigationConfig } from './measurement';
import { TEXT_ROUTES, textNavigationConfig } from './text';
import { DATA_ROUTES, dataNavigationConfig } from './data';

// 路由路径常量
export const ROUTES = {
  CRYPTO: CRYPTO_ROUTES,
  CONVERTER: CONVERTER_ROUTES,
  WEB: WEB_ROUTES,
  MEDIA: MEDIA_ROUTES,
  DEVELOPER: DEVELOPER_ROUTES,
  MATH: MATH_ROUTES,
  MEASUREMENT: MEASUREMENT_ROUTES,
  TEXT: TEXT_ROUTES,
  DATA: DATA_ROUTES,
} as const;

// 路由配置类型
export interface NavItem {
  titleKey: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

export interface NavGroup {
  titleKey: string;
  url?: string;
  icon?: LucideIcon;
  items: NavItem[];
}

// 导航配置
export const navigationConfig: NavGroup[] = [
  { ...cryptoNavigationConfig },
  { ...converterNavigationConfig },
  { ...webNavigationConfig },
  { ...mediaNavigationConfig },
  { ...developerNavigationConfig },
  { ...mathNavigationConfig },
  { ...measurementNavigationConfig },
  { ...textNavigationConfig },
  { ...dataNavigationConfig },
];

// 其他工具函数保持不变...
export const getAllRoutes = (): string[] => {
  return navigationConfig.flatMap((group) =>
    group.items.map((item) => item.url).filter((url) => url !== '#')
  );
};

export const getRouteInfo = (pathname: string) => {
  for (const group of navigationConfig) {
    const item = group.items.find((item) => item.url === pathname);
    if (item) {
      return {
        groupKey: group.titleKey,
        itemKey: item.titleKey,
        group,
        item,
      };
    }
  }
  return null;
};

export const isValidRoute = (pathname: string): boolean => {
  return getAllRoutes().includes(pathname);
};
