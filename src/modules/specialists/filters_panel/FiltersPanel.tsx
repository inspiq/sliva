import { type ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { FilterCard } from 'src/modules/specialists/filters_panel/FilterCard';
import { FiltersPanelVm } from 'src/modules/specialists/filters_panel/FiltersPanelVm';
import { useLocalVm } from 'src/shared';
import type { ValueLabelPair } from 'src/types';

const MainLayout = styled.div`
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  onChangeCategoriesFilter(isOpen: boolean, category: ValueLabelPair): void;
  onChangeSubcategoriesFilter({
    category,
    subcategory,
    isChecked,
  }: {
    category: ValueLabelPair;
    subcategory: ValueLabelPair;
    isChecked: boolean;
  }): void;
}

const FiltersPanelElement = (props: Props): ReactElement => {
  const { onChangeCategoriesFilter, onChangeSubcategoriesFilter } = props;
  const vm = useLocalVm(FiltersPanelVm);

  return (
    <MainLayout>
      {FiltersPanelVm.getFilters.map(({ category, subcategories }) => (
        <FilterCard
          key={category.value}
          category={category}
          subcategories={subcategories}
          onCurrentOpenAccordionIdToggle={() =>
            vm.onCurrentOpenAccordionIdToggle(category.value)
          }
          onChangeCategoriesFilter={(isOpen: boolean) =>
            onChangeCategoriesFilter(isOpen, category)
          }
          onChangeSubcategoriesFilter={({ subcategory, isChecked }) =>
            onChangeSubcategoriesFilter({ category, subcategory, isChecked })
          }
          isOpen={vm.currentOpenAccordionId === category.value}
        />
      ))}
    </MainLayout>
  );
};

export const FiltersPanel = observer(FiltersPanelElement);
