import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Link } from 'src/navigation';

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
  gap: 10px;

  backdrop-filter: blur(6px);
  background-color: ${({ theme }) => theme.ransparent_white};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
`;

const StyledLink = styled(Link)`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
`;

interface Props {
  title: string;
}

const BlockOverlayElement = (props: Props): ReactElement => {
  const { title } = props;
  const t = useTranslations();

  return (
    <MainLayout>
      <Title>{title}</Title>
      <StyledLink href="/log_in">{t('block_overlay.link')}</StyledLink>
    </MainLayout>
  );
};

export const BlockOverlay = BlockOverlayElement;
