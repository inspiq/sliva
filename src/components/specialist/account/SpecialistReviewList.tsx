import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Props as ReviewsType } from 'src/components/Feedback';
import { ReviewsItem } from 'src/components/Feedback';

const ReviewItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
interface Props {
  reviews: ReviewsType[] | undefined;
}

const ReviewListElement = (props: Props): ReactElement => {
  const { reviews } = props;

  return (
    <ReviewItemList>
      {reviews?.map((feedback) => (
        <ReviewsItem
          name={feedback.name}
          lastName={feedback.lastName}
          date={feedback.date}
          description={feedback.description}
          key={feedback.userId}
          rating={feedback.rating}
        />
      ))}
    </ReviewItemList>
  );
};

export const ReviewList = ReviewListElement;
