import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { CheckMarkIcon, UiInput } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

const Subcategory = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const Title = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

interface Props {
  onChange: (subcategory: ValueLabelPair, isChecked: boolean) => void;
  subcategory: ValueLabelPair;
}

const SubcategoryCardElement = (props: Props): ReactElement => {
  const { onChange, subcategory } = props;

  return (
    <Subcategory key={subcategory.value}>
      <UiInput
        type="checkbox"
        id={subcategory.label}
        onChange={(e) => onChange(subcategory, e.target.checked)}
        Icon={<CheckMarkIcon />}
      />
      <Title htmlFor={subcategory.label}>{subcategory.label}</Title>
    </Subcategory>
  );
};

export const SubcategoryCard = memo(SubcategoryCardElement);
