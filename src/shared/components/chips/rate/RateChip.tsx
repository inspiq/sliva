import { type ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import styled, { useTheme } from 'styled-components';

import { StarIcon, useLocalVm } from 'src/shared';
import {
  type Props,
  RateChipVm,
} from 'src/shared/components/chips/rate/RateChipVm';

const Container = styled.div`
  display: flex;
`;

const Star = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RateChipElement = (props: Props): ReactElement => {
  const { selectedRating, setSelectedRating, ...rest } = props;
  const vm = useLocalVm(RateChipVm, {
    setSelectedRating,
    disabled: rest.disabled,
  });
  const { light_grey, yellow } = useTheme();

  return (
    <Container>
      {[...Array(5)].fill(0).map((_, index) => {
        const starValue = index + 1;

        return (
          <Star key={index}>
            <input
              type="radio"
              onClick={() => vm.onChangeSelectedRating(starValue)}
              hidden
              {...rest}
            />
            <StarIcon
              onMouseOver={() => vm.onChangeHoveredStar(starValue)}
              onMouseLeave={() => vm.onChangeHoveredStar(0)}
              color={
                (vm.hoveredStar || selectedRating) >= starValue
                  ? yellow
                  : light_grey
              }
            />
          </Star>
        );
      })}
    </Container>
  );
};

export const RateChip = observer(RateChipElement);
