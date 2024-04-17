import { memo, type ReactElement } from 'react';

import { SubcategoriesPanel } from 'src/modules/specialists/filters_panel/subcategories_panel/SubcategoriesPanel';
import { Accordion } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

interface Props {
  category: ValueLabelPair;
  subcategories?: ValueLabelPair[];
  isOpen: boolean;
  onToggle: () => void;
  onChangeCategoriesFilter(isOpen: boolean): void;
  onChangeSubcategoriesFilter({
    subcategory,
    isChecked,
  }: {
    subcategory: ValueLabelPair;
    isChecked: boolean;
  }): void;
}

const FilterCardElement = (props: Props): ReactElement => {
  const {
    category,
    subcategories,
    isOpen,
    onToggle,
    onChangeCategoriesFilter,
    onChangeSubcategoriesFilter,
  } = props;

  return (
    <Accordion
      title={category.label}
      id={category.label}
      isOpen={isOpen}
      onChange={() => onChangeCategoriesFilter(isOpen)}
      onToggle={onToggle}
    >
      <SubcategoriesPanel
        subcategories={subcategories}
        onChange={onChangeSubcategoriesFilter}
      />
    </Accordion>
  );
};

export const Filter = memo(FilterCardElement);
