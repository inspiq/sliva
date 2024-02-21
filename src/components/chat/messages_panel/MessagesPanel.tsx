import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import styled from 'styled-components';

import { MessageCard } from 'src/components/chat/messages_panel/MessageCard';
import { useAuthContext } from 'src/context';
import { db } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  padding-bottom: 90px;
  padding-top: 65px;
`;

export interface Message {
  chatId: string;
  userId: string;
  text: string;
}

const MessagesPanelElement = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUser } = useAuthContext();

  const getMessages = useCallback(async () => {
    try {
      const q = query(collection(db, 'global_chat'));

      onSnapshot(q, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data() as Message);
        });
        setMessages(messages);
      });
    } catch (e) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <MainLayout>
      {messages.map((message) => (
        <MessageCard
          message={message}
          isMyMessage={message.userId == currentUser?.uid}
          key={message.chatId}
        />
      ))}
    </MainLayout>
  );
};

export const MessagesPanel = MessagesPanelElement;
