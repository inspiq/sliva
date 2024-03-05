import styled from 'styled-components';

import { devices } from 'src/shared';

export const Wrapper = styled.div<{ $position?: 'center' | 'flex-start' }>`
  display: flex;
  justify-content: ${({ $position = 'center' }) => $position};
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 76px);
  padding-top: 70px;
  background-color: ${({ theme }) => theme.white};

  @media ${devices.mobileL} {
    padding-top: 110px;
  }
`;
