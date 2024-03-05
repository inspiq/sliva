import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useRouter } from 'src/navigation';
import { devices, UiButton } from 'src/shared';

const MainLayout = styled.div`
  margin: 80px 0;

  @media ${devices.mobileL} {
    margin: 40px 0;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  font-weight: 600;
  line-height: 72px;

  @media ${devices.mobileL} {
    font-size: 36px;
    line-height: 48px;
  }
`;

const SubTitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};

  @media ${devices.mobileL} {
    font-size: 15px;
  }
`;

const UiButtonLayout = styled.div`
  margin-top: 25px;
  gap: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

interface Props {
  usersCount: number;
}

const SloganElement = (props: Props): ReactElement => {
  const { usersCount } = props;
  const t = useTranslations('slogan');
  const router = useRouter();

  return (
    <MainLayout>
      <Title>
        {t('title')} <p>{t('second_title')}</p>
      </Title>
      <SubTitle>{t('subtitle', { usersCount })}</SubTitle>
      <UiButtonLayout>
        <UiButton
          size="big"
          isStretching={false}
          onClick={() => router.push('/specialists')}
        >
          {t('button')}
        </UiButton>
        <UiButton
          size="big"
          isStretching={false}
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
