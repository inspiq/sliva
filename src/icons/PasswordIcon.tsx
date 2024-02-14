import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const PasswordIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 18, height = 18 } = props;

  const { grey } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        width={18}
        height={11}
        x={3}
        y={11}
        stroke={grey}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
      />
      <path
        stroke={grey}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 11V7a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v4"
      />
    </svg>
  );
};
