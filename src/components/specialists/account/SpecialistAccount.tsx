import {
  ReactElement,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import styled from 'styled-components';

import {
  ReviewForm,
  StyledButton,
} from 'src/components/forms/review/ReviewForm';
import { ReviewList } from 'src/components/specialist/account/SpecialistReviewList';
import { ChatIcon, db, Specialist } from 'src/shared';

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

const ReviewsBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 50px;
`;

const Container = styled.div`
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
  lastName?: string;
  userId?: string;
  specialistId?: string;
  reveiwId?: string;
  name?: string;
  date?: string;
  description?: string;
  rating: number;
  textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement>;
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const [IsWrite, seIitWrite] = useState<boolean>();

  const WriteReview = () => {
    seIitWrite((prev) => !prev);
  };

  const getSpecialist = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
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
        setUserMetaData(docSnapshot.data() as Specialist);
      }
    });

    return () => unsubscribe();
  }, [specialistId]);

  return (
    <Container>
      <SpecialistProfileLayout>
        <Avatar
          src={userMetaData?.avatarUrl ?? '/files/images/avatar.png'}
          width={100}
          height={100}
          alt="Avatar"
        />
        <SpecialistListInfo>
          <FullName>
            {userMetaData?.name}
            {userMetaData?.lastName}
          </FullName>
          <City>Область:{userMetaData?.city}</City>
          <Experience>Стаж:{userMetaData?.experience}</Experience>
          <Row>
            <Rating>4,5</Rating>
            <ReviewsCount>
              <ChatIcon width={20} />
              590 отзывов
            </ReviewsCount>
          </Row>
        </SpecialistListInfo>
      </SpecialistProfileLayout>
      <ReviewsBlock>
        {IsWrite ? (
          <ReviewForm
            reviews={userMetaData?.reviews}
            userId={userMetaData?.userId}
            onClick={WriteReview}
          />
        ) : (
          <StyledButton onClick={WriteReview}>Написать отзыв</StyledButton>
        )}
        <ReviewList reviews={userMetaData?.reviews} />
      </ReviewsBlock>
    </Container>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
