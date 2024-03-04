import React, { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

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
  display: flex;
  gap: 10px;
`;

interface Props {
  images?: File[];
}

const ImagesPanelElement = (props: Props): ReactElement => {
  const { images } = props;

  return (
    <ImageLayout>
      {images?.map((image) => (
        <StyledImage
          key={image.name}
          src={URL.createObjectURL(image)}
          width={60}
          height={60}
          quality={200}
          alt="Image"
        />
      ))}
    </ImageLayout>
  );
};

export const ImagesPanel = ImagesPanelElement;
