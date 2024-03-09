import {
  ChangeEvent,
  Dispatch,
  memo,
  ReactElement,
  SetStateAction,
  useMemo,
} from 'react';
import styled from 'styled-components';

import { SpecialistFilter } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { Accordion, Option } from 'src/shared';

const Subcategory = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3px;
`;

const Title = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

const FilterCardElement = (props: {
  category: Option;
  subcategories?: Option[];
  setSelectedFilters: Dispatch<SetStateAction<SpecialistFilter[]>>;
}): ReactElement => {
  const { category, subcategories, setSelectedFilters } = props;

  const onChangeCategoriesFilter = useMemo(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      setSelectedFilters((prev) => {
        if (!isChecked) {
          return prev.filter(
            ({ category: categoryItem }) =>
              categoryItem.value !== category.value,
          );
        }

        if (isChecked) {
          return [...prev, { category, subcategories: [] }];
        }

        return prev;
      });
    },
    [category, setSelectedFilters],
  );

  const onChangeSubcategoriesFilter = useMemo(
    () => (subcategory: Option, isChecked: boolean) => {
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
      onChange={onChangeCategoriesFilter}
    >
      {subcategories?.map((subcategory) => (
        <Subcategory key={subcategory.value}>
          <input
            type="checkbox"
            id={subcategory.label}
            onChange={(e) =>
              onChangeSubcategoriesFilter(subcategory, e.target.checked)
            }
          />
          <Title htmlFor={subcategory.label}>{subcategory.label}</Title>
        </Subcategory>
      ))}
    </Accordion>
  );
};

export const Filter = memo(FilterCardElement);
