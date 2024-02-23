/* eslint-disable react/display-name */
import React, { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { ReviewCard } from 'src/components/Review';
import { ReviewProps as Review } from 'src/components/specialists/account/SpecialistAccount';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
interface Props {
  reviews?: Review[];
}

const ReviewListElement = memo((props: Props): ReactElement => {
  const { reviews } = props;

  return (
    <MainLayout>
      {reviews?.map((review) => (
        <ReviewCard
          name={review.name}
          lastName={review.lastName}
          date={review.date}
          description={review.description}
          key={review.userId}
          rating={review.rating}
        />
      ))}
    </MainLayout>
  );
});

export const ReviewPanel = ReviewListElement;
