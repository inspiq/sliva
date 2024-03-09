import React, { ReactElement } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const MainLayout = styled.div`
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const TextLayout = styled.div`
  width: 100%;
  min-height: 125px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;
  color: ${({ theme }) => theme.secondary};
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const SpecialistReviewFormElement = (): ReactElement => {
  return (
    <MainLayout>
      <HeaderLayout>
        <Skeleton width={280} height={30} />
        <Skeleton width={120} height={25} />
      </HeaderLayout>
      <TextLayout>
        <Skeleton width={50} height={20} />
      </TextLayout>
      <ButtonLayout>
        <Skeleton width={150} height={40} borderRadius={'10px'} />
      </ButtonLayout>
    </MainLayout>
  );
};

export const SkeletonSpecialistReviewForm = SpecialistReviewFormElement;
