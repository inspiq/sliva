import {
  ChangeEvent,
  FormEvent,
  ReactElement,
  TextareaHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Review } from 'src/components/specialists/profile/account/SpecialistProfile';
import { useAuthContext } from 'src/context/AuthContext';
import { db, Rate, Specialist } from 'src/shared';

const MainLayout = styled.form`
  max-width: 800px;
  min-height: 150px;
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  padding: 10px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 16px;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
    font-weight: ${({ theme }) => theme.w400};
  }

  &:hover {
    border-color: ${({ theme }) => theme.input.active};
  }

  &:focus {
    border-color: ${({ theme }) => theme.input.active};
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  align-self: flex-end;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  specialist: Specialist;
  reviews?: Review[];
}

const ReviewFormElement = (props: Props): ReactElement => {
  const { specialist, reviews } = props;
  console.log(specialist.userId);
  const [value, setValue] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const { currentAuthUser } = useAuthContext();

  const totalRating = reviews
    ? reviews.reduce((sum, item) => sum + item.rating, 0)
    : 0;

  const sortedReviews = useMemo(() => {
    const sortedReviews = reviews?.sort((a, b) => {
      if (!a.date || !b.date) {
        return 0;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return sortedReviews;
  }, [reviews]);

  const newReview: Review = {
    avatar: currentAuthUser?.additionalInfo?.avatarUrl,
    reveiwId: uuidv4(),
    date: new Date().toISOString(),
    description: value,
    rating: currentRating,
    firstName: currentAuthUser?.additionalInfo?.firstName,
    lastName: currentAuthUser?.additionalInfo?.lastName,
    userId: currentAuthUser?.additionalInfo?.userId,
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValue(value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedReviews = sortedReviews
      ? [newReview, ...sortedReviews]
      : [newReview];

    try {
      const usersCollection = collection(db, 'users');
      const userDoc = doc(usersCollection, specialist?.userId);

      if (reviews) {
        const newRating = (
          (totalRating + currentRating) / (reviews.length + 1) +
          1
        ).toFixed(1);
        await updateDoc(userDoc, {
          reviewDetails: {
            avgRating: newRating,
            count: updatedReviews?.length,
          },
        });
      }

      const reviewsCollection = collection(db, 'reviews');
      const userDocRef = doc(reviewsCollection, specialist.userId);

      await setDoc(userDocRef, {
        reviews: updatedReviews || [],
      });
    } catch (e) {
      /* empty */
    }
  };

  return (
    <MainLayout onSubmit={onSubmit}>
      <Content>
        <div>Оставьте отзыв</div>
        <Rate
          setCurrentRating={setCurrentRating}
          currentRating={currentRating}
        />
      </Content>
      <Textarea
        value={value}
        onChange={handleChange}
        placeholder="Введите отзыв"
        {...props}
      />
      <Button type="submit">Отправить отзыв</Button>
    </MainLayout>
  );
};

export const ReviewForm = ReviewFormElement;
