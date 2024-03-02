import { ReactElement, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

import { Header } from 'src/modules';
import { SpecialistReviewForm } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewForm';
import { SpecialistReviewsPanel } from 'src/modules/specialist_profile/specialist_reviews/SpecialistReviewsPanel';
import { SpecialistDetails } from 'src/modules/specialist_profile/SpecialistDetails';
import { Container, db, Footer, Loader, Specialist, Wrapper } from 'src/shared';

const ReviewsLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 40px;
`;

const ContentLayout = styled.div`
  min-height: calc(100vh - 146px);
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Column = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  specialistId: string;
}

export interface Review {
  reviewId: string;
  date: Date;
  rating: number;
  text: string;
  userInfo: Specialist;
}

export interface ReviewDocument {
  reviews: Review[];
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;

  const [specialist, setSpecialist] = useState<Specialist>();
  const [allReviews, setAllReviews] = useState<ReviewDocument>();

  useEffect(() => {
    const docRef = doc(db, 'reviews', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setAllReviews(docSnapshot.data() as ReviewDocument);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [specialistId]);

  useEffect(() => {
    const docRef = doc(db, 'users', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setSpecialist(docSnapshot.data() as Specialist);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [specialistId]);

  if (!specialist) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <ContentLayout>
            <Column>
              <SpecialistDetails specialist={specialist} />
              <ReviewsLayout>
                <SpecialistReviewForm
                  specialist={specialist}
                  reviews={allReviews?.reviews}
                />
                <SpecialistReviewsPanel reviews={allReviews?.reviews} />
              </ReviewsLayout>
            </Column>
          </ContentLayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistProfile = SpecialistAccountElement;