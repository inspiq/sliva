import { memo, ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
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
  room: string;
  isActiveRoom: boolean;
  onChangeActiveRoom: (room: string) => void;
}

const ChatRoomCardElement = (props: Props): ReactElement => {
  const { room, isActiveRoom, onChangeActiveRoom } = props;

  return (
    <RoomCard
      onClick={() => onChangeActiveRoom(room)}
      $isActiveRoom={isActiveRoom}
    >
      {room || <Skeleton />}
    </RoomCard>
  );
};

export const ChatRoomCard = memo(ChatRoomCardElement);
