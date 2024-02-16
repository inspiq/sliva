import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src={'/files/images/logo.png'}
      alt={'Logotype'}
      width={85}
      height={32}
    />
  );
};
