import 'react-loading-skeleton/dist/skeleton.css';

import { forwardRef, ReactElement, Ref } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const SkeletonMessageLayout = styled.div`
  font-size: 15px;
  display: flex;
  margin-bottom: 12px;
`;

const SkeletonAvatarLayout = styled.div`
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

const SkeletonMessageCardElement = (
  props: SkeletonProps,
  ref: Ref<HTMLDivElement>,
): ReactElement => {
  const { isMyMessage } = props;

  return (
    <SkeletonContentLayout $isMyMessage={isMyMessage} ref={ref}>
      {!isMyMessage && (
        <SkeletonAvatarLayout>
          <Skeleton circle height={30} />
        </SkeletonAvatarLayout>
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
        <SkeletonAvatarLayout>
          <Skeleton circle height={30} />
        </SkeletonAvatarLayout>
      )}
    </SkeletonContentLayout>
  );
};

export const SkeletonMessageCard = forwardRef(SkeletonMessageCardElement);
