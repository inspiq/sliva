import React, {
  FormEvent,
  ReactElement,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

import { Props as ReviewsType } from 'src/components/Feedback';
import { db, UiForm } from 'src/shared';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  userId?: string;
  text?: string;

  reviews?: ReviewsType[];
}

const ReviewFormElement = (props: Props): ReactElement => {
  const { userId, reviews, ...rest } = props;
  const [text, setText] = useState('');
  const newReview: ReviewsType = {
    reveiwId: uuidv4(),
    name: 'Имя пользователя',
    date: new Date().toISOString(),
    description: text,
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Click');

    try {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userId);
      await updateDoc(userDocRef, {
        reviews: [...(reviews || []), newReview],
      });
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };

  return (
    <UiForm onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Введите отзыв"
        {...rest}
      />
      <button type="submit">Отправить отзыв</button>
    </UiForm>
  );
};

export const ReviewForm = ReviewFormElement;
