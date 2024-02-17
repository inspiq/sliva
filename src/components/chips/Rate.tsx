import React, { InputHTMLAttributes, ReactElement, useState } from 'react';
import styled from 'styled-components';

import { StarIcon } from 'src/shared';

const Container = styled.div`
  display: flex;
`;
const StarInput = styled.input`
  display: none;
`;

interface RateProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
  disabled?: boolean;
  title?: string;
  hover?: boolean;
  currentRating?: number;
}

const StartRate = (props: RateProps): ReactElement => {
  const { ...rest } = props;
  const [hover, setHover] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const handleMouseOver = (index: number) => {
    setHover(index + 1);
  };

  const handleClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <Container>
      {[...Array(5)].map((star, index) => {
        const currentrating = index + 1;

        return (
          // eslint-disable-next-line react/jsx-key
          <label>
            <StarInput
              type="radio"
              value={currentrating}
              onClick={() => handleClick(index)}
              {...rest}
            />
            <StarIcon
              color={(hover || rating) >= currentrating ? 'orange' : 'gray'}
              key={index}
              onMouseOver={() => handleMouseOver(index)}
            />
          </label>
        );
      })}
    </Container>
  );
};
export const UiRate = StartRate;
