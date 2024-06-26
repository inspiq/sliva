import { type ReactElement, useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import styled from 'styled-components';

import type { UserType } from 'src/store/SessionStore';
import type { Props } from 'src/modules/chat/Chat';
import { MessageCard } from 'src/modules/chat/messages_panel/MessageCard';
import {
  db,
  SKELETON_MESSAGES_COUNT,
  SkeletonPanel,
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
    background-color: ${({ theme }) => theme.light_grey};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
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
  user: UserType;
}

const MessagesPanelElement = (
  props: Omit<Props, 'isLoading'>,
): ReactElement => {
  const { authUser } = props;

  const [messages, setMessages] = useState<Message[]>([]);
  const { visible: isLoading, close } = useToggle(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const q = query(collection(db, 'global_chat'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFromDb = querySnapshot.docs.map(
        (doc) => doc.data() as Message,
      );
      setMessages(messagesFromDb);
      close();
    });

    return () => {
      unsubscribe();
    };
  }, [close]);

  useEffect(() => {
    if (messages.length) {
      const isYourLastMessage =
        messages[messages.length - 1]?.user.id === authUser?.uid;

      if (isInitialRender.current || isYourLastMessage) {
        ref.current?.scrollIntoView({
          block: 'end',
        });
        isInitialRender.current = false;
      }
    }
  }, [messages, isLoading, authUser?.uid]);

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
            isMyMessage={message?.user?.id === authUser?.uid}
            key={message.chatId}
          />
        ))
      )}
    </MainLayout>
  );
};

export const MessagesPanel = MessagesPanelElement;
