import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled, { useTheme } from 'styled-components';

import { Link } from 'src/navigation';
import { ChatIcon, devices, UiButton } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.light_grey};
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
    margin-bottom: 80px;
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
  const t = useTranslations('ChatBanner');
  const { white } = useTheme();

  return (
    <MainLayout>
      <Title>{t('title')}</Title>
      <Link href={'/chat'}>
        <UiButton
          isStretching={false}
          size="big"
          Icon={<ChatIcon color={white} />}
        >
          {t('button')}
        </UiButton>
      </Link>
    </MainLayout>
  );
};

export const ChatBanner = ChatBannerElement;
