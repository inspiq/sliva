import {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useMemo,
} from 'react';
import styled from 'styled-components';

import { Option, UiAccordion } from 'src/shared';

const Subcategory = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Title = styled.label`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
`;

const FilterElement = (props: {
  header: Option;
  subcategories?: Option[];
  setSelectedFilters: Dispatch<
    SetStateAction<{ header: string; subcategories: string[] }[]>
  >;
}): ReactElement => {
  const { header, subcategories, setSelectedFilters } = props;

  const onChangeCategoriesFilter = useMemo(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      setSelectedFilters((prev) => {
        const isCategorySelected = prev.some(
          (item) => item.header === header.value,
        );

        if (isCategorySelected && !isChecked) {
          return prev.filter((item) => item.header != header.value);
        }

        if (!isCategorySelected && isChecked) {
          return [...prev, { header: header.value, subcategories: [] }];
        }

        return prev;
      });
    },
    [header, setSelectedFilters],
  );

  const onChangeSubcategoriesFilter = useMemo(
    () => (subcategory: string, isChecked: boolean) => {
      setSelectedFilters((prev) => {
        const copy = [...prev];
        const findCategoryIdx = copy.findIndex(
          (item) => item.header === header.value,
        );
        const findSubcategoryIdx = copy?.[
          findCategoryIdx
        ]?.subcategories.findIndex((item) => item == subcategory);

        if (findCategoryIdx != -1 && findSubcategoryIdx == -1 && isChecked) {
          copy[findCategoryIdx].subcategories = [
            ...copy[findCategoryIdx].subcategories,
            subcategory,
          ];

          return copy;
        }

        if (findCategoryIdx != -1 && findSubcategoryIdx != -1 && !isChecked) {
          copy[findCategoryIdx].subcategories = [
            ...copy[findCategoryIdx].subcategories.filter(
              (item) => item != subcategory,
            ),
          ];

          return copy;
        }

        return prev;
      });
    },
    [header, setSelectedFilters],
  );

  return (
    <UiAccordion
      title={header.label}
      id={header.label}
      onChange={onChangeCategoriesFilter}
      isDisabled={header.value === 'all_specialists'}
    >
      {subcategories?.map((subcategory) => (
        <Subcategory key={subcategory.value}>
          <input
            type="checkbox"
            id={subcategory.label}
            onChange={(e) =>
              onChangeSubcategoriesFilter(subcategory.value, e.target.checked)
            }
          />
          <Title htmlFor={subcategory.label}>{subcategory.label}</Title>
        </Subcategory>
      ))}
    </UiAccordion>
  );
};

export const Filter = FilterElement;
