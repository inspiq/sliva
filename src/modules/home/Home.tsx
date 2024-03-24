import { ReactElement, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Popup from 'reactjs-popup';
import { collection, onSnapshot } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useAuthContext } from 'src/context';
import { Header } from 'src/modules';
import { Categories } from 'src/modules/home/categories/CategoriesPanel';
import { ChatBanner } from 'src/modules/home/ChatBanner';
import { Slogan } from 'src/modules/home/Slogan';
import {
  Container,
  db,
  Footer,
  Loader,
  MODAL_COOKIE_EXPIRATION_DURATION,
  UiButton,
  Wrapper,
} from 'src/shared';

const StyledPopup = styled(Popup)`
  &-overlay {
    background-color: ${({ theme }) => theme.overlay};
    padding: 0 15px;
  }

  &-content {
    background-color: ${({ theme }) => theme.white};
    padding: 25px;
    border-radius: 25px;
    max-width: 425px;
    box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  }
`;

const Tip = styled.p`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
  margin-bottom: 20px;

  & > p {
    margin-top: 10px;
  }
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w700};
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const HomeElement = (): ReactElement => {
  const [usersCount, setUsersCount] = useState(0);
  const { currentAuthUser } = useAuthContext();
  const [cookies, setCookie] = useCookies();
  const t = useTranslations('modal_test');

  useEffect(() => {
    const q = collection(db, 'users');
    const unsubscribe = onSnapshot(q, ({ size }) => {
      setUsersCount(size);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onClickAgreeInformation = () => {
    setCookie('modal_test', true, {
      maxAge: MODAL_COOKIE_EXPIRATION_DURATION,
    });
  };

  if (!usersCount) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Slogan usersCount={usersCount} />
          <Categories />
          <ChatBanner />
        </Container>
      </Wrapper>
      <Footer />
      <StyledPopup
        open={!currentAuthUser && !cookies.modal_test}
        modal
        lockScroll
      >
        <Title>{t('title')}</Title>
        <Tip>
          {t('tips.one')}
          <p>{t('tips.two')}</p>
          <p>{t('tips.three')}</p>
        </Tip>
        <UiButton onClick={onClickAgreeInformation}>{t('button')}</UiButton>
      </StyledPopup>
    </>
  );
};

export const Home = HomeElement;
