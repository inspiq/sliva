import type { SVGProps } from 'react';

export const SpanishIcon = (props: SVGProps<SVGSVGElement>) => {
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
        <rect width={28} height={20} fill="#fff" rx={2} />
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
          <rect width={28} height={20} fill="#fff" rx={2} />
        </mask>
        <g mask="url(#b)">
          <path
            fill="#DD172C"
            fillRule="evenodd"
            d="M0 5.333h28V0H0v5.333ZM0 20h28v-5.333H0V20Z"
            clipRule="evenodd"
          />
          <path
            fill="#FFD133"
            fillRule="evenodd"
            d="M0 14.667h28V5.333H0v9.334Z"
            clipRule="evenodd"
          />
          <path
            fill="#FFEDB1"
            fillRule="evenodd"
            d="M7.333 9.333h1.334V10H7.333v-.667Z"
            clipRule="evenodd"
          />
          <path
            stroke="#A41517"
            strokeWidth={0.667}
            d="M6.391 9h1.884c.195 0 .349.167.333.361l-.172 2.055a1 1 0 0 1-.996.917h-.213a1 1 0 0 1-.997-.917L6.06 9.361A.333.333 0 0 1 6.391 9Z"
          />
          <path
            fill="#A41517"
            fillRule="evenodd"
            d="M6 10h2.667v.667H8L7.333 12l-.666-1.333H6V10Z"
            clipRule="evenodd"
          />
          <rect
            width={1.333}
            height={4.667}
            x={4}
            y={8}
            fill="#A41517"
            rx={0.667}
          />
          <rect
            width={1.333}
            height={4.667}
            x={9.333}
            y={8}
            fill="#A41517"
            rx={0.667}
          />
          <path
            fill="#A41517"
            d="M6 7.733c0-.589.478-1.066 1.067-1.066H7.6c.59 0 1.067.477 1.067 1.066 0 .148-.12.267-.267.267H6.267A.267.267 0 0 1 6 7.733Z"
          />
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
