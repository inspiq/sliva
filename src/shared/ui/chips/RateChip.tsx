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
  setCurrentRating?: React.Dispatch<React.SetStateAction<number>>;
  dis?: true;
}

const RateChip = (props: Props): ReactElement => {
  const { currentRating, setCurrentRating } = props;
  const { dis } = props;
  const [hover, setHover] = useState(0);

  const handleMouseOver = (index: number) => {
    if (!dis) {
      setHover(index);
    }
  };

  const handleClick = (index: number) => {
    if (!dis && setCurrentRating) {
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
            disabled={dis}
            {...props}
          />
          <StarIcon
            color={((hover || currentRating) ?? 0) >= index ? 'orange' : 'gray'}
            key={index}
            onMouseOver={() => handleMouseOver(index)}
          />
        </label>
      ))}
    </Container>
  );
};

export const Rate = RateChip;
