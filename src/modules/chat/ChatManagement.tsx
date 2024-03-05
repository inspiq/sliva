import { ReactElement, useState } from 'react';
import {
  collection,
  doc,
  FieldValue,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useAuthContext } from 'src/context';
import { MessagesPanel } from 'src/modules/chat/messages_panel/MessagesPanel';
import { ChatRoomsPanel } from 'src/modules/chat/rooms_panel/ChatRoomsPanel';
import { SendMessagePanel } from 'src/modules/chat/SendMessagePanel';
import { BlockOverlay, db, devices, Line, storage, UserType } from 'src/shared';

export const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 50px;
  margin: 50px 0;

  @media ${devices.mobileL} {
    grid-template-columns: 1fr;
    gap: 25px;
    margin: 25px 0 50px 0;
    height: auto;
  }
`;

export const ChatLayout = styled.div`
  border-radius: 10px;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  padding: 25px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  height: 500px;

  @media ${devices.mobileL} {
    padding: 15px;
  }
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
  margin: 20px;

  @media ${devices.mobileL} {
    margin: 15px;
  }
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.white};
  border-radius: 10px 10px 0px 0;
  z-index: 1;
`;

export const ChatContentLayout = styled.div`
  position: relative;
`;

const ChatManagementElement = (): ReactElement => {
  const [activeRoom, setActiveRoom] = useState('Глобальный чат');
  const { currentAuthUser } = useAuthContext();

  const onSendMessage = async (text: string, fileUpload?: File[]) => {
    try {
      const promises = fileUpload?.map(async (file) => {
        const filesFolderRef = ref(storage, `uploads/${file.name}`);
        const { ref: fileRef } = await uploadBytes(filesFolderRef, file);
        const downloadUrl = await getDownloadURL(fileRef);

        return downloadUrl;
      });

      const imageUrls = await Promise.all(promises || []);
      const usersCollection = collection(db, 'global_chat');
      const userDocRef = doc(usersCollection);

      type DocData = {
        chatId: string;
        timestamp: FieldValue;
        text: string;
        user: UserType | null | undefined;
        images_message?: string[];
      };

      const docData: DocData = {
        chatId: uuidv4(),
        timestamp: serverTimestamp(),
        text,
        user: currentAuthUser?.additionalInfo,
      };

      if (imageUrls.length) {
        docData.images_message = imageUrls;
      }
      await setDoc(userDocRef, docData);
    } catch (e) {
      /* empty */
    }
  };

  return (
    <MainLayout>
      <ChatRoomsPanel setActiveRoom={setActiveRoom} activeRoom={activeRoom} />
      <ChatContentLayout>
        <ChatLayout>
          <Header>
            <Title>{activeRoom}</Title>
            <Line />
          </Header>
          <MessagesPanel />
          <SendMessagePanel onSendMessage={onSendMessage} />
        </ChatLayout>
        {!currentAuthUser && (
          <BlockOverlay title="Авторизуйтесь, чтобы открыть доступ к чату" />
        )}
      </ChatContentLayout>
    </MainLayout>
  );
};

export const ChatManagement = ChatManagementElement;
