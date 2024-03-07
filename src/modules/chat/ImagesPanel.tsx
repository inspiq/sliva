import React, { ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

const ImageLayout = styled.div`
  margin-top: 10px;
  height: 70px;
  width: 100%;
  border-radius: 10px;
  display: flex;
  gap: 10px;
`;

interface Props {
  images?: File[];
}

const ImagesPanelElement = (props: Props): ReactElement => {
  const { images } = props;
  const t = useTranslations('Chat');

  return (
    <ImageLayout>
      {images?.map((image) => (
        <StyledImage
          key={image.name}
          src={URL.createObjectURL(image)}
          width={70}
          height={70}
          quality={200}
          alt={t('send_message_panel.image_message')}
        />
      ))}
    </ImageLayout>
  );
};

export const ImagesPanel = ImagesPanelElement;
