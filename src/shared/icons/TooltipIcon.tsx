import { SVGProps } from 'react';

export const TooltipIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 20, height = 20, ...rest } = props;

  return (
    <svg
      fill="white"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...rest}
    >
      <path
        d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
        fill="white"
      ></path>
    </svg>
  );
};
