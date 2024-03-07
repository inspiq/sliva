import { InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

import { Error } from 'src/modules/auth/Error';
import {
  CloseEyeIcon,
  EyeIcon,
  PaperClipIcon,
  PlusIcon,
  useToggle,
} from 'src/shared';

const Input = styled.input<{
  $hasError?: boolean;
  $hasIcon: boolean;
}>`
  width: 100%;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.input.error : theme.input.border};
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '38px' : '12px')};
  padding-right: 5px;
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme }) => theme.input.value};
  font-weight: ${({ theme }) => theme.w400};
  transition: border 0.3s;
  height: 50px;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
    font-weight: ${({ theme }) => theme.w400};
  }

  &:hover {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.input.error : theme.input.active};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.input.error : theme.input.active};
  }
`;

const MainLayout = styled.div`
  position: relative;
  width: 100%;
`;

const EyeIconLayout = styled.div`
  position: absolute;
  top: 27px;
  right: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const ErrorLayout = styled.div`
  padding-top: 5px;
`;

const IconLayout = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 26px;
  left: 22px;
`;

const StyledLabel = styled.label`
  & > input {
    display: none;
  }
`;

const PlusIconLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.hover_button_primary};
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
  hasError?: boolean;
  textError?: string;
  hasInChat?: boolean;
}

const UiInputElement = (props: Props): ReactElement => {
  const { Icon, hasError, textError, hasInChat, type, ...rest } = props;

  const { visible: passVisible, toggle } = useToggle();

  const currentTypePasswordField = passVisible ? 'text' : 'password';
  const hasTypePassword = type === 'password';
  const hasIcon = !!Icon;

  return (
    <MainLayout>
      <IconLayout>{Icon}</IconLayout>
      {type === 'file' && (
        <StyledLabel htmlFor="file">
          {hasInChat ? (
            <PaperClipIcon />
          ) : (
            <PlusIconLayout>
              <PlusIcon />
            </PlusIconLayout>
          )}
          <Input
            $hasError={hasError}
            $hasIcon={hasIcon}
            type={hasTypePassword ? currentTypePasswordField : type}
            id="file"
            {...rest}
          />
        </StyledLabel>
      )}
      {type !== 'file' && (
        <Input
          $hasError={hasError}
          $hasIcon={hasIcon}
          type={hasTypePassword ? currentTypePasswordField : type}
          {...rest}
        />
      )}
      {hasTypePassword && (
        <EyeIconLayout onClick={toggle}>
          {passVisible ? <CloseEyeIcon /> : <EyeIcon />}
        </EyeIconLayout>
      )}
      {hasError && (
        <ErrorLayout>
          <Error>{textError}</Error>
        </ErrorLayout>
      )}
    </MainLayout>
  );
};

export const UiInput = UiInputElement;
