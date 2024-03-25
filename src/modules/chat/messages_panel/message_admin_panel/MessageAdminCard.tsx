import { memo, ReactElement } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import styled from 'styled-components';

import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { AdminMenuValues } from 'src/shared';
import { db, type Option } from 'src/shared';

const MainLayout = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.light_grey};
  }
`;

interface Props {
  item: Option;
  message?: Message;
}

const MessageAdminCardElement = (props: Props): ReactElement => {
  const { item, message } = props;
  const { label, value } = item;

  const utils: { [key: string]: VoidFunction } = {
    [AdminMenuValues.BLOCK]: async () => {
      const usersCollection = collection(db, 'users');
      const userDoc = doc(usersCollection, message?.userInfo.userId);

      await updateDoc(userDoc, {
        isBlocked: true,
      });
      const charRef = collection(db, 'global_chat');
      const q = query(
        charRef,
        where('userInfo.userId', '==', message?.userInfo.userId),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          await updateDoc(doc.ref, {
            'userInfo.isBlocked': true,
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      });
    },
    [AdminMenuValues.DELETE]: async () => {
      const charRef = collection(db, 'global_chat');
      const q = query(charRef, where('chatId', '==', message?.chatId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        try {
          await updateDoc(doc.ref, {
            isDeleted: true,
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      });
    },
    [AdminMenuValues.RECOVER]: async () => {
      const charRef = collection(db, 'global_chat');
      const q = query(charRef, where('chatId', '==', message?.chatId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        try {
          await updateDoc(doc.ref, {
            isDeleted: false,
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      });
    },
    [AdminMenuValues.UNBLOCK]: async () => {
      const usersCollection = collection(db, 'users');
      const userDoc = doc(usersCollection, message?.userInfo.userId);
      await updateDoc(userDoc, {
        isBlocked: false,
      });
      const charRef = collection(db, 'global_chat');
      const q = query(
        charRef,
        where('userInfo.userId', '==', message?.userInfo.userId),
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        try {
          await updateDoc(doc.ref, {
            'userInfo.isBlocked': false,
          });
          // eslint-disable-next-line no-empty
        } catch (error) {}
      });
    },
  };

  return <MainLayout onClick={utils[value]}>{label}</MainLayout>;
};

export const MessageAdminCard = memo(MessageAdminCardElement);
