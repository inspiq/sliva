import React, {
  FormEvent,
  ReactElement,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { collection, doc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Props as ReviewsType } from 'src/components/Feedback';
import { db, Rate } from 'src/shared';

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
const Head = styled.div``;
const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-size: 16px;
  resize: none;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  align-self: flex-end;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.primaryDark};
  }
`;
const HeadContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FormHeader = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  width: 100%;
  text-align: center;
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w600};
  color: ${({ theme }) => theme.primary};
`;

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
        reviews: [newReview, ...(reviews || [])],
      });
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };

  return (
    <MainLayout onSubmit={onSubmit}>
      <HeadContent>
        <Head>Оставьте отзыв</Head>
        <Rate />
      </HeadContent>
      <StyledTextarea
        value={text}
        onChange={handleChange}
        placeholder="Введите отзыв"
        {...rest}
      />
      <StyledButton type="submit">Отправить отзыв</StyledButton>
    </MainLayout>
  );
};

export const ReviewForm = ReviewFormElement;
