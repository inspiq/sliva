import React from 'react';
import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

interface PaperClipIconProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

export const PaperClipIcon: React.FC<PaperClipIconProps> = ({
  width = 20,
  height = 20,
  color,
}) => {
  const theme = useTheme();
  const fillColor = color ?? theme.grey;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={fillColor}
        fillRule="evenodd"
        d="M20 3H18V4H6V3H4C2.895 3 2 3.895 2 5V18C2 19.105 2.895 20 4 20H20C21.105 20 22 19.105 22 18V5C22 3.895 21.105 3 20 3ZM7 5H17V8H7V5ZM18 18H6V9H18V18ZM16 11H8V16H16V11ZM12 13C13.105 13 14 12.105 14 11C14 9.895 13.105 9 12 9C10.895 9 10 9.895 10 11C10 12.105 10.895 13 12 13Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
