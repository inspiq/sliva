import { Dispatch, ReactElement, SetStateAction } from 'react';
import styled from 'styled-components';

import { Filter } from 'src/components/specialists/specialist_filters/Filter';
import { devices } from 'src/shared';

const MainLayout = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);

  @media ${devices.mobileL} {
    height: 100%;
  }
`;

const FiltersElement = (props: {
  setSelectedFilters: Dispatch<
    SetStateAction<{ header: string; subcategories: string[] }[]>
  >;
}): ReactElement => {
  const FILTERS = [
    {
      category: {
        value: 'all_specialists',
        label: 'Все специалисты',
      },
    },
    {
      category: {
        value: 'repair_and_construction',
        label: 'Ремонт и строительство',
      },
      subcategories: [{ value: 'laborer', label: 'Разнорабочий' }],
    },
    {
      category: {
        value: 'auto_services',
        label: 'Авто услуги',
      },
      subcategories: [{ value: 'plumber', label: 'Сантехник' }],
    },
  ];

  return (
    <MainLayout>
      {FILTERS.map(({ category, subcategories }) => (
        <Filter
          header={category}
          subcategories={subcategories}
          setSelectedFilters={props.setSelectedFilters}
          key={category.value}
        />
      ))}
    </MainLayout>
  );
};

export const Filters = FiltersElement;
