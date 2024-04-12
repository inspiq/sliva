import type { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const NotFoundSpecialistsIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 24, height = 24, ...rest } = props;

  const { grey } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        stroke={grey}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
        d="m15 16 5 5m0-5-5 5m-4-7a7 7 0 0 0-7 7h7m4-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
      />
    </svg>
  );
};
