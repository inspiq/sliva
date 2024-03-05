import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { ChatRoomCard } from 'src/modules/chat/rooms_panel/ChatRoomCard';
import { getChatRooms } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  activeRoom: string;
  setActiveRoom: Dispatch<SetStateAction<string>>;
}

const ChatRoomsPanelElement = (props: Props): ReactElement => {
  const { setActiveRoom, activeRoom } = props;
  const t = useTranslations('Chat');
  const CHAT_ROOMS = getChatRooms(t);

  const onChangeActiveRoom = useCallback(
    (room: string) => {
      setActiveRoom(room);
    },
    [setActiveRoom],
  );

  return (
    <MainLayout>
      {CHAT_ROOMS.map((room) => (
        <ChatRoomCard
          key={room.value}
          room={room.label}
          onChangeActiveRoom={onChangeActiveRoom}
          isActiveRoom={activeRoom === room.label}
        />
      ))}
    </MainLayout>
  );
};

export const ChatRoomsPanel = ChatRoomsPanelElement;
