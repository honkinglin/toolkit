import {
  GitBranch,
  Terminal,
  Clock,
  Braces,
  Archive,
  FileSpreadsheet,
  Database,
  Calculator,
  Package,
  Code,
  FileText,
  Mail,
  Type,
  BookOpen,
} from 'lucide-react';

export const DEVELOPER_ROUTES = {
  GIT_MEMO: '/git-memo',
  RANDOM_PORT_GENERATOR: '/random-port-generator',
  CRONTAB_EXPRESSION_GENERATOR: '/crontab-expression-generator',
  JSON_BEAUTIFY_FORMAT: '/json-beautify-format',
  JSON_COMPRESS: '/json-compress',
  JSON_TO_CSV: '/json-to-csv',
  SQL_BEAUTIFY_FORMAT: '/sql-beautify-format',
  CHMOD_CALCULATOR: '/chmod-calculator',
  DOCKER_RUN_TO_DOCKER_COMPOSE: '/docker-run-to-docker-compose',
  XML_FORMAT: '/xml-format',
  YAML_BEAUTIFY_FORMAT: '/yaml-beautify-format',
  EMAIL_NORMALIZER: '/email-normalizer',
  REGEX_TESTER: '/regex-tester',
  REGEX_CHEATSHEET: '/regex-cheatsheet',
};

export const developerNavigationConfig = {
  titleKey: 'developer',
  url: '#',
  icon: Code,
  items: [
    {
      titleKey: 'gitMemo',
      url: DEVELOPER_ROUTES.GIT_MEMO,
      icon: GitBranch,
    },
    {
      titleKey: 'randomPortGenerator',
      url: DEVELOPER_ROUTES.RANDOM_PORT_GENERATOR,
      icon: Terminal,
    },
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
    {
      titleKey: 'dockerRunToDockerCompose',
      url: DEVELOPER_ROUTES.DOCKER_RUN_TO_DOCKER_COMPOSE,
      icon: Package,
    },
    {
      titleKey: 'xmlFormat',
      url: DEVELOPER_ROUTES.XML_FORMAT,
      icon: Code,
    },
    {
      titleKey: 'yamlBeautifyFormat',
      url: DEVELOPER_ROUTES.YAML_BEAUTIFY_FORMAT,
      icon: FileText,
    },
    {
      titleKey: 'emailNormalizer',
      url: DEVELOPER_ROUTES.EMAIL_NORMALIZER,
      icon: Mail,
    },
    {
      titleKey: 'regexTester',
      url: DEVELOPER_ROUTES.REGEX_TESTER,
      icon: Type,
    },
    {
      titleKey: 'regexCheatsheet',
      url: DEVELOPER_ROUTES.REGEX_CHEATSHEET,
      icon: BookOpen,
    },
  ],
};
