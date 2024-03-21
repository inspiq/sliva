import { memo, ReactElement } from 'react';
import styled from 'styled-components';

export const RoomCard = styled.div<{ $isActiveRoom: boolean }>`
  padding: 15px 20px;
  background-color: ${({ theme, $isActiveRoom }) =>
    $isActiveRoom ? theme.primary : 'transparent'};
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme, $isActiveRoom }) =>
    $isActiveRoom ? theme.white : theme.text};
`;

interface Props {
  index: number;
  room: string;
  isActiveRoom: boolean;
  onChangeActiveRoom: (roomIdx: number) => void;
}

const ChatRoomCardElement = (props: Props): ReactElement => {
  const { index, room, isActiveRoom, onChangeActiveRoom } = props;

  return (
    <RoomCard
      onClick={() => onChangeActiveRoom(index)}
      $isActiveRoom={isActiveRoom}
    >
      {room}
    </RoomCard>
  );
};

export const ChatRoomCard = memo(ChatRoomCardElement);
