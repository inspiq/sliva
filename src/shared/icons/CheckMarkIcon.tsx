import * as React from 'react';
import { SVGProps } from 'react';
import styled, { useTheme } from 'styled-components';

interface Props extends SVGProps<SVGSVGElement> {
  visible: boolean;
}

export const CheckMarkIcon = (props: Props) => {
  const { width = 18, height = 18, visible, ...rest } = props;

  const { secondary } = useTheme();

  const StyledLayout = styled.svg<{ $visible: boolean }>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 70%;
    display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  `;

  return (
    <StyledLayout
      $visible={visible}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...rest}
    >
      <path
        fill={secondary}
        d="M9 16.17l-3.5-3.5a1.5 1.5 0 012.12-2.12l2.38 2.38 6.38-6.37a1.5 1.5 0 012.12 2.12l-8.5 8.5a1.5 1.5 0 01-2.12 0z"
      />
    </StyledLayout>
  );
};
