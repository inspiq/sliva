import { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

import { Error } from 'src/modules/auth/Error';
import { CloseEyeIcon, EyeIcon, PlusIcon, useToggle } from 'src/shared';

const Input = styled.input<{
  $hasError?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.input.error : theme.input.border};
  padding-left: 12px;
  padding-right: 5px;
  border-radius: 10px;
  font-size: 15px;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.input.error : theme.input.value};
  font-weight: ${({ theme }) => theme.w400};
  height: 50px;
  background-color: ${({ theme }) => theme.white};

  &:focus {
    border: 2px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.input.error : theme.input.border};
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

const Label = styled.label<{ $hasContent: boolean; $hasError?: boolean }>`
  position: absolute;
  font-size: ${({ $hasContent }) => ($hasContent ? '13px' : '15px')};
  top: ${({ $hasContent }) => ($hasContent ? '0px' : '50%')};
  transform: translateY(-50%);
  left: 7px;
  transition:
    top 0.2s,
    left 0.2s,
    font-size 0.2s;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.input.error : theme.input.placeholder};
  font-weight: ${({ theme }) => theme.w400};
  background-color: ${({ theme }) => theme.white};
  padding-left: 5px;
  padding-right: 5px;
  cursor: text;
`;

const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;

  &:focus-within > label {
    top: 0px;
    left: 7px;
    font-size: 13px;
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  position: absolute;
  appearance: none;
  align-self: start;
  background-color: ${({ checked, theme }) =>
    checked ? theme.primary : 'transparent'};

  &:checked + div {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const CheckboxLayout = styled.label`
  display: flex;
  gap: 3px;
`;

const CheckBoxLayout = styled.div`
  align-self: start;
  position: relative;
  height: 15px;
  width: 15px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 4px;
`;

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  hasError?: boolean;
  textError?: string;
  label?: string;
  Icon?: ReactElement;
}

const UiInputElement = (props: Props): ReactElement => {
  const { hasError, textError, type, Icon, label, onChange, ...rest } = props;

  const { visible: passVisible, toggle } = useToggle();
  const { visible: isChecked, toggle: toggleChecked } = useToggle();
  const currentTypePasswordField = passVisible ? 'text' : 'password';
  const hasTypePassword = type === 'password';
  const hasContent = !!rest.value;

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    toggleChecked();
  };

  return (
    <MainLayout>
      {type === 'file' && (
        <StyledLabel htmlFor="file">
          <PlusIconLayout>
            <PlusIcon />
          </PlusIconLayout>
          <Input
            $hasError={hasError}
            type={hasTypePassword ? currentTypePasswordField : type}
            id="file"
            {...rest}
          />
        </StyledLabel>
      )}
      {type !== 'file' && type !== 'checkbox' && (
        <InputLayout>
          <Label
            htmlFor={rest.id}
            $hasContent={hasContent}
            $hasError={hasError}
          >
            {label}
          </Label>
          <Input
            $hasError={hasError}
            type={hasTypePassword ? currentTypePasswordField : type}
            {...rest}
          />
        </InputLayout>
      )}
      {type == 'checkbox' && (
        <CheckboxLayout htmlFor={rest.id}>
          <Checkbox
            type={type}
            checked={isChecked}
            onChange={(e) => onChangeCheckbox(e)}
            id={label}
            {...rest}
          />
          <CheckBoxLayout>{Icon}</CheckBoxLayout>
        </CheckboxLayout>
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
