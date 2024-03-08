import { forwardRef, ReactElement, Ref } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { MessageImagesPanel } from 'src/modules/chat/messages_panel/MessageImagesPanel';
import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { Avatar, devices, getInitials, getTime } from 'src/shared';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
  align-items: flex-end;
  gap: 8px;
`;

const MessageLayout = styled.p<{ $isMyMessage: boolean; $hasImage: boolean }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, $isMyMessage }) =>
    $isMyMessage ? theme.primary : theme.light_orange};
  padding: ${({ $hasImage }) => ($hasImage ? '0' : '10px 55px 10px 10px')};
  border-radius: ${({ $isMyMessage }) =>
    $isMyMessage ? '15px 15px 3px 15px' : '15px 15px 15px 3px'};
  max-width: ${({ $hasImage }) => ($hasImage ? '350' : '450')}px;
  max-height: ${({ $hasImage }) => ($hasImage ? '' : '500')}px;
  word-wrap: break-word;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ $hasImage }) => ($hasImage ? '' : '3')}px;

  @media ${devices.mobileL} {
    max-width: 220px;
    max-height: 500px;
  }
  ${({ $hasImage }) =>
    $hasImage &&
    `
    & > ${MessageText} {
      padding-top:5px;
      padding-left: 10px;
      padding-bottom:10px;
      padding-right:10px
    }
  `}
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
  const { userInfo, timestamp, text, images_message } = message;

  const t = useTranslations();

  return (
    <MainLayout $isMyMessage={isMyMessage} ref={ref}>
      {!isMyMessage && (
        <Avatar width={30} height={30} avatarUrl={userInfo?.avatarUrl} />
      )}
      <MessageLayout $hasImage={!!images_message} $isMyMessage={isMyMessage}>
        {!images_message && (
          <UserName>
            {isMyMessage
              ? t('Chat.message.you')
              : getInitials({
                  firstName: userInfo?.firstName,
                  lastName: userInfo?.lastName,
                })}
          </UserName>
        )}
        <MessageImagesPanel
          images_message={images_message}
          text={text}
          hasText={!!text}
        />
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
