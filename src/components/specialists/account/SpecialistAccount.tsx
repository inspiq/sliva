import {
  FormEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { UIFeedback } from 'src/components';
import { Props as ReviewsType } from 'src/components/Feedback';
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const newReview: ReviewsType = {
    reveiwId: '',
    name: 'Имя пользователя',
    date: new Date().toISOString(),
    description: text,
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Click');

    try {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userMetaData?.userId);
      await setDoc(userDocRef, {
        reviews: [...(userMetaData?.reviews || []), newReview],
      });
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
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
      <ReviewForm onChange={handleChange} onSubmit={onSubmit} />
    </>
  );
};

export const SpecialistAccount = SpecialistAccountElement;
