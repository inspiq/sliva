import { SVGProps } from 'react';
import { useTheme } from 'styled-components';

export const EditIcon = (props: SVGProps<SVGSVGElement>) => {
  const { width, height } = props;
  const { secondary } = useTheme();

  return (
    <svg
      width={width}
      height={height}
      fill="none"
      stroke={secondary}
      strokeWidth={1.68}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke={secondary}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5H9c-1.886 0-2.828 0-3.414.586C5 6.172 5 7.114 5 9v6c0 1.886 0 2.828.586 3.414C6.172 19 7.114 19 9 19h6c1.886 0 2.828 0 3.414-.586C19 17.828 19 16.886 19 15v-3m-9.681.691 5.93-5.863a1.276 1.276 0 0 1 1.815 1.792l-5.831 6.05L9 15l.319-2.309Z"
      />
    </svg>
  );
};
