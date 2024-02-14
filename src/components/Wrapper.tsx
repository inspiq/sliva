import styled from 'styled-components';

import { devices } from 'src/utils';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 76px);
  padding-top: 70px;
  background-color: ${({ theme }) => theme.white};

  @media ${devices.mobileL} {
    padding-top: 125px;
  }
`;
