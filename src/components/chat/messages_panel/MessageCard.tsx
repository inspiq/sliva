import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Message } from './MessagesPanel';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
`;

const Message = styled.p<{ $isMyMessage: boolean }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px;
  border-radius: ${({ $isMyMessage }) =>
    $isMyMessage ? '15px 15px 3px 15px' : '15px 15px 15px 3px'};
  max-width: 300px;
  max-height: 300px;
  word-wrap: break-word;
`;

interface Props {
  message: Message;
  isMyMessage: boolean;
}

const MessageCardElement = (props: Props): ReactElement => {
  const { message, isMyMessage } = props;

  return (
    <MainLayout $isMyMessage={isMyMessage}>
      <Message $isMyMessage={isMyMessage}>{message.text}</Message>
    </MainLayout>
  );
};

export const MessageCard = MessageCardElement;
