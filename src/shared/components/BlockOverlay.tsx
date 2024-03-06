import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from 'src/navigation';
import { Container } from 'src/shared';

const MainLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.ransparent_white};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

interface Props {
  title: string;
}

const BlockOverlayElement = (props: Props): ReactElement => {
  const { title } = props;
  const t = useTranslations();

  return (
    <MainLayout>
      <Container>
        <Title>{title}</Title>
        <StyledLink href="/log_in">{t('block_overlay.link')}</StyledLink>
      </Container>
    </MainLayout>
  );
};

export const BlockOverlay = BlockOverlayElement;
