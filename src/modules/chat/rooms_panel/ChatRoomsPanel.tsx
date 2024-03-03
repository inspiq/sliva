import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react';
import styled from 'styled-components';

import { ChatRoomCard } from 'src/modules/chat/rooms_panel/ChatRoomCard';

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

  const CHAT_ROOMS = ['Глобальный чат', 'Чат для слесарей'];

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
          key={room}
          room={room}
          onChangeActiveRoom={onChangeActiveRoom}
          isActiveRoom={activeRoom === room}
        />
      ))}
    </MainLayout>
  );
};

export const ChatRoomsPanel = ChatRoomsPanelElement;
