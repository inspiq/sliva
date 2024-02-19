import React, { ChangeEvent, FormEventHandler, ReactElement } from 'react';

import { Props as ReviewsType } from 'src/components/Feedback';

interface Props {
  userId?: string;
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
  reviews?: ReviewsType[];
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReviewFormElement = (props: Props): ReactElement => {
  const { text, onChange, onSubmit } = props;

  return (
    <form onSubmit={onSubmit}>
      <textarea
        value={text}
        onChange={onChange}
        placeholder="Введите отзыв"
        required
      />
      <button type="submit">Отправить отзыв</button>
    </form>
  );
};

export const ReviewForm = ReviewFormElement;
