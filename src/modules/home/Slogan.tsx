import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useRouter } from 'src/navigation';
import { devices, UiButton } from 'src/shared';

const MainLayout = styled.div`
  margin-top: 80px;
  margin-bottom: 100px;

  @media ${devices.mobileL} {
    margin-top: 50px;
    margin-bottom: 80px;
  }
`;

const Title = styled.h1`
  font-size: 46px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 64px;

  @media ${devices.mobileL} {
    font-size: 34px;
    line-height: 46px;
  }
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};

  @media ${devices.mobileL} {
    font-size: 16px;
  }
`;

const UiButtonLayout = styled.div`
  margin-top: 25px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  max-width: 450px;

  @media ${devices.mobileL} {
    flex-direction: column;
    max-width: 280px;
  }
`;

const SloganElement = (props: { usersCount: number }): ReactElement => {
  const { usersCount } = props;

  const t = useTranslations('Slogan');
  const router = useRouter();

  return (
    <MainLayout>
      <Title>
        {t('title')} <p>{t('second_title')}</p>
      </Title>
      <SubTitle>{t('subtitle', { usersCount })}</SubTitle>
      <UiButtonLayout>
        <UiButton size="big" onClick={() => router.push('/specialists')}>
          {t('button')}
        </UiButton>
        <UiButton
          size="big"
          onClick={() => router.push('/sign_up')}
          variant="outline"
        >
          {t('button_two')}
        </UiButton>
      </UiButtonLayout>
    </MainLayout>
  );
};

export const Slogan = SloganElement;
