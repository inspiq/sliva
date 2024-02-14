import styled from 'styled-components';

import { devices } from 'src/utils';

const MainLayout = styled.div`
  font-size: 22px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.logo.secondary};

  & > span {
    color: ${({ theme }) => theme.logo.primary};
  }

  @media ${devices.mobileL} {
    font-size: 20px;
  }
`;

export const Logo = () => {
  return (
    <MainLayout>
      Home
      <span>Service</span>
    </MainLayout>
  );
};
