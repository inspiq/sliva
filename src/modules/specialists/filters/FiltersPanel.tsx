import { Dispatch, memo, ReactElement, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Filter } from 'src/modules/specialists/filters/FilterCard';
import { SpecialistFilter } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { devices, getSpecialistFilters } from 'src/shared';

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

const FiltersPanelElement = memo(
  (props: {
    setSelectedFilters: Dispatch<SetStateAction<SpecialistFilter[]>>;
  }): ReactElement => {
    const t = useTranslations();
    const specialistFilters = getSpecialistFilters(t);

    return (
      <MainLayout>
        {specialistFilters.map(({ category, subcategories }) => (
          <Filter
            header={category}
            subcategories={subcategories}
            setSelectedFilters={props.setSelectedFilters}
            key={category.value}
          />
        ))}
      </MainLayout>
    );
  },
);

FiltersPanelElement.displayName = 'FiltersPanelElement';

export const Filters = FiltersPanelElement;
