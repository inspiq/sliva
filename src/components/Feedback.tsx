import React, { ReactElement } from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

import { Rate } from '.';

// Анимация для эффекта загрузки
const shimmer = keyframes`
  0% {
    background-position: -40rem 0;
  }
  100% {
    background-position: 40rem 0;
  }
`;

// Стилизованный контейнер для отзыва
const ReviewContainer = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 780px;
`;
const RateFeedbackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const DateFeedback = styled.div`
  padding-bottom: 3px;
`;

const FeedbackAvatar = styled(Image)`
  object-fit: cover;
  border-radius: 60px;
  width: 30px;
  height: 30px;
`;

const UserInfoFeedback = styled.div`
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
const Description = styled.div``;

export interface Props {
  reveiwId?: string;
  name?: string;
  date?: string;
  description?: string;
}

const Feedback = (props: Props): ReactElement => {
  const { name, date, description } = props;

  return (
    <ReviewContainer>
      <Head>
        <UserInfoFeedback>
          <FeedbackAvatar></FeedbackAvatar>
          <Title>{name}</Title>
        </UserInfoFeedback>
        <RateFeedbackContainer>
          <DateFeedback>{date}</DateFeedback>
          <Rate />
        </RateFeedbackContainer>
      </Head>
      <Comment>
        <Thead>Комментарий</Thead>
        <Description>{description} </Description>
      </Comment>
    </ReviewContainer>
  );
};
export const UIFeedback = Feedback;
