import { KeyboardEvent, ReactElement, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

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
  height: 100%;
  font-size: 15px;
  padding: 0;
  color: ${({ theme }) => theme.text};
  height: 20px;
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

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value) return;

    if (event.key === 'Enter') {
      onSendMessage(value);
    }
  };

  return (
    <MainLayout>
      <ImagePickerLayout>
        <PaperClipIcon />
      </ImagePickerLayout>
      <Textarea
        placeholder={t('send_message_panel.placeholder')}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </MainLayout>
  );
};

export const SendMessagePanel = SendMessagePanelElement;
