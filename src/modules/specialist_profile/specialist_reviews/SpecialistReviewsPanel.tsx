import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { SpecialistReviewCard } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewCard';
import { Review } from 'src/modules/specialist_profile/SpecialistProfile';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface Props {
  reviews?: Review[];
}

const SpecialistReviewsPanelElement = memo((props: Props): ReactElement => {
  const { reviews } = props;

  return (
    <MainLayout>
      {reviews?.map((review) => (
        <SpecialistReviewCard review={review} key={review.reviewId} />
      ))}
    </MainLayout>
  );
});

SpecialistReviewsPanelElement.displayName = 'SpecialistReviewsPanelElement';

export const SpecialistReviewsPanel = SpecialistReviewsPanelElement;
