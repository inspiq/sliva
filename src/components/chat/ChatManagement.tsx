import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Line } from 'src/components';
import { ChatRoomsPanel } from 'src/components/chat/chat_rooms_panel/ChatRoomsPanel';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 50px;
  margin: 50px 0;
  height: calc(100vh - 146px);
`;

export const ChatLayout = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  padding: 25px;
`;

export const Title = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  padding-bottom: 15px;
`;

const ChatManagementElement = (): ReactElement => {
  const [activeRoom, setActiveRoom] = useState('Глобальный чат');

  return (
    <MainLayout>
      <ChatRoomsPanel setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
      <ChatLayout>
        <Title>{activeRoom}</Title>
        <Line />
      </ChatLayout>
    </MainLayout>
  );
};

export const ChatManagement = ChatManagementElement;
