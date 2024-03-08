import React, { ReactElement, useState } from 'react';
import Viewer from 'react-viewer';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { devices } from 'src/shared';

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

  @media ${devices.mobileL} {
    max-width: 220px;
  }
`;

interface Props {
  images_message?: string[];
  hasText: boolean;
  text?: string;
}

const MessageImagesPanelElement = (props: Props): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const { images_message, hasText, text } = props;
  const t = useTranslations('Chat');

  return (
    <>
      {images_message?.map((image, index) => (
        <>
          <Viewer
            key={index}
            visible={visible && activeIndex === index}
            onClose={() => setVisible(false)}
            images={images_message.map((src) => ({ src, alt: text }))}
            noClose={false}
            attribute={false}
          />
          <StyledMessageImg
            $first={index === 0}
            $last={index === images_message.length - 1}
            onClick={() => {
              setVisible(true);
              setActiveIndex(index);
            }}
            $hasText={hasText}
            src={image}
            width={350}
            height={200}
            quality={100}
            alt={t('send_message_panel.image_message')}
          />
        </>
      ))}
    </>
  );
};

export const MessageImagesPanel = MessageImagesPanelElement;
