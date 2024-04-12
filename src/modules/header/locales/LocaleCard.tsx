import { memo, type ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link, usePathname } from 'src/navigation';
import { EnglishIcon, RussiaIcon, SpanishIcon } from 'src/shared';

const StyledLink = styled(Link)`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.light_grey};
  }
`;

const locales: { [key: string]: ReactElement } = {
  ru: <RussiaIcon />,
  en: <EnglishIcon />,
  es: <SpanishIcon />,
};

const LocaleCardElement = (props: { locale: string }): ReactElement => {
  const { locale } = props;

  const currentPath = usePathname();
  const t = useTranslations('Header');

  return (
    <StyledLink href={currentPath} locale={locale}>
      {locales[locale]}
      {t(`language_switcher.languages.${locale}`)}
    </StyledLink>
  );
};

export const LocaleCard = memo(LocaleCardElement);
