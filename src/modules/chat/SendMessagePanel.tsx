import {
  type FormEvent,
  type KeyboardEvent,
  type ReactElement,
  useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { sessionStore } from 'src/app_store';
import { PaperClipIcon } from 'src/shared';

const MainLayout = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 0px 0px 10px 10px;
  background-color: ${({ theme }) => theme.white};
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  gap: 20px;
  height: auto;
`;

const Textarea = styled.textarea`
  border: none;
  width: 100%;
  height: auto;
  font-size: 15px;
  padding: 0;
  color: ${({ theme }) => theme.text};
  height: 20px;
  overflow: hidden;
`;

const BlockedOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ImagePickerLayout = styled.div`
  cursor: pointer;
`;

const SendMessagePanelElement = (props: {
  onSendMessage: (text: string) => void;
}): ReactElement => {
  const { onSendMessage } = props;

  const [value, setValue] = useState('');
  const t = useTranslations('Chat');

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value.trim()) return;

    if (e.key === 'Enter') {
      onSendMessage(value);
      setValue('');
    }
  };

  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;

    if (!target.value.trim()) {
      setValue(target.value.trim());
      target.style.height = '20px';

      return;
    }

    setValue(target.value);

    target.style.height = '20px';

    requestAnimationFrame(() => {
      target.style.height = `${target.scrollHeight}px`;
    });
  };

  return (
    <MainLayout>
      {sessionStore.authUser?.additionalInfo?.isBlocked ? (
        <BlockedOverlay>
          {t('send_message_panel.block_message_panel')}
        </BlockedOverlay>
      ) : (
        <>
          <ImagePickerLayout>
            <PaperClipIcon />
          </ImagePickerLayout>
          <Textarea
            placeholder={t('send_message_panel.placeholder')}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
          />
        </>
      )}
    </MainLayout>
  );
};

export const SendMessagePanel = observer(SendMessagePanelElement);
