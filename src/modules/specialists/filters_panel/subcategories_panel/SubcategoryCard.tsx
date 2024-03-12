import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { type Option } from 'src/shared';

const Subcategory = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3px;
`;

const Title = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

interface Props {
  onChange: (subcategory: Option, isChecked: boolean) => void;
  subcategory: Option;
}

const SubcategoryCardElement = (props: Props): ReactElement => {
  const { onChange, subcategory } = props;

  return (
    <Subcategory key={subcategory.value}>
      <input
        type="checkbox"
        id={subcategory.label}
        onChange={(e) => onChange(subcategory, e.target.checked)}
      />
      <Title htmlFor={subcategory.label}>{subcategory.label}</Title>
    </Subcategory>
  );
};

export const SubcategoryCard = memo(SubcategoryCardElement);
