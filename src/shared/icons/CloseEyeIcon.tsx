import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const CloseEyeIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, color } = props;

  const { grey } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill={color ?? grey}
      viewBox="0 0 24 24"
      {...props}
    >
      <g fillRule="evenodd" clipRule="evenodd">
        <path d="M2.283 9.273C4.693 5.943 8.196 3.97 12 3.97c1.351 0 2.67.25 3.915.724a.75.75 0 1 1-.533 1.402A9.482 9.482 0 0 0 12 5.47c-3.256 0-6.333 1.684-8.502 4.683l-.001.001c-.338.466-.532 1.133-.532 1.841s.194 1.375.532 1.84v.002c.432.595.899 1.14 1.396 1.628a.75.75 0 0 1-1.052 1.07 14.346 14.346 0 0 1-1.559-1.819c-.561-.774-.817-1.768-.817-2.721 0-.953.256-1.947.818-2.722Zm16.49-2.085a.75.75 0 0 1 1.06-.044c.682.629 1.314 1.341 1.885 2.13.561.774.817 1.768.817 2.721 0 .953-.256 1.947-.818 2.722-2.41 3.33-5.913 5.303-9.717 5.303a11.01 11.01 0 0 1-4.292-.875.75.75 0 1 1 .583-1.382A9.509 9.509 0 0 0 12 18.52c3.256 0 6.332-1.684 8.502-4.683l.001-.001c.338-.466.532-1.133.532-1.841s-.194-1.375-.532-1.84v-.002a12.71 12.71 0 0 0-1.686-1.905.75.75 0 0 1-.044-1.06Z" />
        <path d="M12 9.75A2.247 2.247 0 0 0 9.75 12c0 .548.194 1.048.517 1.438a.75.75 0 0 1-1.154.958A3.74 3.74 0 0 1 8.25 12 3.747 3.747 0 0 1 12 8.25a3.74 3.74 0 0 1 2.624 1.07.75.75 0 1 1-1.05 1.071A2.24 2.24 0 0 0 12 9.75Zm3 1.5a.75.75 0 0 1 .75.75A3.747 3.747 0 0 1 12 15.75a.75.75 0 0 1 0-1.5A2.247 2.247 0 0 0 14.25 12a.75.75 0 0 1 .75-.75Z" />
        <path d="M22.553 2.194a.75.75 0 0 1-.047 1.06l-20 18.3a.75.75 0 0 1-1.012-1.107l20-18.3a.75.75 0 0 1 1.06.047Z" />
      </g>
    </svg>
  );
};
