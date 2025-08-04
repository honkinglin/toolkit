import { Calculator, Clock, Percent } from 'lucide-react';

import { NavGroup } from './routes';

// 数学工具路由常量
export const MATH_ROUTES = {
  MATH_EVALUATOR: '/math-evaluator',
  ETA_CALCULATOR: '/eta-calculator',
  PERCENTAGE_CALCULATOR: '/percentage-calculator',
} as const;

// 数学工具导航配置
export const mathNavigationConfig: NavGroup = {
  titleKey: 'math',
  icon: Calculator,
  items: [
    {
      titleKey: 'mathEvaluator',
      url: MATH_ROUTES.MATH_EVALUATOR,
      icon: Calculator,
    },
    {
      titleKey: 'etaCalculator',
      url: MATH_ROUTES.ETA_CALCULATOR,
      icon: Clock,
    },
    {
      titleKey: 'percentageCalculator',
      url: MATH_ROUTES.PERCENTAGE_CALCULATOR,
      icon: Percent,
    },
  ],
};
