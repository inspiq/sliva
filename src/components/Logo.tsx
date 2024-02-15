import styled from 'styled-components';

const MainLayout = styled.div`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.w700};
  color: ${({ theme }) => theme.logo.primary};
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Logo = () => {
  return <MainLayout>Sliva</MainLayout>;
};
