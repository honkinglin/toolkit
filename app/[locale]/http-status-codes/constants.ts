// 动态导入不同语言版本的常量
export async function getCodesByCategories(locale: string) {
  try {
    switch (locale) {
      case 'zh':
        const zhConstants = await import('./constants.zh');
        return zhConstants.codesByCategories;
      case 'en':
      default:
        const enConstants = await import('./constants.en');
        return enConstants.codesByCategories;
    }
  } catch {
    // 回退到英文版本
    const enConstants = await import('./constants.en');
    return enConstants.codesByCategories;
  }
}

// 用于TypeScript类型推导
export type HttpStatusCode = {
  code: number;
  name: string;
  description: string;
  type: 'HTTP' | 'WebDav';
};

export type HttpStatusCategory = {
  category: string;
  codes: HttpStatusCode[];
};
