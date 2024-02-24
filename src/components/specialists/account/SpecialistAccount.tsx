import { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';

import { Container, Footer, Header, Loader, Wrapper } from 'src/components';
import { ReviewForm } from 'src/components/forms/review/ReviewForm';
import { ReviewPanel } from 'src/components/specialists/account/SpecialistReviewList';
import { useAuthContext } from 'src/context';
import { ChatIcon, db, Specialist } from 'src/shared';

import { AreaPanel } from './SpecialistAreaPanel';

const Avatar = styled(Image)`
  width: 150px;
  height: 180px;
  border-radius: 10px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.light};
`;

const SpecialistProfileLayout = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 20px;
  margin: 40px 10px;
`;

const SpecialistListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FullName = styled.div`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.w600};
`;

const City = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Experience = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w400};
`;

const Row = styled.div`
  display: flex;
  gap: 30px;
`;

const Rating = styled.div`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ReviewsCount = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w500};
  display: flex;
  align-items: center;
  gap: 5px;
`;

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
  reveiwId?: string;
  name?: string;
  lastName?: string;
  userId?: string;
  date?: string;
  description?: string;
  rating: number;
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [specialistDetails, setSpecialistDetails] = useState<Specialist>();
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
    const docRef = doc(db, 'users', specialistId);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setSpecialistDetails(docSnapshot.data() as Specialist);
      }
    });

    return () => unsubscribe();
  }, [specialistId]);

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
            <SpecialistProfileLayout>
              <Avatar
                src={specialistDetails?.avatarUrl ?? '/files/images/avatar.png'}
                width={100}
                height={100}
                alt="Avatar"
              />
              <SpecialistListInfo>
                <FullName>
                  {specialistDetails?.name}
                  {specialistDetails?.lastName}
                </FullName>
                <City>Область:{specialistDetails?.city}</City>
                <Experience>Стаж:{specialistDetails?.experience}</Experience>
                <Row>
                  <Rating>{specialistDetails?.estimation}</Rating>
                  <ReviewsCount>
                    <ChatIcon width={20} />
                    {specialistDetails?.reviews.length} отзывов
                  </ReviewsCount>
                </Row>
              </SpecialistListInfo>
            </SpecialistProfileLayout>
            <AreaPanel areas={specialistDetails?.area} />
            <ReviewsLayout>
              <ReviewForm specialist={specialistDetails} />
              <ReviewPanel reviews={specialistDetails?.reviews} />
            </ReviewsLayout>
          </Specialistlayout>
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
