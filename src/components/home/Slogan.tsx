import { ReactElement, useCallback, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Loader } from 'src/components';
import { useRouter } from 'src/navigation';
import { db, devices, UiButton } from 'src/shared';

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
  display: flex;
`;

const SloganElement = (): ReactElement => {
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const t = useTranslations('slogan');
  const router = useRouter();

  const getUserData = useCallback(async () => {
    try {
      const { size } = await getDocs(collection(db, 'users'));
      setNumberOfUsers(size);
    } catch {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  if (!numberOfUsers) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <Title>
        {t('title')} <p>{t('second_title')}</p>
      </Title>
      <SubTitle>{t('subtitle', { numberOfUsers })}</SubTitle>
      <UiButtonLayout>
        <UiButton
          size="big"
          isStretching={false}
          onClick={() => router.push('/specialists')}
        >
          {t('button')}
        </UiButton>
      </UiButtonLayout>
    </MainLayout>
  );
};

export const Slogan = SloganElement;
