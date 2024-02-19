import { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import { ReviewsItem } from 'src/components/Feedback';
import { ReviewForm } from 'src/components/forms/review/ReviewForm';
import { db, Specialist } from 'src/shared';

interface Props {
  specialistId: string;
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const [load, setLoad] = useState(false);
  console.log(userMetaData);

  const getSpecialist = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', specialistId);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Specialist);
      }
      setLoad(false);
    } catch {
      /* empty */
    }
  }, [specialistId]);

  useEffect(() => {
    getSpecialist();
  }, [getSpecialist, load]);

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
    <>
      <div>Specialist</div>
      {userMetaData?.reviews?.map((feedback) => (
        <ReviewsItem
          name={feedback.name}
          date={feedback.date}
          description={feedback.description}
          key={userMetaData.userId}
        />
      ))}
      <ReviewForm
        reviews={userMetaData?.reviews}
        userId={userMetaData?.userId}
      />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
