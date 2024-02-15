import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 18, height = 18 } = props;

  const { black } = useTheme();

  return (
    <svg width={width} height={height} viewBox="-4.5 0 20 20" {...props}>
      <path
        fill={black}
        fillRule="evenodd"
        d="M.366 19.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827L1.768.292A1.063 1.063 0 0 0 .314.282a.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414L.366 18.295a.974.974 0 0 0 0 1.413"
      />
    </svg>
  );
};
