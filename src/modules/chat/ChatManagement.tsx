import { ReactElement, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Props } from 'src/modules/chat/Chat';
import { MessagesPanel } from 'src/modules/chat/messages_panel/MessagesPanel';
import { ChatRoomsPanel } from 'src/modules/chat/rooms_panel/ChatRoomsPanel';
import { SendMessagePanel } from 'src/modules/chat/SendMessagePanel';
import { BlockOverlay, db, devices, Line } from 'src/shared';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  margin: 50px 0;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
    margin: 25px 0 50px 0;
    height: auto;
  }
`;

export const ChatLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  height: 550px;
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
  background-color: ${({ theme }) => theme.white};
  border-top-right-radius: 10px;
`;

export const ChatContentLayout = styled.div`
  position: relative;
  border-left: 1px solid ${({ theme }) => theme.border};

  @media ${devices.mobileL} {
    border-left: none;
  }
`;

const ChatManagementElement = (props: Props): ReactElement => {
  const { currentAuthUser, isLoading } = props;

  const t = useTranslations();
  const [activeRoom, setActiveRoom] = useState(0);

  const onSendMessage = async (text: string) => {
    try {
      const usersCollection = collection(db, 'global_chat');
      const userDocRef = doc(usersCollection);

      await setDoc(userDocRef, {
        chatId: uuidv4(),
        timestamp: new Date(),
        user: currentAuthUser?.additionalInfo,
        text,
      });
    } catch (e) {
      /* empty */
    }
  };

  return (
    <MainLayout>
      <ChatRoomsPanel setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
      <ChatContentLayout>
        <ChatLayout>
          <Header>
            <Title>{t('Chat.chat_rooms.global_chat')}</Title>
            <Line />
          </Header>
          <MessagesPanel currentAuthUser={currentAuthUser} />
          <SendMessagePanel onSendMessage={onSendMessage} />
        </ChatLayout>
        {!currentAuthUser && !isLoading && (
          <BlockOverlay title={t('block.titles.auth_to_access')} />
        )}
      </ChatContentLayout>
    </MainLayout>
  );
};

export const ChatManagement = ChatManagementElement;
