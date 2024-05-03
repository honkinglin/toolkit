import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'zh'];

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (typeof locale !== 'string' || !locales.includes(locale)) {
    console.log('i18n.ts - Locale not supported or undefined:', locale);
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`./locales/${locale}.json`)).default
  };
});