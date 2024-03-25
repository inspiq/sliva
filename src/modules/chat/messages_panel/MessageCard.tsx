import { forwardRef, ReactElement, Ref } from 'react';
import Skeleton from 'react-loading-skeleton';
import Popup from 'reactjs-popup';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useAuthContext } from 'src/context';
import { MessageAdminPanel } from 'src/modules/chat/messages_panel/message_admin_panel/MessageAdminPanel';
import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import {
  Avatar,
  DEFAULT_AVATAR_URL,
  devices,
  getInitials,
  getTime,
} from 'src/shared';
import { MenuIcon } from 'src/shared/icons/MenuIcon';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
  align-items: flex-end;
  gap: 8px;
`;

const MessageLayout = styled.div<{ $isMyMessage: boolean }>`
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

const SkeletonMessage = styled.div`
  margin-bottom: 12px;
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

const SpecialistMark = styled.div`
  position: absolute;
  right: 10px;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.w400};
`;

const AdminMenuLayout = styled.div`
  position: absolute;
  right: 10px;
`;

const PopupMenuLayout = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  padding: 5px;
  border-radius: 10px;
`;

const DeletedOverlay = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: ${({ theme }) => theme.w400};
  font-style: italic;
`;

const IconLayout = styled.div`
  cursor: pointer;
  margin-top: -3px;
  margin-right: 3px;
`;

interface Props {
  message?: Message;
  isMyMessage: boolean;
  isLoading?: boolean;
}

const MessageCardElement = (
  props: Props,
  ref: Ref<HTMLDivElement>,
): ReactElement => {
  const { message, isMyMessage, isLoading } = props;
  const { userInfo, timestamp, text } = message ?? {};

  const { currentAuthUser } = useAuthContext();
  const t = useTranslations();

  const isAdmin = currentAuthUser?.additionalInfo?.type === 'admin';
  const isSpecialistSendMessage = message?.userInfo?.type === 'specialist';

  return (
    <MainLayout $isMyMessage={isMyMessage} ref={ref}>
      {!isMyMessage &&
        (isLoading ? (
          <Skeleton width={30} height={30} circle />
        ) : (
          <Avatar
            width={30}
            height={30}
            avatarUrl={userInfo?.avatarUrl ?? DEFAULT_AVATAR_URL}
          />
        ))}
      {isLoading ? (
        <SkeletonMessage>
          <Skeleton
            count={1}
            width={100}
            height={50}
            borderRadius={
              isMyMessage ? '15px 15px 3px 15px' : '15px 15px 15px 3px'
            }
          />
        </SkeletonMessage>
      ) : (
        <MessageLayout $isMyMessage={isMyMessage}>
          <UserName>
            {isMyMessage
              ? t('Chat.message.you')
              : getInitials({
                  firstName: userInfo?.firstName ?? '',
                  lastName: userInfo?.lastName ?? '',
                })}
          </UserName>
          {isSpecialistSendMessage && !isMyMessage && !isAdmin && (
            <SpecialistMark>{t('Chat.message.specialist_mark')}</SpecialistMark>
          )}
          {isAdmin && !isMyMessage && (
            <AdminMenuLayout>
              <Popup
                trigger={
                  <IconLayout>
                    <MenuIcon />
                  </IconLayout>
                }
                position="top left"
                nested
                on="click"
                mouseLeaveDelay={300}
                mouseEnterDelay={0}
                arrow={false}
                closeOnDocumentClick
              >
                <PopupMenuLayout>
                  <MessageAdminPanel message={message} />
                </PopupMenuLayout>
              </Popup>
            </AdminMenuLayout>
          )}
          {message?.isDeleted ? (
            <DeletedOverlay>{t('Chat.message.delete_message')}</DeletedOverlay>
          ) : (
            <MessageText>{text}</MessageText>
          )}
          <Time>{timestamp && getTime({ ...timestamp })}</Time>
        </MessageLayout>
      )}
      {isMyMessage &&
        (isLoading ? (
          <Skeleton width={30} height={30} circle />
        ) : (
          <Avatar
            width={30}
            height={30}
            avatarUrl={userInfo?.avatarUrl ?? DEFAULT_AVATAR_URL}
          />
        ))}
    </MainLayout>
  );
};

export const MessageCard = forwardRef(MessageCardElement);
