import { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { devices } from 'src/shared';

const StyledImage = styled(Image)`
  @media ${devices.mobileL} {
    width: 70px;
    height: 26px;
  }
`;

const LogoElement = (): ReactElement => {
  return (
    <StyledImage
      src="/files/images/logo.png"
      alt="Logotype"
      width={80}
      height={30}
    />
  );
};

export const Logo = LogoElement;
