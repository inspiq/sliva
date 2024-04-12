import type { ReactElement } from 'react';
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

import { AdminMenuValues } from 'src/enums';
import { MessageAdminCard } from 'src/modules/chat/messages_panel/message_admin_panel/MessageAdminCard';
import type { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { db, getChatAdminMenu } from 'src/shared';

interface Props {
  message?: Message;
  close: VoidFunction;
}

const MessageAdminPanelElement = (props: Props): ReactElement => {
  const { message, close } = props;

  const t = useTranslations();
  const menu = getChatAdminMenu(t);

  const updateUserBlockStatus = async (isBlocked: boolean) => {
    try {
      close();

      const usersRef = collection(db, 'users');
      const userDoc = doc(usersRef, message?.user.id);
      await updateDoc(userDoc, {
        isBlocked,
      });

      const chatRef = collection(db, 'global_chat');
      const q = query(chatRef, where('user.id', '==', message?.user.id));

      const batch = writeBatch(db);
      const { docs } = await getDocs(q);

      for (const doc of docs) {
        batch.update(doc.ref, {
          'user.isBlocked': isBlocked,
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

  const messageDeleted = message?.isDeleted ?? false;
  const messageBlocked = message?.user.isBlocked ?? false;
  const adminActions: { [key: string]: VoidFunction } = {
    [AdminMenuValues.DELETE]: () => updateMessageDeleteStatus(true),
    [AdminMenuValues.RECOVER]: () => updateMessageDeleteStatus(false),
    [AdminMenuValues.BLOCK]: () => updateUserBlockStatus(true),
    [AdminMenuValues.UNBLOCK]: () => updateUserBlockStatus(false),
  };
  const renderCardOptions: { [key: string]: boolean } = {
    [AdminMenuValues.DELETE]: !messageDeleted,
    [AdminMenuValues.BLOCK]: !messageBlocked,
    [AdminMenuValues.RECOVER]: messageDeleted,
    [AdminMenuValues.UNBLOCK]: messageBlocked,
  };

  return (
    <>
      {menu.map(
        (item) =>
          renderCardOptions[item.value] && (
            <MessageAdminCard
              item={item}
              adminActions={adminActions}
              key={item.value}
            />
          ),
      )}
    </>
  );
};

export const MessageAdminPanel = MessageAdminPanelElement;
