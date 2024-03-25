import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 28, height = 28, ...rest } = props;
  const { white } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      color={white}
      fill="none"
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        stroke={white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 12h16m-8-8v16"
      />
    </svg>
  );
};
