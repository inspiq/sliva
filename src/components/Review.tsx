import React, { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { Rate } from 'src/shared/ui/chips/RateChip';

import { ReviewProps as Review } from './specialists/account/SpecialistAccount';

const MainLayout = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const RateReviewLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Date = styled.div`
  padding-bottom: 3px;
`;

const StyledAvatar = styled(Image)`
  object-fit: cover;
  border-radius: 60px;
  width: 30px;
  height: 30px;
`;

const UserDetailsLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-items: center;
  min-width: 600px;
`;

const CommentDetailsLayout = styled.div`
  padding-left: 39px;
  margin-top: 16px;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.w600};
  font-size: 20px;
  margin-bottom: 10px;
`;

const TextComment = styled.div`
  word-wrap: break-word;
`;

const ReviewCardElement = (props: Review): ReactElement => {
  const { avatar, date, description, rating } = props;

  return (
    <MainLayout>
      <ReviewHeader>
        <UserDetailsLayout>
          <StyledAvatar
            src={avatar ?? '/files/images/avatar.png'}
            alt="Avatar"
            width={30}
            height={30}
          />
          <div></div>
        </UserDetailsLayout>
        <RateReviewLayout>
          <Date>{date}</Date>
          <Rate isDisabled currentRating={rating} />
        </RateReviewLayout>
      </ReviewHeader>
      <CommentDetailsLayout>
        <Title>Комментарий</Title>
        <TextComment>{description} </TextComment>
      </CommentDetailsLayout>
    </MainLayout>
  );
};
export const ReviewCard = ReviewCardElement;
