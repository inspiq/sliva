import {
  type Dispatch,
  type ReactElement,
  type SetStateAction,
  useCallback,
} from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Title } from 'src/modules/chat/ChatManagement';
import { ChatRoomCard } from 'src/modules/chat/rooms_panel/ChatRoomCard';
import { getChatRooms, Line } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  activeRoom: number;
  setActiveRoom: Dispatch<SetStateAction<number>>;
}

const ChatRoomsPanelElement = (props: Props): ReactElement => {
  const { setActiveRoom, activeRoom } = props;

  const t = useTranslations('Chat');
  const CHAT_ROOMS = getChatRooms(t);

  const onChangeActiveRoom = useCallback(
    (index: number) => {
      setActiveRoom(index);
    },
    [setActiveRoom],
  );

  return (
    <MainLayout>
      <Title>{t('chat_rooms.title')}</Title>
      <Line />
      {CHAT_ROOMS.map((room, i) => (
        <ChatRoomCard
          key={room.value}
          room={room.label}
          onChangeActiveRoom={onChangeActiveRoom}
          isActiveRoom={activeRoom === i}
          index={i}
        />
      ))}
    </MainLayout>
  );
};

export const ChatRoomsPanel = ChatRoomsPanelElement;
