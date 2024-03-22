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

import { db, Option } from 'src/shared';

import { Message } from '../MessagesPanel';

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
  const { item } = props;
  const { message } = props;

  const { label, value } = item;

  const utils: { [key: string]: VoidFunction } = {
    block: async () => {
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

    delete: async () => {
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

    recover: async () => {
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

    unlock: async () => {
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
