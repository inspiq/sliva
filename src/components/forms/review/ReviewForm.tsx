import React, { FormEvent, ReactElement, useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';

import { Props as ReviewsType } from 'src/components/Feedback';
import { db } from 'src/shared';

interface Props {
  userId?: string;
  reviews?: ReviewsType[];
}

const ReviewFormElement = (props: Props): ReactElement => {
  const { userId, reviews } = props;
  console.log(userId);
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const newReview: ReviewsType = {
    reveiwId: '',
    name: 'Имя пользователя',
    date: new Date().toISOString(),
    description: text,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Click');

    try {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userId);
      await setDoc(userDocRef, {
        reviews: [...(reviews || []), newReview],
      });
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Введите отзыв"
        required
      />
      <button type="submit">Отправить отзыв</button>
    </form>
  );
};

export const ReviewForm = ReviewFormElement;
