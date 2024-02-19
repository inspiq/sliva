import { ReactElement, useCallback, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { string } from 'yup';

import { UIFeedback } from 'src/components';
import { ReviewForm } from 'src/components/forms/review/ReviewForm';
import { db, Specialist } from 'src/shared';

interface Props {
  specialistId: string;
}

const SpecialistAccountElement = (props: Props): ReactElement => {
  const { specialistId } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userMetaData, setUserMetaData] = useState<Specialist>();
  const [text, setText] = useState('');
  console.log(userMetaData);
  console.log(userMetaData?.reviews);

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

  return (
    <>
      <div>Specialist</div>
      {userMetaData?.reviews.map((feedback) => (
        <UIFeedback
          name={feedback.name}
          date={feedback.date}
          description={feedback.description}
          key={feedback.reveiwId}
        />
      ))}
      <ReviewForm
        userId={userMetaData?.userId}
        reviews={userMetaData?.reviews}
      />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
