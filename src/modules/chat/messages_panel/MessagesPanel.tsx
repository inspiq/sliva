import { ReactElement, useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';

import { Props } from 'src/modules/chat/Chat';
import { MessageCard } from 'src/modules/chat/messages_panel/MessageCard';
import { db, UserType } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: 80px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.white};
  border-top-right-radius: 10px;
  &::-webkit-scrollbar {
    width: 8px; /* Ширина скролл-бара */
  }

  &::-webkit-scrollbar-track {
    background: #ece9e9; /* Цвет фона трека */
  }

  &::-webkit-scrollbar-thumb {
    background: #fa6104; /* Цвет скролл-бара */
    border-radius: 5px; /* Радиус скролл-бара */
  }
`;

export interface Message {
  chatId: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  userInfo: UserType;
}

const MessagesPanelElement = (
  props: Omit<Props, 'isLoading'>,
): ReactElement => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentAuthUser } = props;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'global_chat'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
      setMessages(messages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  return (
    <MainLayout>
      {messages.map((message) => (
        <MessageCard
          ref={ref}
          message={message}
          isMyMessage={message?.userInfo?.userId === currentAuthUser?.uid}
          key={message.chatId}
        />
      ))}
    </MainLayout>
  );
};

export const MessagesPanel = MessagesPanelElement;
