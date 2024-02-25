import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { Rev } from 'src/components/specialists/account/SpecialistAccount';
import { db, Specialist } from 'src/shared';

interface Values {
  specialistReview: Rev | null;
  currentSpecialistUser: Specialist | null;
  setCurrentSpecialistUser: Dispatch<SetStateAction<Specialist | null>>;
}

const initialValues: Values = {
  specialistReview: null,
  currentSpecialistUser: null,
  setCurrentSpecialistUser: () => undefined,
};

export const ReviewContext = createContext(initialValues);

export const SpecialistReviewContextProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [currentSpecialistUser, setCurrentSpecialistUser] =
    useState<Specialist | null>(null);
  const [specialistReview, setSpecialitReview] = useState<Rev | null>(null);

  useEffect(() => {
    const getSpecialistReviews = async () => {
      if (!currentSpecialistUser) return;

      try {
        const docRef = doc(db, 'reviews', currentSpecialistUser?.userId);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const reviewData = snapshot.data() as Rev;
          setSpecialitReview(reviewData);
        }
      } catch (e) {
        /* обработка ошибок */
      }
    };

    getSpecialistReviews();
  }, [currentSpecialistUser]);

  const contextValues = {
    specialistReview: specialistReview ? { ...specialistReview } : null,
    setCurrentSpecialistUser,
    currentSpecialistUser,
  };

  return (
    <ReviewContext.Provider value={contextValues}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useSpecialistReviewContext = () => useContext(ReviewContext);
