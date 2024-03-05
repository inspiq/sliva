import {
  Dispatch,
  InputHTMLAttributes,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';
import styled, { useTheme } from 'styled-components';

import { StarIcon } from 'src/shared';

const Container = styled.div`
  display: flex;
`;

const Star = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  selectedRating: number;
  setSelectedRating?: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
}

const RateChipElement = (props: Props): ReactElement => {
  const { selectedRating, setSelectedRating, isDisabled = false } = props;

  const [hover, setHover] = useState(0);
  const { border, yellow } = useTheme();

  const onChangeRating = (value: number) => {
    if (isDisabled) return;

    setSelectedRating?.(value);
  };

  const onChangeHover = (value: number) => {
    if (isDisabled) return;

    setHover(value);
  };

  return (
    <Container>
      {[...Array(5)].fill(0).map((_, index) => {
        const starValue = index + 1;

        return (
          <Star key={index}>
            <input
              type="radio"
              value={index}
              onClick={() => onChangeRating(starValue)}
              hidden
              {...props}
            />
            <StarIcon
              color={(hover || selectedRating) >= starValue ? yellow : border}
              onMouseOver={() => onChangeHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          </Star>
        );
      })}
    </Container>
  );
};

export const RateChip = RateChipElement;
