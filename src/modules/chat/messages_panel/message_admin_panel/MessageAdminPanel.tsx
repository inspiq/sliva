/* eslint-disable no-nested-ternary */
import { ReactElement } from 'react';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { useTranslations } from 'next-intl';

import { MessageAdminCard } from 'src/modules/chat/messages_panel/message_admin_panel/MessageAdminCard';
import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { AdminMenuValues, db, getChatAdminMenu } from 'src/shared';

const MessageAdminPanelElement = (props: {
  message?: Message;
  close: VoidFunction;
}): ReactElement => {
  const { message, close } = props;

  const t = useTranslations();
  const menu = getChatAdminMenu(t);

  const updateUserBlockStatus = async (isBlocked: boolean) => {
    try {
      close();
      const usersRef = collection(db, 'users');
      const userDoc = doc(usersRef, message?.userInfo.userId);
      await updateDoc(userDoc, {
        isBlocked,
      });

      const chatRef = collection(db, 'global_chat');
      const q = query(
        chatRef,
        where('userInfo.userId', '==', message?.userInfo.userId),
      );

      const batch = writeBatch(db);
      const { docs } = await getDocs(q);

      for (const doc of docs) {
        batch.update(doc.ref, {
          'userInfo.isBlocked': isBlocked,
        });
      }

      await batch.commit();
    } catch (e) {
      /* empty */
    }
  };

  const updateMessageDeleteStatus = async (isDeleted: boolean) => {
    try {
      close();
      const charRef = collection(db, 'global_chat');
      const q = query(charRef, where('chatId', '==', message?.chatId));
      const { docs } = await getDocs(q);
      const batch = writeBatch(db);

      for (const doc of docs) {
        batch.update(doc.ref, { isDeleted });
      }

      await batch.commit();
    } catch (error) {
      /* empty */
    }
  };

  const adminActions: { [key: string]: VoidFunction } = {
    [AdminMenuValues.DELETE]: () => updateMessageDeleteStatus(true),
    [AdminMenuValues.BLOCK]: () => updateUserBlockStatus(true),
    [AdminMenuValues.RECOVER]: () => updateMessageDeleteStatus(false),
    [AdminMenuValues.UNBLOCK]: () => updateUserBlockStatus(false),
  };

  return (
    <>
      {menu.map((item) => {
        const shouldRender =
          (item.value === AdminMenuValues.DELETE && !message?.isDeleted) ||
          (item.value === AdminMenuValues.BLOCK &&
            !message?.userInfo.isBlocked) ||
          (item.value === AdminMenuValues.RECOVER && message?.isDeleted) ||
          (item.value === AdminMenuValues.UNBLOCK &&
            message?.userInfo.isBlocked);

        return (
          shouldRender && (
            <MessageAdminCard
              item={item}
              adminActions={adminActions}
              key={item.value}
            />
          )
        );
      })}
    </>
  );
};

export const MessageAdminPanel = MessageAdminPanelElement;
