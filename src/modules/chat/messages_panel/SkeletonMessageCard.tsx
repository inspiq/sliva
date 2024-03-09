import 'react-loading-skeleton/dist/skeleton.css';

import { forwardRef, ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const SkeletonMessageLayout = styled.div`
  font-size: 15px;
  display: flex;
  margin-bottom: 12px;
`;

const SkeletonAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const SkeletonContentLayout = styled.div<{ $isMyMessage: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isMyMessage }) =>
    $isMyMessage ? 'flex-end' : 'flex-start'};
  align-items: flex-end;
  gap: 8px;
`;

interface SkeletonProps {
  isMyMessage: boolean;
}

const SkeletonMessageCardElement = ({
  isMyMessage,
}: SkeletonProps): ReactElement => (
  <SkeletonContentLayout $isMyMessage={isMyMessage}>
    {!isMyMessage && (
      <SkeletonAvatar>
        <Skeleton circle={50} height={30} />
      </SkeletonAvatar>
    )}
    <SkeletonMessageLayout>
      <Skeleton
        count={1}
        width={100}
        height={50}
        borderRadius={
          !isMyMessage ? '15px 15px 15px 3px' : '15px 15px 3px 15px'
        }
      />
    </SkeletonMessageLayout>
    {isMyMessage && (
      <SkeletonAvatar>
        <Skeleton circle={50} height={30} />
      </SkeletonAvatar>
    )}
  </SkeletonContentLayout>
);

export const SkeletonMessageCard = forwardRef(SkeletonMessageCardElement);
