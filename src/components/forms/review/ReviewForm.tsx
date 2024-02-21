import React, {
  FormEvent,
  ReactElement,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Props as ReviewsType } from 'src/components/Review';
import { useAuthContext } from 'src/context/AuthContext';
import { Client, db, Rate } from 'src/shared';

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

export const StyledButton = styled.button`
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

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  userId?: string;
  text?: string;
  reviews?: ReviewsType[];
  onClick?: () => void;
}

const ReviewFormElement = (props: Props): ReactElement => {
  const { userId, onClick, reviews, ...rest } = props;
  const [text, setText] = useState('');
  const [currentRating, setCurrentRating] = useState(0);
  const { currentUser } = useAuthContext();
  const [userMetaData, setUserMetaData] = useState<Client>();
  console.log(userMetaData);
  const getClient = useCallback(async () => {
    try {
      const docRef = doc(db, 'users', currentUser?.uid || '');
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        setUserMetaData(snapshot.data() as Client);
      }
    } catch {
      /* empty */
    }
  }, [currentUser?.uid]);

  useEffect(() => {
    getClient();
  }, [getClient]);

  const newReview: ReviewsType = {
    reveiwId: uuidv4(),
    userId: currentUser?.uid,
    name: userMetaData?.name,
    lastName: userMetaData?.lastName,
    date: new Date().toISOString(),
    description: text,
    rating: currentRating,
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

      if (onClick) {
        onClick();
      }
    } catch (error) {
      console.error('Ошибка при отправке отзыва:', error);
    }
  };

  return (
    <MainLayout onSubmit={onSubmit}>
      <HeadContent>
        <Head>Оставьте отзыв</Head>
        <Rate
          setCurrentRating={setCurrentRating}
          currentRating={currentRating}
        />
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
