import React, { InputHTMLAttributes, ReactElement, useState } from 'react';
import styled from 'styled-components';

import { StarIcon } from 'src/shared';

const Container = styled.div`
  display: flex;
`;

const Star = styled.input`
  display: none;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: JSX.Element;
  title?: string;
  hover?: boolean;
  currentRating?: number;
}

const RateChip = (props: Props): ReactElement => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const handleMouseOver = (index: number) => {
    setHover(index);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  return (
    <Container>
      {[...Array(5)].map((_, index) => (
        <label key={index}>
          <Star
            type="radio"
            value={index}
            onClick={() => handleClick(index)}
            {...props}
          />
          <StarIcon
            color={(hover || rating) >= index ? 'orange' : 'gray'}
            key={index}
            onMouseOver={() => handleMouseOver(index)}
          />
        </label>
      ))}
    </Container>
  );
};

export const Rate = RateChip;
