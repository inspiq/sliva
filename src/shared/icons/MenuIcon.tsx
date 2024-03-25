import { SVGProps } from 'react';

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 18, height = 18 } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="white"
    >
      <circle cx="5" cy="10" r="2" fill="white" />
      <circle cx="10" cy="10" r="2" fill="white" />
      <circle cx="15" cy="10" r="2" fill="white" />
    </svg>
  );
};
