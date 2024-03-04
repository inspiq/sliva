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
  header: Option;
  subcategories?: Option[];
  setSelectedFilters: Dispatch<SetStateAction<SpecialistFilter[]>>;
}): ReactElement => {
  const { header, subcategories, setSelectedFilters } = props;

  const onChangeCategoriesFilter = useMemo(
    () => (e: ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      setSelectedFilters((prev) => {
        if (!isChecked) {
          return prev.filter((item) => item.header !== header.value);
        }

        if (isChecked) {
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

        if (findCategoryIdx != -1 && isChecked) {
          copy[findCategoryIdx].subcategories = [
            ...copy[findCategoryIdx].subcategories,
            subcategory,
          ];

          return copy;
        }

        if (findCategoryIdx != -1 && !isChecked) {
          copy[findCategoryIdx].subcategories = [
            ...copy[findCategoryIdx].subcategories.filter(
              (item) => item !== subcategory,
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
    <Accordion
      title={header.label}
      id={header.label}
      onChange={onChangeCategoriesFilter}
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
    </Accordion>
  );
};

export const Filter = memo(FilterCardElement);
