import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled, { css, useTheme } from 'styled-components';

import { Link } from 'src/navigation';
import {
  Container,
  devices,
  Logo,
  TelegramIcon,
  UiButton,
  ViberIcon,
  WhatsAppIcon,
} from 'src/shared';

const textStylesPrimary = css`
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.grey};
  font-size: 14px;
`;

const textStylesSecondary = css`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
`;

const MainLayout = styled.div`
  width: 100%;
  padding: 50px 0;
  background-color: ${({ theme }) => theme.footer};
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const ItemLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonsLayout = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Copyright = styled.div`
  ${textStylesPrimary}
`;

const ZeroPlusInfo = styled.div`
  ${textStylesPrimary}
  max-width: 450px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SupportServiceTitle = styled.div`
  ${textStylesSecondary}
  font-weight: ${({ theme }) => theme.w600};
`;

const SupportServiceEmail = styled(Link)`
  ${textStylesSecondary}
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const SupportServiceTime = styled.div`
  ${textStylesSecondary}
  font-weight: ${({ theme }) => theme.w400};
`;

const SupportServiceSocialNetworks = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const PrivacyPolicy = styled.a`
  ${textStylesSecondary}
  font-weight: ${({ theme }) => theme.w400};
  text-decoration: underline;
  margin-top: 5px;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const StyledLink = styled(Link)`
  margin-top: 3px;
  padding: 6px;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const FooterElement = (): ReactElement => {
  const t = useTranslations('Footer');
  const { light_grey } = useTheme();

  return (
    <MainLayout>
      <Container>
        <ContentLayout>
          <ItemLayout>
            <Logo />
            <ZeroPlusInfo>{t('info')}</ZeroPlusInfo>
            <Copyright>{t('text')}</Copyright>
          </ItemLayout>
          <ItemLayout>
            <SupportServiceTitle>
              {t('support_service.title')}
            </SupportServiceTitle>
            <SupportServiceEmail href="mailto:email@gmail.com">
              email@gmail.com
            </SupportServiceEmail>
            <SupportServiceTime>
              {t('support_service.time')}
              <p>{t('support_service.second_time')}</p>
            </SupportServiceTime>
            <SupportServiceSocialNetworks>
              <StyledLink href={'/'}>
                <WhatsAppIcon color={light_grey} width={22} height={22} />
              </StyledLink>
              <StyledLink href={'/'}>
                <TelegramIcon color={light_grey} width={22} height={22} />
              </StyledLink>
              <StyledLink href={'/'}>
                <ViberIcon color={light_grey} width={22} height={22} />
              </StyledLink>
            </SupportServiceSocialNetworks>
            <PrivacyPolicy href="/files/politika.docx" download>
              {t('privacy_policy')}
            </PrivacyPolicy>
          </ItemLayout>
          <ItemLayout>
            <ButtonsLayout>
              <Link href="/support">
                <UiButton>{t('buttons.title')}</UiButton>
              </Link>
              <Link href="/chat">
                <UiButton>{t('buttons.second_title')}</UiButton>
              </Link>
            </ButtonsLayout>
          </ItemLayout>
        </ContentLayout>
      </Container>
    </MainLayout>
  );
};

export const Footer = FooterElement;
