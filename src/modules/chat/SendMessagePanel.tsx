import { FormEvent, ReactElement, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { UiInput } from 'src/shared';

import { ImagesPanel } from './ImagesPanel';

interface StyledProps {
  isImage?: boolean;
}

const MainLayout = styled.div<StyledProps>`
  width: 100%;
  padding: 20px;
  position: absolute;
  right: 0;
  left: 0;
  bottom: ${({ isImage }) => (isImage ? -30 : 0)}px;
  border-radius: 0px 0px 10px 10px;
  background-color: ${({ theme }) => theme.white};
`;

const UiInputLayout = styled.div`
  position: absolute;
  right: 30px;
  bottom: 24px;
`;

interface Props {
  onSendMessage: (text: string, fileUpload?: File[]) => void;
  uploadFile?: (fileUpload: File) => void;
}

const SendMessagePanelElement = (props: Props): ReactElement => {
  const [value, setValue] = useState('');
  const [images, setImages] = useState<File[]>();
  const { onSendMessage } = props;
  const t = useTranslations('Chat');

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value && !images?.length) return;

    if (event.key == 'Enter') {
      onSendMessage(value, images);
      setValue('');
      setImages([]);
    }
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;

    if (files) {
      setImages((prevImages) => [...(prevImages ?? []), ...Array.from(files)]);
    }
  };

  return (
    <MainLayout isImage={!!images?.length}>
      <ImagesPanel images={images} />
      <UiInput
        placeholder={t('send_message_panel.placeholder')}
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputSize="medium"
      />
      <UiInputLayout>
        <UiInput type="file" hasInChat={true} onChange={onChange} />
      </UiInputLayout>
    </MainLayout>
  );
};

export const SendMessagePanel = SendMessagePanelElement;
