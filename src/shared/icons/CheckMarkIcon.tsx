import type { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 10, height = 10, ...rest } = props;

  const { white } = useTheme();

  return (
    <svg
      viewBox="0 0 512 512"
      width={width}
      height={height}
      fill={white}
      {...rest}
    >
      <path d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z" />
    </svg>
  );
};
