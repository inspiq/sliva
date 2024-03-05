import { ReactElement, TextareaHTMLAttributes, useMemo, useState } from 'react';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useAuthContext } from 'src/context/AuthContext';
import { Review } from 'src/modules/specialist_profile/SpecialistProfile';
import { db, RateChip, Specialist, UiButton, UiForm } from 'src/shared';

const MainLayout = styled(UiForm)`
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  padding: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 125px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s;
  color: ${({ theme }) => theme.secondary};

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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.secondary};
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  specialist: Specialist;
  reviews?: Review[];
}

const SpecialistReviewFormElement = (props: Props): ReactElement => {
  const { specialist, reviews } = props;

  const [currentRating, setCurrentRating] = useState(0);
  const { currentAuthUser } = useAuthContext();

  const totalRating = reviews?.length
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

  const { handleSubmit, handleChange, values, isSubmitting, resetForm } =
    useFormik({
      initialValues: {
        text: '',
      },
      validateOnMount: true,
      onSubmit: async ({ text }) => {
        if (!text || !currentRating) return;

        const newReview = {
          reviewId: uuidv4(),
          date: new Date().toISOString(),
          text,
          rating: currentRating,
          userInfo: currentAuthUser?.additionalInfo,
        };

        const updatedReviews = sortedReviews
          ? [newReview, ...sortedReviews]
          : [newReview];

        try {
          const usersCollection = collection(db, 'users');
          const userDoc = doc(usersCollection, specialist?.userId);
          const newRating = (
            (totalRating + currentRating) /
            ((reviews?.length ?? 0) + 1)
          ).toFixed(1);

          await updateDoc(userDoc, {
            reviewDetails: {
              avgRating: newRating,
              count: updatedReviews?.length,
            },
          });

          const reviewsCollection = collection(db, 'reviews');
          const userDocRef = doc(reviewsCollection, specialist.userId);

          await setDoc(userDocRef, {
            reviews: updatedReviews ?? [],
          });

          resetForm();
        } catch (e) {
          /* empty */
        }
      },
    });

  return (
    <MainLayout onSubmit={handleSubmit}>
      <Header>
        <Title>Оставьте отзыв о специалисте</Title>
        <RateChip
          setSelectedRating={setCurrentRating}
          selectedRating={currentRating}
        />
      </Header>
      <Textarea
        name="text"
        value={values.text}
        onChange={handleChange}
        placeholder="Отзыв"
        {...props}
      />
      <ButtonLayout>
        <UiButton
          type="submit"
          isSubmitting={isSubmitting}
          isStretching={false}
          disabled={isSubmitting || !currentRating}
        >
          Оставить отзыв
        </UiButton>
      </ButtonLayout>
    </MainLayout>
  );
};

export const SpecialistReviewForm = SpecialistReviewFormElement;
