import { Type, Hash } from 'lucide-react';

import { NavGroup } from './routes';

// 文本工具路由常量
export const TEXT_ROUTES = {
  TEXT_STATISTICS: '/text-statistics',
  TEXT_DIFF: '/text-diff',
} as const;

// 文本工具导航配置
export const textNavigationConfig: NavGroup = {
  titleKey: 'text',
  icon: Type,
  items: [
    {
      titleKey: 'textStatistics',
      url: TEXT_ROUTES.TEXT_STATISTICS,
      icon: Hash,
    },
  ],
};
