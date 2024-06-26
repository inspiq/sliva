import type { ReactElement } from 'react';
import styled from 'styled-components';

import { SpecialistReviewCard } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewCard';
import type { Review } from 'src/modules/specialist_profile/SpecialistProfile';
import { SKELETON_REVIEWS_COUNT, SkeletonPanel } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  reviews?: Review[];
  isLoading: boolean;
}

const SpecialistReviewsPanelElement = (props: Props): ReactElement => {
  const { reviews, isLoading } = props;

  return (
    <MainLayout>
      {isLoading ? (
        <SkeletonPanel
          count={SKELETON_REVIEWS_COUNT}
          SkeletonCard={<SpecialistReviewCard isLoading={isLoading} />}
        />
      ) : (
        reviews?.map((review) => (
          <SpecialistReviewCard
            review={review}
            key={review.reviewId}
            isLoading={isLoading}
          />
        ))
      )}
    </MainLayout>
  );
};

export const SpecialistReviewsPanel = SpecialistReviewsPanelElement;
