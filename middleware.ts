import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],

  // 默认语言
  defaultLocale: 'en',

  // 禁用自动语言检测
  localeDetection: false
});

export const config = {
  // 匹配所有需要国际化的路径
  matcher: [
    // 匹配根路径
    '/',

    // 匹配所有带语言前缀的路径
    '/(en|zh)/:path*',

    // 匹配其他需要重定向的路径
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};