import { Clock, Braces, Archive, FileSpreadsheet, Database, Calculator, Code } from 'lucide-react';

export const DEVELOPER_ROUTES = {
  CRONTAB_EXPRESSION_GENERATOR: '/crontab-expression-generator',
  JSON_BEAUTIFY_FORMAT: '/json-beautify-format',
  JSON_COMPRESS: '/json-compress',
  JSON_TO_CSV: '/json-to-csv',
  SQL_BEAUTIFY_FORMAT: '/sql-beautify-format',
  CHMOD_CALCULATOR: '/chmod-calculator',
};

export const developerNavigationConfig = {
  titleKey: 'developer',
  url: '#',
  icon: Code,
  items: [
    {
      titleKey: 'crontabExpressionGenerator',
      url: DEVELOPER_ROUTES.CRONTAB_EXPRESSION_GENERATOR,
      icon: Clock,
    },
    {
      titleKey: 'jsonBeautifyFormat',
      url: DEVELOPER_ROUTES.JSON_BEAUTIFY_FORMAT,
      icon: Braces,
    },
    {
      titleKey: 'jsonCompress',
      url: DEVELOPER_ROUTES.JSON_COMPRESS,
      icon: Archive,
    },
    {
      titleKey: 'jsonToCsv',
      url: DEVELOPER_ROUTES.JSON_TO_CSV,
      icon: FileSpreadsheet,
    },
    {
      titleKey: 'sqlBeautifyFormat',
      url: DEVELOPER_ROUTES.SQL_BEAUTIFY_FORMAT,
      icon: Database,
    },
    {
      titleKey: 'chmodCalculator',
      url: DEVELOPER_ROUTES.CHMOD_CALCULATOR,
      icon: Calculator,
    },
  ],
};
