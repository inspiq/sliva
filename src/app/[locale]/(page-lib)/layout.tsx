import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { App } from 'src/app/[locale]/(page-lib)/app';

type LocaleVariants = 'en' | 'ru' | 'es';

interface Props {
  params: { locale: LocaleVariants };
}

export const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sliva',
  description: 'Sliva — specialist search service',
};

const RootLayout = (props: PropsWithChildren<Props>) => {
  const { children, params } = props;

  const messages = useMessages();

  return (
    <html lang={params.locale}>
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <App>{children}</App>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
