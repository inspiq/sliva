import { Dispatch, memo, ReactElement, SetStateAction, useMemo } from 'react';

import { SubcategoriesPanel } from 'src/modules/specialists/filters_panel/subcategories_panel/SubcategoriesPanel';
import { SpecialistFilter } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { Accordion } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

interface Props {
  category: ValueLabelPair;
  subcategories?: ValueLabelPair[];
  isOpen: boolean;
  setSelectedFilters: Dispatch<SetStateAction<SpecialistFilter[]>>;
  onToggle: () => void;
}

const FilterCardElement = (props: Props): ReactElement => {
  const { category, subcategories, isOpen, setSelectedFilters, onToggle } =
    props;

  const onChangeCategoriesFilter = useMemo(
    () => () => {
      setSelectedFilters((prev) => {
        if (!isOpen) {
          return prev.filter(
            ({ category: categoryItem }) =>
              categoryItem.value !== category.value,
          );
        }

        if (isOpen) {
          return [{ category, subcategories: [] }];
        }

        return prev;
      });
    },
    [category, isOpen, setSelectedFilters],
  );

  const onChangeSubcategoriesFilter = useMemo(
    () => (subcategory: ValueLabelPair, isChecked: boolean) => {
      setSelectedFilters((prev) => {
        const copyArr = [...prev];
        const findCategoryIdx = copyArr.findIndex(
          ({ category: categoryItem }) => categoryItem.value === category.value,
        );

        if (findCategoryIdx !== -1 && isChecked) {
          copyArr[findCategoryIdx].subcategories = [
            ...copyArr[findCategoryIdx].subcategories,
            subcategory,
          ];

          return copyArr;
        }

        if (findCategoryIdx !== -1 && !isChecked) {
          copyArr[findCategoryIdx].subcategories = [
            ...copyArr[findCategoryIdx].subcategories.filter(
              ({ value }) => value !== subcategory.value,
            ),
          ];

          return copyArr;
        }

        return prev;
      });
    },
    [category.value, setSelectedFilters],
  );

  return (
    <Accordion
      title={category.label}
      id={category.label}
      isOpen={isOpen}
      onChange={onChangeCategoriesFilter}
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
