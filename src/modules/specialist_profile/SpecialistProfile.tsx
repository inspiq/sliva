import { type ReactElement, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { doc, onSnapshot } from 'firebase/firestore';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Header } from 'src/modules';
import { SpecialistReviewForm } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewForm';
import { SpecialistReviewsPanel } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewsPanel';
import { SpecialistCard } from 'src/modules/specialists/specialists_panel/SpecialistCard';
import {
  BlockOverlay,
  Container,
  db,
  Footer,
  useToggle,
  Wrapper,
} from 'src/shared';
import { sessionStore } from 'src/store';
import type { Specialist } from 'src/types';

const ReviewsLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 40px;
`;

const ContentLayout = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Column = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export interface Review {
  reviewId: string;
  date: Date;
  rating: number;
  text: string;
  user: Specialist;
}

interface ReviewDocument {
  reviews: Review[];
}

const SpecialistAccountElement = (props: {
  specialistId: string;
}): ReactElement => {
  const { specialistId } = props;

  const [specialist, setSpecialist] = useState<Specialist>();
  const [allReviews, setAllReviews] = useState<ReviewDocument>();
  const t = useTranslations();
  const { visible: isLoadingSpecialist, close: stopLoadingSpecialist } =
    useToggle(true);
  const { visible: isLoadingReviews, close: stopLoadingReviews } =
    useToggle(true);

  useEffect(() => {
    const docRef = doc(db, 'reviews', specialistId);
    const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        setAllReviews(documentSnapshot.data() as ReviewDocument);
      }
      stopLoadingReviews();
    });

    return () => {
      unsubscribe();
    };
  }, [specialistId, stopLoadingReviews]);

  useEffect(() => {
    const docRef = doc(db, 'users', specialistId);
    const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
      if (documentSnapshot.exists()) {
        setSpecialist(documentSnapshot.data() as Specialist);
      }
      stopLoadingSpecialist();
    });

    return () => {
      unsubscribe();
    };
  }, [stopLoadingSpecialist, specialistId]);

  return (
    <>
      <Header />
      <Wrapper content="flex-start">
        <Container>
          <ContentLayout>
            <Column>
              <SpecialistCard
                specialist={specialist}
                isLoading={isLoadingSpecialist}
                showExtendedInfo
              />
              <ReviewsLayout>
                {isLoadingReviews ? (
                  <Skeleton height={259} borderRadius={15} />
                ) : (
                  <SpecialistReviewForm
                    specialist={specialist}
                    reviews={allReviews?.reviews}
                    isLoading={isLoadingReviews}
                  />
                )}
                <SpecialistReviewsPanel
                  reviews={allReviews?.reviews}
                  isLoading={isLoadingReviews}
                />
              </ReviewsLayout>
            </Column>
            {!sessionStore.authUser && !sessionStore.lockState.progress && (
              <BlockOverlay title={t('block.titles.auth_to_access')} />
            )}
          </ContentLayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistProfile = observer(SpecialistAccountElement);
