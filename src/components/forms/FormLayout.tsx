import { FormEventHandler, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { UiForm } from 'src/shared';

const MainLayout = styled.div`
  max-width: 480px;
  width: 100%;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  margin: 50px auto;
`;

const FormHeader = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.primary};
`;

const UiFormLayout = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
`;

interface Props {
  title: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export const FormLayout = (props: PropsWithChildren<Props>) => {
  const { title, children, onSubmit } = props;

  return (
    <MainLayout>
      <FormHeader>{title}</FormHeader>
      <UiFormLayout>
        <UiForm onSubmit={onSubmit}>{children}</UiForm>
      </UiFormLayout>
    </MainLayout>
  );
};
