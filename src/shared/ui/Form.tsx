import { FormHTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  height: 100%;
`;

interface Props extends FormHTMLAttributes<HTMLFormElement> {}

const UiFormElement = (props: PropsWithChildren<Props>): ReactElement => {
  const { children, onSubmit, ...rest } = props;

  return (
    <Form onSubmit={onSubmit} {...rest}>
      {children}
    </Form>
  );
};

export const UiForm = UiFormElement;
