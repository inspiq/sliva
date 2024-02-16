import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const ChatIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width, height } = props;
  const { secondary } = useTheme();

  return (
    <svg
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={secondary}
      {...props}
    >
      <path d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20z" />
    </svg>
  );
};
