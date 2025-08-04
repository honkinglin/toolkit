import { Type, Smile, Eraser, GitCompare, Hash, Palette } from 'lucide-react';

import { NavGroup } from './routes';

// 文本工具路由常量
export const TEXT_ROUTES = {
  TEXT_STATISTICS: '/text-statistics',
  EMOJI_PICKER: '/emoji-picker',
  STRING_OBFUSCATOR: '/string-obfuscator',
  TEXT_DIFF: '/text-diff',
  NUMERONYM_GENERATOR: '/numeronym-generator',
  ASCII_TEXT_DRAWER: '/ascii-text-drawer',
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
    {
      titleKey: 'emojiPicker',
      url: TEXT_ROUTES.EMOJI_PICKER,
      icon: Smile,
    },
    {
      titleKey: 'stringObfuscator',
      url: TEXT_ROUTES.STRING_OBFUSCATOR,
      icon: Eraser,
    },
    {
      titleKey: 'textDiff',
      url: TEXT_ROUTES.TEXT_DIFF,
      icon: GitCompare,
    },
    {
      titleKey: 'numeronymGenerator',
      url: TEXT_ROUTES.NUMERONYM_GENERATOR,
      icon: Hash,
    },
    {
      titleKey: 'asciiTextDrawer',
      url: TEXT_ROUTES.ASCII_TEXT_DRAWER,
      icon: Palette,
    },
  ],
};
