import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src={'/files/images/logo.png'}
      alt={'Logotype'}
      width={90}
      height={34}
    />
  );
};
