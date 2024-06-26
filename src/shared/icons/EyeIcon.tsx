import type { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, color, ...rest } = props;

  const { grey } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill={color ?? grey}
      viewBox="0 0 24 24"
      {...rest}
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path d="M12 9.75A2.247 2.247 0 0 0 9.75 12 2.247 2.247 0 0 0 12 14.25 2.247 2.247 0 0 0 14.25 12 2.247 2.247 0 0 0 12 9.75ZM8.25 12A3.747 3.747 0 0 1 12 8.25 3.747 3.747 0 0 1 15.75 12 3.747 3.747 0 0 1 12 15.75 3.747 3.747 0 0 1 8.25 12Z" />
        <path d="M2.283 9.273C4.693 5.943 8.196 3.97 12 3.97c3.804 0 7.308 1.973 9.718 5.304.561.774.817 1.768.817 2.721 0 .953-.256 1.947-.818 2.722-2.41 3.33-5.913 5.303-9.717 5.303-3.804 0-7.307-1.973-9.718-5.304-.561-.774-.817-1.768-.817-2.721 0-.953.256-1.947.818-2.722ZM12 5.47c-3.256 0-6.332 1.684-8.502 4.683l-.001.001c-.338.466-.532 1.133-.532 1.841s.194 1.375.532 1.84v.002C5.668 16.836 8.745 18.52 12 18.52c3.256 0 6.333-1.684 8.503-4.683v-.001c.338-.466.532-1.133.532-1.841s-.194-1.375-.532-1.84v-.002C18.333 7.154 15.256 5.47 12 5.47Z" />
      </g>
    </svg>
  );
};
