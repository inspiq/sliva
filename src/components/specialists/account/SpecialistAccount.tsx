import { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { ReviewForm } from 'src/components/forms/review/ReviewForm';
import { ReviewPanel } from 'src/components/specialists/account/SpecialistReviewList';
import { useAuthContext } from 'src/context';
import { db, Specialist } from 'src/shared';

import { AreaPanel } from './SpecialistAreaPanel';
import { SpecialistDataCard } from './SpecialistDataCard';

const ReviewsLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

const Specialistlayout = styled.div`
  max-width: 820px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface Props {
  specialistId: string;
}

export interface ReviewProps {
  avatar?: string;
  reveiwId?: string;
  firstName?: string;
  lastName?: string;
  userId?: string;
  date?: string;
  description?: string;
  rating: number;
}

export interface Rev {
  reviews: ReviewProps[];
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [specialistDetails, setSpecialistDetails] = useState<Specialist>();
  const [reviews, setReviews] = useState<Rev>();
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
        setReviews(docSnapshot.data() as Rev);
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
        setReviews(snapshot.data() as Rev);
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
          <Specialistlayout>
            <SpecialistDataCard
              specialist={specialistDetails}
              reviews={reviews}
            />
            <AreaPanel areas={specialistDetails?.area} />
            <ReviewsLayout>
              <ReviewForm
                specialist={specialistDetails}
                reviews={reviews?.reviews}
              />
              <ReviewPanel reviews={reviews?.reviews} />
            </ReviewsLayout>
          </Specialistlayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
