import styled from 'styled-components';

const MainLayout = styled.div`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.logo.primary};
  text-transform: uppercase;
`;

export const Logo = () => {
  return <MainLayout>Sliva</MainLayout>;
};
