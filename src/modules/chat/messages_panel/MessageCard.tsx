import { forwardRef, ReactElement, Ref } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { Avatar, devices, getInitials, getTime } from 'src/shared';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
  align-items: flex-end;
  gap: 8px;
`;

const MessageLayout = styled.p<{ $isMyMessage: boolean }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, $isMyMessage }) =>
    $isMyMessage ? theme.primary : theme.light_orange};
  padding: 10px 55px 10px 10px;
  border-radius: ${({ $isMyMessage }) =>
    $isMyMessage ? '15px 15px 3px 15px' : '15px 15px 15px 3px'};
  max-width: 400px;
  max-height: 500px;
  word-wrap: break-word;
  margin-bottom: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;

  @media ${devices.mobileL} {
    max-width: 220px;
    max-height: 500px;
  }
`;

const Time = styled.div`
  font-size: 13px;
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.w500};
`;

const MessageText = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};

  @media ${devices.mobileL} {
    font-size: 13px;
  }
`;

interface Props {
  message: Message;
  isMyMessage: boolean;
}

const MessageCardElement = (
  props: Props,
  ref: Ref<HTMLDivElement>,
): ReactElement => {
  const { message, isMyMessage } = props;
  const { userInfo, timestamp, text } = message;

  const t = useTranslations();

  return (
    <MainLayout $isMyMessage={isMyMessage} ref={ref}>
      {!isMyMessage && (
        <Avatar width={30} height={30} avatarUrl={userInfo?.avatarUrl} />
      )}
      <MessageLayout $isMyMessage={isMyMessage}>
        <UserName>
          {isMyMessage
            ? t('Chat.message.you')
            : getInitials({
                firstName: userInfo?.firstName,
                lastName: userInfo?.lastName,
              })}
        </UserName>
        <MessageText>{text}</MessageText>
        <Time>{getTime({ ...timestamp })}</Time>
      </MessageLayout>
      {isMyMessage && (
        <Avatar width={30} height={30} avatarUrl={userInfo?.avatarUrl} />
      )}
    </MainLayout>
  );
};

export const MessageCard = forwardRef(MessageCardElement);
