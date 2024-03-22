import * as React from 'react';
import { SVGProps } from 'react';

export const AdminMenuIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 18, height = 18, ...rest } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="white"
      {...rest}
    >
      <circle cx="5" cy="5" r="2" fill="white" />
      <circle cx="5" cy="10" r="2" fill="white" />
      <circle cx="5" cy="15" r="2" fill="white" />
    </svg>
  );
};
