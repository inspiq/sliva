import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { Review } from 'src/modules/specialists/specialist_profile/specialist_account/SpecialistProfile';
import { ReviewCard } from 'src/modules/specialists/specialist_profile/specialist_reviews/ReviewCard';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  reviews?: Review[];
}

const ReviewListElement = memo(function ReviewList(props: Props): ReactElement {
  const { reviews } = props;

  return (
    <MainLayout>
      {reviews?.map((review) => (
        <ReviewCard review={review} key={review.reviewId} />
      ))}
    </MainLayout>
  );
});

export const ReviewsPanel = ReviewListElement;
