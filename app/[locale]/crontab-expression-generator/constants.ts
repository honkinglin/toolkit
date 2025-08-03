// 动态导入不同语言版本的常量
export async function getCronHelpers(locale: string) {
  try {
    switch (locale) {
      case 'zh':
        const zhConstants = await import('./constants.zh');
        return zhConstants.cronHelpers;
      case 'en':
      default:
        const enConstants = await import('./constants.en');
        return enConstants.cronHelpers;
    }
  } catch {
    // 回退到英文版本
    const enConstants = await import('./constants.en');
    return enConstants.cronHelpers;
  }
}

export async function getCronLabels(locale: string) {
  try {
    switch (locale) {
      case 'zh':
        const zhConstants = await import('./constants.zh');
        return zhConstants.cronLabels;
      case 'en':
      default:
        const enConstants = await import('./constants.en');
        return enConstants.cronLabels;
    }
  } catch {
    // 回退到英文版本
    const enConstants = await import('./constants.en');
    return enConstants.cronLabels;
  }
}

// 用于TypeScript类型推导
export type { CronHelper } from './constants.en';
