import type { SVGProps } from 'react';

export const RussiaIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width = 18, height = 18, ...rest } = props;

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 -4 28 28"
      {...rest}
    >
      <g clipPath="url(#a)">
        <rect
          width={27.5}
          height={19.5}
          x={0.25}
          y={0.25}
          fill="#fff"
          stroke="#F5F5F5"
          strokeWidth={0.5}
          rx={1.75}
        />
        <mask
          id="b"
          width={28}
          height={20}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'alpha',
          }}
        >
          <rect
            width={27.5}
            height={19.5}
            x={0.25}
            y={0.25}
            fill="#fff"
            stroke="#fff"
            strokeWidth={0.5}
            rx={1.75}
          />
        </mask>
        <g fillRule="evenodd" clipRule="evenodd" mask="url(#b)">
          <path fill="#0C47B7" d="M0 13.333h28V6.667H0v6.666Z" />
          <path fill="#E53B35" d="M0 20h28v-6.667H0V20Z" />
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <rect width={28} height={20} fill="#fff" rx={2} />
        </clipPath>
      </defs>
    </svg>
  );
};
