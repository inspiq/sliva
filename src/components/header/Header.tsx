import { ReactElement } from 'react';
import Popup from 'reactjs-popup';
import { signOut } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Container, Logo } from 'src/components';
import { UserActions } from 'src/components/header/AccountManagement';
import { LanguageManagement } from 'src/components/header/LanguageManagement';
import { LocalesPanel } from 'src/components/header/locales/LocalesPanel';
import { useAuthContext } from 'src/context';
import { Link } from 'src/navigation';
import { auth, devices, EditIcon, ExitIcon, UiButton } from 'src/shared';

const MainLayout = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.light};
  background-color: ${({ theme }) => theme.white};
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;

  @media ${devices.mobileL} {
    height: auto;
    padding: 15px 0;
  }
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  gap: 15px;

  @media ${devices.mobileL} {
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }
`;

const ButtonsLayout = styled.div`
  display: flex;
  gap: 10px;
`;

const MenuLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const PopupMenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  padding: 5px;
  border-radius: 10px;
`;

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
    background-color: ${({ theme }) => theme.light};
  }
`;

const HeaderElement = (): ReactElement => {
  const { currentUser } = useAuthContext();
  const t = useTranslations('Header');

  const onLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      /* empty */
    }
  };

  return (
    <MainLayout>
      <StyledContainer>
        <MenuLayout>
          <Link href="/">
            <Logo />
          </Link>
          <Popup
            trigger={LanguageManagement}
            position="bottom right"
            on="hover"
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
          >
            <PopupMenuLayout>
              <LocalesPanel />
            </PopupMenuLayout>
          </Popup>
        </MenuLayout>
        {currentUser ? (
          <Popup
            trigger={UserActions}
            position="bottom right"
            on="hover"
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
          >
            <PopupMenuLayout>
              <StyledLink href="/profile">
                <EditIcon width={18} />
                {t('account_management_menu.profile')}
              </StyledLink>
              <StyledLink href="/" onClick={onLogout}>
                <ExitIcon width={18} />
                {t('account_management_menu.logout')}
              </StyledLink>
            </PopupMenuLayout>
          </Popup>
        ) : (
          <ButtonsLayout>
            <Link href="/log_in">
              <UiButton variant="outline">{t('buttons.log_in')}</UiButton>
            </Link>
            <Link href="/sign_up">
              <UiButton>{t('buttons.sign_up')}</UiButton>
            </Link>
          </ButtonsLayout>
        )}
      </StyledContainer>
    </MainLayout>
  );
};

export const Header = HeaderElement;