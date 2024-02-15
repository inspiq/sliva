import Popup from 'reactjs-popup';
import { signOut } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Container, Logo } from 'src/components';
import { useAuthContext } from 'src/context';
import { Link, locales, usePathname } from 'src/navigation';
import { UiButton } from 'src/shared';
import { auth, devices } from 'src/shared';
import { ArrowIcon } from 'src/shared/icons';

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
    padding: 20px 0;
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
    align-items: flex-start;
    gap: 15px;
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

const MenuItemLayout = styled.div`
  transition: background-color 0.3s;
  padding: 0 20px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.light};
  }

  &:focus {
    border-width: 0 !important;
    border: none;
  }

  @media ${devices.mobileL} {
    padding: 0;
    height: auto;
    justify-content: flex-end;

    &:hover {
      background-color: transparent;
    }
  }
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
  color: ${({ theme }) => theme.black};
  transition: background-color 0.3s;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.light};
  }
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  display: flex;
  white-space: nowrap;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  transform: rotate(90deg);
`;

const LanguageSwitcher = () => {
  const t = useTranslations('Header');

  return (
    <MenuItemLayout>
      <Text>{t('language_switcher.title')}</Text>
      <StyledArrowIcon width="10" height="10" />
    </MenuItemLayout>
  );
};

const Profile = () => {
  const t = useTranslations('Header');

  return (
    <MenuItemLayout>
      <Text>{t('buttons.account_management')}</Text>
      <StyledArrowIcon width="10" height="10" />
    </MenuItemLayout>
  );
};

export const Header = () => {
  const { currentUser } = useAuthContext();
  const t = useTranslations('Header');
  const currentPath = usePathname();

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
            trigger={LanguageSwitcher}
            position="bottom right"
            on="hover"
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
          >
            <PopupMenuLayout>
              {locales.map((locale) => (
                <StyledLink href={currentPath} locale={locale} key={locale}>
                  {t(`language_switcher.languages.${locale}`)}
                </StyledLink>
              ))}
            </PopupMenuLayout>
          </Popup>
        </MenuLayout>
        {currentUser ? (
          <Popup
            trigger={Profile}
            position="bottom right"
            on="hover"
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
          >
            <PopupMenuLayout>
              <StyledLink href="/profile">
                {t('account_management_menu.profile')}
              </StyledLink>
              <StyledLink href="/" onClick={onLogout}>
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
