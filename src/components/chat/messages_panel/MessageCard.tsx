import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';

import { useAuthContext } from 'src/context';
import { db, Specialist } from 'src/shared';

import { Message } from './MessagesPanel';

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

  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const { currentUser } = useAuthContext();

  const getSpecialist = useCallback(async () => {
    if (!currentUser) return;

    try {
      const docRef = doc(db, 'users', currentUser?.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
      }
    } catch {
      /* empty */
    }
  }, [currentUser]);

  useEffect(() => {
    getSpecialist();
  }, [getSpecialist]);

  return (
    <MainLayout $isMyMessage={isMyMessage}>
      <Message $isMyMessage={isMyMessage}>{message.text}</Message>
      <StyledImage
        src={userMetaData?.avatarUrl ?? '/files/images/avatar.png'}
        alt="Avatar"
        width={30}
        height={30}
      />
    </MainLayout>
  );
};

export const MessageCard = MessageCardElement;
