import { FormEvent, KeyboardEvent, ReactElement, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { UiInput } from 'src/shared';

import { ImagesPanel } from './ImagesPanel';

const MainLayout = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 0px 0px 10px 10px;
  background-color: ${({ theme }) => theme.white};
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  align-items: flex-start;
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

const ImagePickerLayout = styled.div`
  cursor: pointer;
`;
const MessageContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

interface Props {
  onSendMessage: (text: string, fileUpload?: File[]) => void;
}

const SendMessagePanelElement = (props: Props): ReactElement => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState<File[]>();
  const { onSendMessage } = props;
  const t = useTranslations('Chat');

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!value.trim()) return;

    if (e.key === 'Enter') {
      onSendMessage(value, images);
      setValue('');
      setImages([]);
    }
  };

  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value, style, scrollHeight } = e.target as HTMLTextAreaElement;
    setValue(value);
    style.height = '20px';
    style.height = `${scrollHeight}px`;
  };

  const uploadFile = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    if (!files) return;
    setImages((prevImages) => [...(prevImages ?? []), ...Array.from(files)]);
  };

  return (
    <>
      <MainLayout>
        <ImagePickerLayout>
          <UiInput type="file" hasInChat={true} onChange={uploadFile} />
        </ImagePickerLayout>
        <MessageContentLayout>
          <Textarea
            placeholder={t('send_message_panel.placeholder')}
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
          />
          {!!images && <ImagesPanel images={images} />}
        </MessageContentLayout>
      </MainLayout>
    </>
  );
};

export const SendMessagePanel = SendMessagePanelElement;
