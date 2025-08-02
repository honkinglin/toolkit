import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import AppLayout from '@/components/layout/app-layout';
import { FavoritesProvider } from "@/contexts/favorites-context";

const locales = ['en', 'zh'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as string)) notFound();
  
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <FavoritesProvider>
        <AppLayout>
          {children}
        </AppLayout>
      </FavoritesProvider>
    </NextIntlClientProvider>
  );
}