import { Timer, Thermometer } from 'lucide-react';

import { NavGroup } from './routes';

// 测量工具路由常量
export const MEASUREMENT_ROUTES = {
  CHRONOMETER: '/chronometer',
  TEMPERATURE_CONVERTER: '/temperature-converter',
} as const;

// 测量工具导航配置
export const measurementNavigationConfig: NavGroup = {
  titleKey: 'measurement',
  icon: Timer,
  items: [
    {
      titleKey: 'chronometer',
      url: MEASUREMENT_ROUTES.CHRONOMETER,
      icon: Timer,
    },
    {
      titleKey: 'temperatureConverter',
      url: MEASUREMENT_ROUTES.TEMPERATURE_CONVERTER,
      icon: Thermometer,
    },
  ],
};
