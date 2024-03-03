import { ReactElement } from 'react';

import { LocaleCard } from 'src/modules/header/locales/LocaleCard';
import { locales } from 'src/navigation';

const LocalesPanelElement = (): ReactElement => (
  <>
    {locales.map((locale) => (
      <LocaleCard locale={locale} key={locale} />
    ))}
  </>
);

export const LocalesPanel = LocalesPanelElement;
