import { memo, type ReactElement } from 'react';

import { SubcategoriesPanel } from 'src/modules/specialists/filters_panel/subcategories_panel/SubcategoriesPanel';
import { Accordion } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

interface Props {
  category: ValueLabelPair;
  subcategories?: ValueLabelPair[];
  isOpen: boolean;
  onChangeCategoriesFilter(isOpen: boolean): void;
  onChangeSubcategoriesFilter({
    subcategory,
    isChecked,
  }: {
    subcategory: ValueLabelPair;
    isChecked: boolean;
  }): void;
  onCurrentOpenAccordionIdToggle(): void;
}

const FilterCardElement = (props: Props): ReactElement => {
  const {
    category,
    subcategories,
    isOpen,
    onChangeCategoriesFilter,
    onChangeSubcategoriesFilter,
    onCurrentOpenAccordionIdToggle,
  } = props;

  return (
    <Accordion
      title={category.label}
      id={category.label}
      isOpen={isOpen}
      onChange={() => {
        onChangeCategoriesFilter(!isOpen);
        onCurrentOpenAccordionIdToggle();
      }}
    >
      <SubcategoriesPanel
        subcategories={subcategories}
        onChange={onChangeSubcategoriesFilter}
      />
    </Accordion>
  );
};

export const FilterCard = memo(FilterCardElement);
