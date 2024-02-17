import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const ExitIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width, height } = props;
  const { secondary } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        stroke={secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.68}
      >
        <path d="M14 7.636V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-3.136M10 12h11m0 0-3-3.5m3 3.5-3 3.5" />
      </g>
    </svg>
  );
};
