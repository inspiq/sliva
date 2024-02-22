import React, { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { Message } from 'src/components/chat/messages_panel/MessagesPanel';
import { useAuthContext } from 'src/context';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
  align-items: flex-end;
  gap: 5px;
`;

const Message = styled.p<{ $isMyMessage: boolean }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, $isMyMessage }) =>
    $isMyMessage ? theme.primary : theme.secondary};
  padding: 10px;
  border-radius: ${({ $isMyMessage }) =>
    $isMyMessage ? '15px 15px 3px 15px' : '15px 15px 15px 3px'};
  max-width: 300px;
  max-height: 300px;
  word-wrap: break-word;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
  cursor: pointer;
  object-fit: cover;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.light};
`;

interface Props {
  message: Message;
  isMyMessage: boolean;
}

const MessageCardElement = (props: Props): ReactElement => {
  const { message, isMyMessage } = props;

  const { currentAuthUser } = useAuthContext();

  return (
    <MainLayout $isMyMessage={isMyMessage}>
      {!isMyMessage && (
        <StyledImage
          src={message.avatarUrl ?? '/files/images/avatar.png'}
          alt="Avatar"
          width={30}
          height={30}
        />
      )}
      <Message $isMyMessage={isMyMessage}>{message.text}</Message>
      {isMyMessage && (
        <StyledImage
          src={
            currentAuthUser?.additionalInfo?.avatarUrl ??
            '/files/images/avatar.png'
          }
          alt="Avatar"
          width={30}
          height={30}
        />
      )}
    </MainLayout>
  );
};

export const MessageCard = MessageCardElement;
