import React, { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import { ReviewProps as ReviewsType } from 'src/components/specialists/account/SpecialistAccount';
import { Rate } from 'src/shared/ui/chips/RateChip';

const ReviewContainer = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 800px;
`;

const RateReviewContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateFeedback = styled.div`
  padding-bottom: 3px;
`;

const ReviewAvatar = styled(Image)`
  object-fit: cover;
  border-radius: 60px;
  width: 30px;
  height: 30px;
`;

const UserInfoReview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  align-items: center;
  min-width: 600px;
`;

const Comment = styled.div`
  padding-left: 39px;
  margin-top: 16px;
`;

const Title = styled.div``;

const Thead = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.div`
  word-wrap: break-word;
`;

const ReviewsItemElement = (props: ReviewsType): ReactElement => {
  const { name, lastName, rating, date, description } = props;

  return (
    <ReviewContainer>
      <Head>
        <UserInfoReview>
          <ReviewAvatar></ReviewAvatar>
          <Title>
            {name} {lastName}
          </Title>
        </UserInfoReview>
        <RateReviewContainer>
          <DateFeedback>{date}</DateFeedback>
          <Rate isDisabled={true} currentRating={rating} />
        </RateReviewContainer>
      </Head>
      <Comment>
        <Thead>Комментарий</Thead>
        <Description>{description} </Description>
      </Comment>
    </ReviewContainer>
  );
};
export const ReviewsItem = ReviewsItemElement;
