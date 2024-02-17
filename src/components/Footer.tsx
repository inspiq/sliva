import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Container } from 'src/components';

const MainLayout = styled.div`
  width: 100%;
  padding: 30px 0;
  background-color: ${({ theme }) => theme.footer};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.grey};
  text-align: center;
`;

const FooterElement = (): ReactElement => {
  const t = useTranslations('Footer');

  return (
    <MainLayout>
      <Container>© {t('text')}</Container>
    </MainLayout>
  );
};

export const Footer = FooterElement;
