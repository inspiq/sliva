import { ChangeEvent, memo, ReactElement } from 'react';
import styled from 'styled-components';

import { type Option, UiInput, useToggle } from 'src/shared';
import { CheckMarkIcon } from 'src/shared/icons/CheckMarkIcon';

const CheckboxInput = styled.input`
  opacity: 0;
  position: absolute;
  appearance: none;
  align-self: start;
  background-color: ${({ checked, theme }) =>
    checked ? theme.primary : 'transparent'};

  &:checked + div {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Subcategory = styled.label`
  display: flex;
  gap: 3px;
`;

const CheckBoxLayout = styled.div`
  align-self: start;
  position: relative;
  height: 15px;
  width: 15px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 4px;
`;

interface Props {
  onChange: (subcategory: Option, isChecked: boolean) => void;
  subcategory: Option;
}

const SubcategoryCardElement = (props: Props): ReactElement => {
  const { onChange, subcategory } = props;
  const { visible, toggle } = useToggle();

  const onCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    onChange(subcategory, target.checked);
    toggle();
  };

  return (
    <div key={subcategory.value}>
      <UiInput
        type="checkbox"
        checked={visible}
        onChange={onCheck}
        Icon={<CheckMarkIcon visible={visible} />}
      >
        {subcategory.label}
      </UiInput>
    </div>
  );
};

export const SubcategoryCard = memo(SubcategoryCardElement);
