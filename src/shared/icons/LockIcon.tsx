import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const LockIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 50, height = 50 } = useTheme();
  const { secondary } = useTheme();

  return (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={secondary}
      {...props}
    >
      <path d="M437.333 192h-32v-42.667C405.333 66.99 338.344 0 256 0S106.667 66.99 106.667 149.333V192h-32A10.66 10.66 0 0 0 64 202.667v266.667C64 492.865 83.135 512 106.667 512h298.667C428.865 512 448 492.865 448 469.333V202.667A10.66 10.66 0 0 0 437.333 192zM287.938 414.823a10.67 10.67 0 0 1-10.604 11.844h-42.667a10.67 10.67 0 0 1-10.604-11.844l6.729-60.51c-10.927-7.948-17.458-20.521-17.458-34.313 0-23.531 19.135-42.667 42.667-42.667s42.667 19.135 42.667 42.667c0 13.792-6.531 26.365-17.458 34.313l6.728 60.51zM341.333 192H170.667v-42.667C170.667 102.281 208.948 64 256 64s85.333 38.281 85.333 85.333V192z" />
    </svg>
  );
};