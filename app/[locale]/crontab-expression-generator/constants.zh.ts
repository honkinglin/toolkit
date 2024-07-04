export interface CronHelper {
  symbol: string;
  meaning: string;
  example: string;
  equivalent: string;
}

export const cronHelpers: CronHelper[] = [
  {
    symbol: '*',
    meaning: '任意值',
    example: '* * * * *',
    equivalent: '每分钟',
  },
  {
    symbol: '-',
    meaning: '值的范围',
    example: '1-10 * * * *',
    equivalent: '第1到第10分钟',
  },
  {
    symbol: ',',
    meaning: '值的列表',
    example: '1,10 * * * *',
    equivalent: '在第1和第10分钟',
  },
  {
    symbol: '/',
    meaning: '步长值',
    example: '*/10 * * * *',
    equivalent: '每10分钟',
  },
  {
    symbol: '@yearly',
    meaning: '每年1月1日午夜执行一次',
    example: '@yearly',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@annually',
    meaning: '与@yearly相同',
    example: '@annually',
    equivalent: '0 0 1 1 *',
  },
  {
    symbol: '@monthly',
    meaning: '每月第一天午夜执行一次',
    example: '@monthly',
    equivalent: '0 0 1 * *',
  },
  {
    symbol: '@weekly',
    meaning: '每周日午夜执行一次',
    example: '@weekly',
    equivalent: '0 0 * * 0',
  },
  {
    symbol: '@daily',
    meaning: '每天午夜执行一次',
    example: '@daily',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@midnight',
    meaning: '与@daily相同',
    example: '@midnight',
    equivalent: '0 0 * * *',
  },
  {
    symbol: '@hourly',
    meaning: '每小时开始时执行一次',
    example: '@hourly',
    equivalent: '0 * * * *',
  },
  {
    symbol: '@reboot',
    meaning: '启动时运行',
    example: '',
    equivalent: '',
  },
];

export const cronLabels = {
  formatTitle: 'Cron表达式格式',
  symbol: '符号',
  meaning: '含义',
  example: '示例',
  equivalent: '等效于',
  placeholder: '* * * * *',
  invalid: '此cron表达式无效',
  verbose: '详细模式',
  use24HourFormat: '使用24小时制',
  dayStartsAtZero: '星期从0开始',
};
