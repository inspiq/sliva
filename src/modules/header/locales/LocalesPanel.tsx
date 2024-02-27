import { memo, ReactElement } from 'react';

import { LocaleCard } from 'src/modules/header/locales/LocaleCard';
import { locales } from 'src/navigation';

const LocalesPanelElement = memo(
  (): ReactElement => (
    <>
      {locales.map((locale) => (
        <LocaleCard locale={locale} key={locale} />
      ))}
    </>
  ),
);

LocalesPanelElement.displayName = 'LocalesPanelElement';

export const LocalesPanel = LocalesPanelElement;
