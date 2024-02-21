import React, { ReactElement } from 'react';
import styled from 'styled-components';

export const RoomCard = styled.div<{ isActiveRoom: boolean }>`
  padding: 12px 10px;
  border-radius: 5px;
  background-color: ${({ theme, isActiveRoom }) =>
    isActiveRoom ? theme.light : 'transparent'};
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w500};
`;

interface Props {
  room: string;
  isActiveRoom: boolean;
  onChangeActiveRoom: (room: string) => void;
}

const ChatRoomCardElement = (props: Props): ReactElement => {
  const { room, isActiveRoom, onChangeActiveRoom } = props;

  return (
    <RoomCard
      onClick={() => onChangeActiveRoom(room)}
      isActiveRoom={isActiveRoom}
    >
      {room}
    </RoomCard>
  );
};

export const ChatRoomCard = ChatRoomCardElement;
