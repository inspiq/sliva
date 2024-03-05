import React, { ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

const StyledMessageImg = styled(Image)<{
  $hasText: boolean;
  $first: boolean;
  $last: boolean;
}>`
  border-radius: ${({ $hasText, $first, $last }) => {
    if ($first && $last) {
      return $hasText ? '15px 15px 3px 3px' : '15px 15px 3px 15px';
    } else if ($first) {
      return '15px 15px 3px 3px';
    } else if (!$first && !$last) {
      return '';
    } else {
      return $last && $hasText ? '' : '3px 3px 3px 15px';
    }
  }};
  height: 200px;
  width: 350px;
  object-fit: none;
`;

interface Props {
  images_message?: string[];
  hasText: boolean;
}

const MessageImagesPanelElement = (props: Props): ReactElement => {
  const { images_message, hasText } = props;
  const t = useTranslations('Chat');

  return (
    <>
      {images_message?.map((image, index) => (
        <StyledMessageImg
          $first={index == 0}
          $last={index == images_message.length - 1}
          key={index}
          $hasText={hasText}
          src={image}
          width={350}
          height={200}
          quality={100}
          alt={t('send_message_panel.image_message')}
        />
      ))}
    </>
  );
};

export const MessageImagesPanel = MessageImagesPanelElement;
