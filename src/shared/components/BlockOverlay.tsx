import type { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from 'src/navigation';
import { Container, LockIcon } from 'src/shared';

const MainLayout = styled.div<{ $paddingTop: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.ransparent_white};
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  & > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    padding-top: ${({ $paddingTop }) => $paddingTop}px;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  text-align: center;
  margin-top: 5px;
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
  isLinkVisible?: boolean;
  paddingTop?: number;
}

const BlockOverlayElement = (props: Props): ReactElement => {
  const { title, isLinkVisible = true, paddingTop = 230 } = props;
  const t = useTranslations();

  return (
    <MainLayout $paddingTop={paddingTop}>
      <Container>
        <LockIcon />
        <Title>{title}</Title>
        {isLinkVisible && (
          <StyledLink href="/log_in">{t('block.link')}</StyledLink>
        )}
      </Container>
    </MainLayout>
  );
};

export const BlockOverlay = BlockOverlayElement;
