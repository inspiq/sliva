import { SVGProps } from 'react';

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 25, height = 25, ...rest } = props;

  return (
    <svg width={width} height={height} fill="white" {...rest}>
      <circle cx="5" cy="10" r="3" fill="white" />
      <circle cx="13" cy="10" r="3" fill="white" />
      <circle cx="21" cy="10" r="3" fill="white" />
    </svg>
  );
};
