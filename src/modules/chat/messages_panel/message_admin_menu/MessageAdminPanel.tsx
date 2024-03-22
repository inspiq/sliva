import { ReactElement } from 'react';

import { MessageAdminCard } from 'src/modules/chat/messages_panel/message_admin_menu/MessageAdminCard';
import { MENU_ELEMENTS } from 'src/shared';

import { Message } from '../MessagesPanel';

interface Props {
  message?: Message;
}

const MessageAdminPanelElement = (props: Props): ReactElement => {
  const { message } = props;

  return (
    <>
      {MENU_ELEMENTS.map((item) => {
        const shouldRender =
          (item.value === 'delete' && !message?.isDeleted) ||
          (item.value === 'block' && !message?.userInfo.isBlocked) ||
          (item.value === 'recover' && message?.isDeleted) ||
          (item.value === 'unlock' && message?.userInfo.isBlocked);

        return shouldRender ? (
          <MessageAdminCard message={message} item={item} key={item.value} />
        ) : null;
      })}
    </>
  );
};

export const MessageAdminPanel = MessageAdminPanelElement;
