import { PropsWithChildren } from 'react';
import { PulseLoader } from 'react-spinners';
import styled, { css, useTheme } from 'styled-components';
import { switchProp } from 'styled-tools';

const StyledButton = styled.button<{
  $variant?: Variant;
  $size?: Size;
  disabled?: boolean;
  $isStretching?: boolean;
}>`
  ${({ theme, disabled }) =>
    disabled
      ? css`
          background-color: ${theme.button.disabled};
          color: ${theme.button.primary.text};
        `
      : switchProp('$variant', {
          ['primary']: css`
            background-color: ${theme.button.primary.bg};
            color: ${theme.button.primary.text};

            &:hover {
              background-color: ${theme.button.primary.hover};
            }
          `,
          ['outline']: css`
            background: ${theme.button.outline.bg};
            color: ${theme.button.outline.text};
            border: 1px solid ${theme.button.outline.border};

            &:hover {
              background-color: ${theme.button.outline.hover};
            }
          `,
        })}
  ${switchProp('$size', {
    ['big']: css`
      height: 50px;
      font-size: 16px;
    `,
    ['medium']: css`
      height: 40px;
      font-size: 15px;
    `,
  })}
  ${({ $isStretching }) =>
    $isStretching &&
    css`
      width: 100%;
    `}
  padding: 0 20px;
  font-weight: ${({ theme }) => theme.w400};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
`;

type Type = 'submit' | 'button';
type Variant = 'primary' | 'outline';
type Size = 'big' | 'medium' | 'small';

interface Props {
  variant?: Variant;
  type?: Type;
  size?: Size;
  isDisabled?: boolean;
  isSubmitting?: boolean;
  isStretching?: boolean;
}

export const UiButton = (props: PropsWithChildren<Props>) => {
  const {
    children,
    variant = 'primary',
    type = 'button',
    size = 'medium',
    isDisabled,
    isSubmitting,
    isStretching = true,
  } = props;

  const { loader } = useTheme();

  return (
    <StyledButton
      type={type}
      disabled={isDisabled}
      $size={size}
      $variant={variant}
      $isStretching={isStretching}
    >
      {isSubmitting ? (
        <PulseLoader size={10} color={loader.secondary} />
      ) : (
        children
      )}
    </StyledButton>
  );
};
