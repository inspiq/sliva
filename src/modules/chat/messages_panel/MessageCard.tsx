import { forwardRef, ReactElement, Ref } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { devices, getInitials, getTime } from 'src/shared';

const MainLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) => ($isMyMessage ? 'end' : 'start')};
  align-items: flex-end;
  gap: 8px;
`;

const MessageText = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};

  @media ${devices.mobileL} {
    font-size: 13px;
  }
`;

const MessageLayout = styled.p<{ $isMyMessage: boolean; $hasImage: boolean }>`
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme, $isMyMessage }) =>
    $isMyMessage ? theme.primary : theme.secondary};
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
      padding-left: 20px;
      padding-bottom:5px;
    }
  `}
`;

const Time = styled.div`
  font-size: 13px;
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const StyledImage = styled(Image)`
  border-radius: 20px;
  cursor: pointer;
  object-fit: cover;
  width: 30px;
  height: 30px;
  background-color: ${({ theme }) => theme.border};
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: ${({ theme }) => theme.w500};
`;

const StyledMessageImg = styled(Image)<{
  $hasText: boolean;
  $first: boolean;
  $last: boolean;
}>`
  border-radius: ${({ $hasText, $first, $last }) =>
    // eslint-disable-next-line no-nested-ternary
    $first && $last
      ? $hasText
        ? '15px 15px 3px 3px'
        : '15px 15px 3px 15px'
      : // eslint-disable-next-line no-nested-ternary
        $first
        ? '15px 15px 3px 3px'
        : // eslint-disable-next-line no-nested-ternary
          !$first && !$last
          ? ''
          : $last && $hasText
            ? ''
            : '3px 3px 3px 15px'};
  height: 200px;
  width: 350px;
  object-fit: none;
`;

interface Props {
  message: Message;
  isMyMessage: boolean;
}

const MessageCardElement = forwardRef(
  (props: Props, ref: Ref<HTMLDivElement>): ReactElement => {
    const { message, isMyMessage } = props;
    const { user, timestamp, text, images_message } = message;

    return (
      <MainLayout $isMyMessage={isMyMessage} ref={ref}>
        {!isMyMessage && (
          <StyledImage
            src={user?.avatarUrl ?? '/files/images/avatar.png'}
            alt="Avatar"
            width={30}
            height={30}
          />
        )}

        <MessageLayout $hasImage={!!images_message} $isMyMessage={isMyMessage}>
          {!images_message && (
            <UserName>
              {getInitials({
                firstName: user?.firstName,
                lastName: user?.lastName,
              })}
            </UserName>
          )}
          {images_message?.map((image, index) => (
            <StyledMessageImg
              $first={index == 0}
              $last={index == images_message.length - 1}
              key={index}
              $hasText={!!text}
              src={image}
              width={350}
              height={200}
              quality={100}
              alt="Image"
            />
          ))}
          {text && <MessageText>{text}</MessageText>}
          <Time>{getTime({ ...timestamp })}</Time>
        </MessageLayout>
        {isMyMessage && (
          <StyledImage
            src={user?.avatarUrl ?? '/files/images/avatar.png'}
            alt="Avatar"
            width={30}
            height={30}
          />
        )}
      </MainLayout>
    );
  },
);

MessageCardElement.displayName = 'MessageCardElement';

export const MessageCard = MessageCardElement;
