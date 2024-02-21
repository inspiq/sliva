import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices, UiButton } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.light};
  margin-bottom: 100px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  padding: 50px;

  @media ${devices.mobileL} {
    padding: 25px;
    gap: 20px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.text};
  text-align: center;
  max-width: 750px;
  width: 100%;

  @media ${devices.mobileL} {
    font-size: 20px;
  }
`;

const ChatBannerElement = (): ReactElement => {
  const t = useTranslations('chat_banner');

  return (
    <MainLayout>
      <Title>{t('title')}</Title>
      <UiButton isStretching={false} size="big">
        {t('button')}
      </UiButton>
    </MainLayout>
  );
};

export const ChatBanner = ChatBannerElement;
