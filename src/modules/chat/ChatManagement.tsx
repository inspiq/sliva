import { ReactElement, useState } from 'react';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useAuthContext } from 'src/context';
import { MessagesPanel } from 'src/modules/chat/messages_panel/MessagesPanel';
import { ChatRoomsPanel } from 'src/modules/chat/rooms_panel/ChatRoomsPanel';
import { SendMessagePanel } from 'src/modules/chat/SendMessagePanel';
import { db, devices, Line } from 'src/shared';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 50px;
  margin: 50px 0;
  height: calc(100vh - 146px);

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
    gap: 25px;
    margin: 25px 0 50px 0;
    height: auto;
  }
`;

export const ChatLayout = styled.div`
  height: calc(100vh - 146px);
  border-radius: 10px;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  padding: 25px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;

  @media ${devices.mobileL} {
    padding: 15px;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  margin: 20px;

  @media ${devices.mobileL} {
    margin: 15px;
  }
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px 10px 0px 0;
  z-index: 1;
`;

const ChatManagementElement = (): ReactElement => {
  const [activeRoom, setActiveRoom] = useState('Глобальный чат');
  const { currentAuthUser } = useAuthContext();

  const onSendMessage = async (text: string) => {
    try {
      const usersCollection = collection(db, 'global_chat');
      const userDocRef = doc(usersCollection);

      await setDoc(userDocRef, {
        chatId: uuidv4(),
        timestamp: serverTimestamp(),
        text,
        user: currentAuthUser?.additionalInfo,
      });
    } catch (e) {
      /* empty */
    }
  };

  return (
    <MainLayout>
      <ChatRoomsPanel setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
      <ChatLayout>
        <Header>
          <Title>{activeRoom}</Title>
          <Line />
        </Header>
        <MessagesPanel />
        <SendMessagePanel onSendMessage={onSendMessage} />
      </ChatLayout>
    </MainLayout>
  );
};

export const ChatManagement = ChatManagementElement;
