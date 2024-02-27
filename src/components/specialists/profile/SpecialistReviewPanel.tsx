import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { Review } from 'src/components/specialists/profile/account/SpecialistProfile';
import { ReviewCard } from 'src/components/specialists/profile/ReviewCard';

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
        <ReviewCard review={review} key={review.userId} />
      ))}
    </MainLayout>
  );
});

export const ReviewPanels = ReviewListElement;
