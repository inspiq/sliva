import { FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { useAuthContext } from 'src/context';
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

interface Props {
  onSendMessage: (text: string) => void;
}

const SendMessagePanelElement = (props: Props): ReactElement => {
  const [value, setValue] = useState('');
  const { onSendMessage } = props;
  const t = useTranslations('Chat');
  const { currentAuthUser } = useAuthContext();

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value.trim()) return;

    if (e.key === 'Enter') {
      onSendMessage(value);
      setValue('');
    }
  };

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const { target } = e;

    if (target instanceof HTMLTextAreaElement) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight - 18}px`;
    }
  };

  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value, style, scrollHeight } = e.target as HTMLTextAreaElement;
    setValue(value);
    style.height = '20px';
    style.height = `${scrollHeight}px`;

    if (!value) {
      style.height = '20px';
    }
  };

  return (
    <MainLayout>
      {currentAuthUser?.additionalInfo?.isBlocked ? (
        <BlockedOverlay>
          {t('send_message_panel.block_msg_panel')}
        </BlockedOverlay>
      ) : (
        <>
          <ImagePickerLayout>
            <PaperClipIcon />
          </ImagePickerLayout>
          <Textarea
            onInput={onInput}
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

export const SendMessagePanel = SendMessagePanelElement;
