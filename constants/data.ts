import { Phone, CreditCard } from 'lucide-react';

import { NavGroup } from './routes';

// 数据工具路由常量
export const DATA_ROUTES = {
  PHONE_PARSER_FORMATTER: '/phone-parser-formatter',
  IBAN_VALIDATOR_PARSER: '/iban-validator-parser',
} as const;

// 数据工具导航配置
export const dataNavigationConfig: NavGroup = {
  titleKey: 'data',
  icon: Phone,
  items: [
    {
      titleKey: 'phoneParserFormatter',
      url: DATA_ROUTES.PHONE_PARSER_FORMATTER,
      icon: Phone,
    },
    {
      titleKey: 'ibanValidatorParser',
      url: DATA_ROUTES.IBAN_VALIDATOR_PARSER,
      icon: CreditCard,
    },
  ],
};
