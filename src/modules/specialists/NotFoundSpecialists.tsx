import type { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices, NotFoundSpecialistsIcon } from 'src/shared';

const MainLayout = styled.div`
  padding-top: 150px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  @media ${devices.mobileL} {
    padding-top: 0px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.grey};
  max-width: 450px;
  text-align: center;
`;

const NotFoundSpecialistsElement = (): ReactElement => {
  const t = useTranslations('Specialists');

  return (
    <MainLayout>
      <NotFoundSpecialistsIcon width={100} height={100} />
      <Title>{t('not_found')}</Title>
    </MainLayout>
  );
};

export const NotFoundSpecialists = NotFoundSpecialistsElement;
