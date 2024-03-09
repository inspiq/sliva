import React, { ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpecialistContentLayout = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

const SpecialistInfoLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const SkeletonLine = styled.div`
  padding: 25px 0;
`;

interface Props {
  avatarWidth?: number;
  avatarHeight?: number;
}

const SkeletonSpecialistElement = (props: Props): ReactElement => {
  const { avatarWidth, avatarHeight } = props;

  return (
    <MainLayout>
      <SpecialistContentLayout>
        <Skeleton
          width={avatarWidth ? avatarWidth : 120}
          height={avatarHeight ? avatarHeight : 130}
          borderRadius={'10px'}
        />
        <SpecialistInfoLayout>
          <Skeleton count={1} width={150} height={25} />
          <Skeleton width={250} height={20} />
          <Skeleton width={170} height={20} />
          <Skeleton width={170} height={20} />
        </SpecialistInfoLayout>
      </SpecialistContentLayout>
      <Skeleton width={120} count={2} />
      <SkeletonLine>
        <Skeleton width={'100%'} height={'1px'} />
      </SkeletonLine>
    </MainLayout>
  );
};

export const SkeletonSpecialist = SkeletonSpecialistElement;
