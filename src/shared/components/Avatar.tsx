import type { ReactElement } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { DEFAULT_AVATAR_URL } from 'src/shared';

const StyledImage = styled(Image)<{
  width: number;
  height: number;
}>`
  object-fit: cover;
  border-radius: 60px;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.avatar.bg};
`;

interface Props {
  avatarUrl: string;
  width: number;
  height: number;
}

const AvatarElement = (props: Props): ReactElement => {
  const { avatarUrl, width, height } = props;

  const t = useTranslations('alts');

  return (
    <StyledImage
      src={avatarUrl ?? DEFAULT_AVATAR_URL}
      alt={t('avatar')}
      width={width}
      height={height}
      priority
    />
  );
};

export const Avatar = AvatarElement;
