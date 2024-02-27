import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { UiInput } from 'src/shared';

const MainLayout = styled.div`
  width: 100%;
  padding: 20px;
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 0px 0px 10px 10px;
  background-color: ${({ theme }) => theme.white};
`;

interface Props {
  onSendMessage: (text: string) => void;
}

const SendMessagePanelElement = (props: Props): ReactElement => {
  const [value, setValue] = useState('');
  const { onSendMessage } = props;

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value) return;

    if (event.key == 'Enter') {
      onSendMessage(value);
      setValue('');
    }
  };

  return (
    <MainLayout>
      <UiInput
        placeholder="Введите сообщение"
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputSize="medium"
      />
    </MainLayout>
  );
};

export const SendMessagePanel = SendMessagePanelElement;
