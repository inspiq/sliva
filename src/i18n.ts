import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { locales } from 'src/navigation';

export default getRequestConfig(async ({ locale }) => {
  const baseLocale = new Intl.Locale(locale).baseName;

  if (!locales.includes(baseLocale)) notFound();

  return {
    messages: (await import(`src/messages/${baseLocale}.json`)).default,
  };
});
