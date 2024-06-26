import type { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const ChatIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, color, ...rest } = props;

  const { black } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      stroke={color ?? black}
      fill={color ?? black}
      strokeWidth={24}
      viewBox="0 0 1024 1024"
      {...rest}
    >
      <path d="M273.536 736H800a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H224a64 64 0 0 0-64 64v570.88L273.536 736zM296 800 147.968 918.4A32 32 0 0 1 96 893.44V256a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v416a128 128 0 0 1-128 128H296z" />
    </svg>
  );
};
