import { FormEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`;

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const UiForm = (props: PropsWithChildren<Props>) => {
  const { children, onSubmit } = props;

  return <Form onSubmit={onSubmit}>{children}</Form>;
};
