import { ReactElement, useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';

import { Props } from 'src/modules/chat/Chat';
import { MessageCard } from 'src/modules/chat/messages_panel/MessageCard';
import {
  db,
  SKELETON_MESSAGES_COUNT,
  SkeletonPanel,
  type UserType,
  useToggle,
} from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${({ theme }) => theme.white};
  border-top-right-radius: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-track-piece:end {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export interface Message {
  chatId: string;
  isDeleted: boolean;
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
  const { currentAuthUser } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const { visible: isLoading, close } = useToggle(true);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'global_chat'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data() as Message);
      });
      setMessages(messages);
      close();
    });

    return () => {
      unsubscribe();
    };
  }, [close]);

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages, isLoading]);

  return (
    <MainLayout>
      {isLoading ? (
        <SkeletonPanel
          count={SKELETON_MESSAGES_COUNT}
          SkeletonCard={
            <MessageCard isMyMessage={false} ref={ref} isLoading={isLoading} />
          }
        />
      ) : (
        messages.map((message) => (
          <MessageCard
            ref={ref}
            message={message}
            isMyMessage={message?.userInfo?.userId === currentAuthUser?.uid}
            key={message.chatId}
          />
        ))
      )}
    </MainLayout>
  );
};

export const MessagesPanel = MessagesPanelElement;
