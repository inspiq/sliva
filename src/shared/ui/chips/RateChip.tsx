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
  currentRating: number;
  setCurrentRating?: React.Dispatch<React.SetStateAction<number>>;
  isDisabled?: true;
}

const RateChip = (props: Props): ReactElement => {
  const { currentRating, setCurrentRating } = props;
  const { isDisabled } = props;
  const [hover, setHover] = useState(0);

  const handleMouseOver = (index: number) => {
    if (!isDisabled) {
      setHover(index);
    }
  };

  const handleClick = (index: number) => {
    if (!isDisabled && setCurrentRating) {
      setCurrentRating(index);
    }
  };

  return (
    <Container>
      {[...Array(5)].map((_, index) => (
        <label key={index}>
          <Star
            type="radio"
            value={index}
            onClick={() => handleClick(index)}
            disabled={isDisabled}
            {...props}
          />
          <StarIcon
            color={(hover || currentRating) >= index ? 'orange' : 'gray'}
            key={index}
            onMouseOver={() => handleMouseOver(index)}
          />
        </label>
      ))}
    </Container>
  );
};

export const Rate = RateChip;
