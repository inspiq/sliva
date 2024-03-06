import { ReactElement } from 'react';
import Image from 'next/image';

const LogoElement = (): ReactElement => {
  return (
    <Image src="/files/images/logo.png" alt="Logotype" width={80} height={30} />
  );
};

export const Logo = LogoElement;
