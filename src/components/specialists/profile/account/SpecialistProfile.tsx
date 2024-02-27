import { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { ReviewForm } from 'src/components/forms/review/ReviewForm';
import { ReviewPanels } from 'src/components/specialists/profile/SpecialistReviewPanel';
import { useAuthContext } from 'src/context';
import { db, Specialist } from 'src/shared';

import { AreaPanel } from '../SpecialistAreaPanel';
import { SpecialistDetailsCard } from '../SpecialistDataCard';

const ReviewsLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const Layout = styled.div`
  max-width: 820px;
  height: calc(100vh);
  margin: 10px auto;
`;

interface Props {
  specialistId: string;
}

export interface Review {
  avatar?: string;
  reveiwId?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  date?: string;
  description?: string;
  rating: number;
}

export interface ReviewDocument {
  reviews: Review[];
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [specialistDetails, setSpecialistDetails] = useState<Specialist>();
  const [reviewsDocument, setReviewsDocument] = useState<ReviewDocument>();
  const { currentAuthUser } = useAuthContext();
  const getSpecialist = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setSpecialistDetails(snapshot.data() as Specialist);
      }
    } catch {
      /* empty */
    }
  }, [specialistId]);

  useEffect(() => {
    getSpecialist();
  }, [getSpecialist]);

  useEffect(() => {
    const docRef = doc(db, 'reviews', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setReviewsDocument(docSnapshot.data() as ReviewDocument);
      }
    });

    return () => unsubscribe();
  }, [specialistId]);

  useEffect(() => {
    const docRef = doc(db, 'users', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setSpecialistDetails(docSnapshot.data() as Specialist);
      }
    });

    return () => unsubscribe();
  }, [specialistId]);

  const getReview = useCallback(async () => {
    try {
      const docRef = doc(db, 'reviews', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setReviewsDocument(snapshot.data() as ReviewDocument);
      }
    } catch {
      /* empty */
    }
  }, [specialistId]);

  useEffect(() => {
    getReview();
  }, [getReview]);

  if (
    !currentAuthUser ||
    !currentAuthUser?.additionalInfo ||
    !specialistDetails
  ) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <Layout>
            <SpecialistDetailsCard
              specialist={specialistDetails}
              reviewsDocument={reviewsDocument}
            />
            <AreaPanel areas={specialistDetails?.areas} />
            <ReviewsLayout>
              <ReviewForm
                specialist={specialistDetails}
                reviews={reviewsDocument?.reviews}
              />
              <ReviewPanels reviews={reviewsDocument?.reviews} />
            </ReviewsLayout>
          </Layout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistProfile = SpecialistAccountElement;
