import { FormEvent, ReactElement, useMemo, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { UiInput } from 'src/shared';

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
  right: 20px;
  bottom: 15px;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

const ImageLayout = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  position: absolute;
  top: -50px;
  left: 30px;
`;

interface Props {
  onSendMessage: (text: string, fileUpload?: File) => void;
  uploadFile?: (fileUpload: File) => void;
}

const SendMessagePanelElement = (props: Props): ReactElement => {
  const [value, setValue] = useState('');
  const [image, setImage] = useState<File>();
  const { onSendMessage } = props;

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value && !image) return;

    if (event.key == 'Enter') {
      onSendMessage(value, image);
      setValue('');
      setImage(undefined);
    }
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { files } = e.target as HTMLInputElement;
    setImage(files?.[0]);
  };

  const getAvatarPath = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
  }, [image]);

  return (
    <MainLayout isImage={!!image}>
      {image && (
        <ImageLayout>
          <StyledImage
            src={getAvatarPath || ''}
            width={60}
            height={60}
            quality={200}
            alt="Image"
          />
        </ImageLayout>
      )}
      <UiInput
        placeholder="Введите сообщение"
        onKeyDown={onKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputSize="medium"
      />
      <UiInputLayout>
        <UiInput type="file" onChange={onChange} />
      </UiInputLayout>
    </MainLayout>
  );
};

export const SendMessagePanel = SendMessagePanelElement;
