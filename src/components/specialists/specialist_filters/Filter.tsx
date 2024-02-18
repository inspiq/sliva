import { Dispatch, ReactElement, SetStateAction, useMemo } from 'react';
import { AccordionItem } from '@szhsin/react-accordion';
import styled from 'styled-components';

import { ArrowIcon } from 'src/shared';

const Subcategory = styled.div`
  display: flex;
`;

const FilterElement = (props: {
  header: string;
  subcategories?: string[];
  setSelectedFilters: Dispatch<
    SetStateAction<{ header: string; subcategories: string[] }[]>
  >;
}): ReactElement => {
  const { header, subcategories, setSelectedFilters, ...rest } = props;

  const onChangeCategoriesFilter = useMemo(
    () => () => {
      setSelectedFilters((prev) => {
        const isCategorySelected = prev.some((item) => item.header === header);

        if (isCategorySelected) {
          return prev.filter((item) => item.header != header);
        }

        //if (!isCategorySelected && visible) {
        //  return [...prev, { header, subcategories: [] }];
        //}

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
          (item) => item.header === header,
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
    <AccordionItem
      onClick={onChangeCategoriesFilter}
      header={
        <>
          {header}
          <ArrowIcon className="chevron-down" width={12} />
        </>
      }
      {...rest}
    >
      {subcategories?.map((subcategory) => (
        <Subcategory key={subcategory}>
          <input
            type="checkbox"
            id={subcategory}
            onChange={(e) =>
              onChangeSubcategoriesFilter(subcategory, e.target.checked)
            }
          />
          <label htmlFor={subcategory}>{subcategory}</label>
        </Subcategory>
      ))}
    </AccordionItem>
  );
};

export const Filter = FilterElement;
