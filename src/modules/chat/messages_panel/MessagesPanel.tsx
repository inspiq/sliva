import { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';

import { useAuthContext } from 'src/context';
import { MessageCard } from 'src/modules/chat/messages_panel/MessageCard';
import { db, UserType } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: scroll;
  padding-bottom: 70px;
  padding-top: 65px;
`;

export interface Message {
  chatId: string;
  text: string;
  image_message?: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  user: UserType;
}

const MessagesPanelElement = (): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentAuthUser } = useAuthContext();

  const ref = useRef<HTMLDivElement | null>(null);

  const getMessages = useCallback(async () => {
    try {
      const q = query(collection(db, 'global_chat'), orderBy('timestamp'));

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

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <MainLayout>
      {messages.map((message) => (
        <MessageCard
          ref={ref}
          message={message}
          isMyMessage={message?.user?.userId == currentAuthUser?.uid}
          key={message.chatId}
        />
      ))}
    </MainLayout>
  );
};

export const MessagesPanel = MessagesPanelElement;
