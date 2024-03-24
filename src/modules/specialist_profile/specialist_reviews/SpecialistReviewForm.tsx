import {
  ReactElement,
  TextareaHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { useAuthContext } from 'src/context/AuthContext';
import { Review } from 'src/modules/specialist_profile/SpecialistProfile';
import {
  add24HoursToDate,
  BlockOverlay,
  db,
  DEFAULT_AVG_RATING,
  RateChip,
  Specialist,
  UiButton,
  UiForm,
} from 'src/shared';

const StyledUiForm = styled(UiForm)`
  box-shadow: 0px 5px 30px ${({ theme }) => theme.shadow};
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
  position: relative;
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
  specialist?: Specialist;
  reviews?: Review[];
  isLoading?: boolean;
}

const SpecialistReviewFormElement = (props: Props): ReactElement => {
  const { specialist, reviews } = props;

  const [isBlockReview, setIsBlockReview] = useState(false);
  const [currentRating, setCurrentRating] = useState(DEFAULT_AVG_RATING);
  const { currentAuthUser } = useAuthContext();
  const t = useTranslations();
  const totalRating = reviews?.length
    ? reviews.reduce((sum, item) => sum + item.rating, DEFAULT_AVG_RATING)
    : DEFAULT_AVG_RATING;

  const sortedReviews = useMemo(
    () =>
      reviews?.sort((a, b) => {
        if (!a.date || !b.date) {
          return 0;
        }

        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    [reviews],
  );

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
          rating: currentRating,
          text,
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
          const userDocRef = doc(reviewsCollection, specialist?.userId);

          await setDoc(userDocRef, {
            reviews: updatedReviews ?? [],
          });

          resetForm();
        } catch (e) {
          /* empty */
        }
      },
    });

  useEffect(() => {
    const q = collection(db, 'reviews');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((item) => {
        (item.data().reviews as Review[]).forEach((review) => {
          if (
            review.userInfo.userId === currentAuthUser?.uid &&
            new Date() < add24HoursToDate(review.date)
          ) {
            setIsBlockReview(true);
          }
        });
      });
    });

    return () => {
      unsubscribe();
    };
  }, [currentAuthUser?.uid]);

  const isDisabled =
    isSubmitting || !currentRating || !values.text || isBlockReview;

  return (
    <StyledUiForm onSubmit={handleSubmit}>
      <Header>
        <Title>{t('SpecialistCard.reviews_form.title')}</Title>
        <RateChip
          setSelectedRating={setCurrentRating}
          selectedRating={currentRating}
        />
      </Header>
      <Textarea
        name="text"
        value={values.text}
        onChange={handleChange}
        placeholder={t('SpecialistCard.reviews_form.textarea.placeholder')}
        {...props}
      />
      <ButtonLayout>
        <UiButton
          type="submit"
          isSubmitting={isSubmitting}
          isStretching={false}
          disabled={isDisabled}
        >
          {isBlockReview
            ? t('SpecialistCard.reviews_form.button.title_block')
            : t('SpecialistCard.reviews_form.button.title')}
        </UiButton>
      </ButtonLayout>
      <BlockOverlay
        title={
          currentAuthUser?.uid === specialist?.userId
            ? t('block.titles.self_review_disallowed')
            : t('block.titles.only_replies_allowed')
        }
        isLinkVisible={false}
        paddingTop={75}
      />
    </StyledUiForm>
  );
};

export const SpecialistReviewForm = SpecialistReviewFormElement;
