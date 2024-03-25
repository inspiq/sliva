import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';

import { MessageAdminCard } from 'src/modules/chat/messages_panel/message_admin_menu/MessageAdminCard';
import { Message } from 'src/modules/chat/messages_panel/MessagesPanel';
import { AdminMenuValues, getChatAdminMenu } from 'src/shared';

const MessageAdminPanelElement = (props: {
  message?: Message;
}): ReactElement => {
  const { message } = props;
  const t = useTranslations();
  const menu = getChatAdminMenu(t);

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

        return shouldRender ? (
          <MessageAdminCard message={message} item={item} key={item.value} />
        ) : null;
      })}
    </>
  );
};

export const MessageAdminPanel = MessageAdminPanelElement;
