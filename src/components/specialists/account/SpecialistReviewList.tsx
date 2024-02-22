import React, { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { ReviewsItem } from 'src/components/Review';
import { ReviewProps as ReviewsType } from 'src/components/specialists/account/SpecialistAccount';

const ReviewItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
interface Props {
  reviews?: ReviewsType[];
}

// eslint-disable-next-line react/display-name
const ReviewListElement = memo((props: Props): ReactElement => {
  const { reviews } = props;

  return (
    <ReviewItemList>
      {reviews?.map((review) => (
        <ReviewsItem
          name={review.name}
          lastName={review.lastName}
          date={review.date}
          description={review.description}
          key={review.userId}
          rating={review.rating}
        />
      ))}
    </ReviewItemList>
  );
});

export const ReviewList = ReviewListElement;
