import { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Filter } from 'src/modules/specialists/filters_panel/FilterCard';
import { SpecialistFilter } from 'src/modules/specialists/specialists_panel/SpecialistsPanel';
import { getSpecialistFilters } from 'src/shared';

const MainLayout = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FiltersPanelElement = (props: {
  setSelectedFilters: Dispatch<SetStateAction<SpecialistFilter[]>>;
}): ReactElement => {
  const t = useTranslations();
  const specialistFilters = getSpecialistFilters(t);
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);

  const onAccordionToggle = (accordionId: string) => {
    setOpenAccordionId((prev) => (prev === accordionId ? null : accordionId));
  };

  return (
    <MainLayout>
      {specialistFilters.map(({ category, subcategories }) => (
        <Filter
          category={category}
          subcategories={subcategories}
          setSelectedFilters={props.setSelectedFilters}
          key={category.value}
          onToggle={() => onAccordionToggle(category.value)}
          isOpen={openAccordionId === category.value}
        />
      ))}
    </MainLayout>
  );
};

export const Filters = FiltersPanelElement;
