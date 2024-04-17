import { type ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { Filters } from 'src/modules/specialists/filters_panel/FiltersPanel';
import { NotFoundSpecialists } from 'src/modules/specialists/NotFoundSpecialists';
import { SpecialistCard } from 'src/modules/specialists/specialists_panel/SpecialistCard';
import { SpecialistsPanelVm } from 'src/modules/specialists/specialists_panel/SpecialistsPanelVm';
import {
  devices,
  SKELETON_SPECIALISTS_COUNT,
  SkeletonPanel,
  useLocalVm,
} from 'src/shared';
import type { ValueLabelPair } from 'src/types';

const MainLayout = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  gap: 60px;
  padding: 25px 0;
  position: relative;
  margin-top: 25px;
  margin-bottom: 50px;

  @media ${devices.mobileL} {
    display: flex;
    flex-direction: column;
    margin-top: 0;
  }
`;

const SpecialistsLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ShowMoreSpecialists = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.secondary};
  text-decoration: underline;
  cursor: pointer;
`;

export interface SpecialistFilter {
  category: ValueLabelPair;
  subcategories: ValueLabelPair[];
}

const SpecialistsPanelElement = (): ReactElement => {
  const vm = useLocalVm(SpecialistsPanelVm);
  const t = useTranslations('Specialists');

  return (
    <MainLayout>
      <Filters
        onChangeCategoriesFilter={vm.onChangeCategoriesFilter}
        onChangeSubcategoriesFilter={vm.onChangeSubcategoriesFilter}
      />
      <SpecialistsLayout>
        {!vm.specialists.length && !vm.lockState.progress && (
          <NotFoundSpecialists />
        )}
        {vm.lockState.progress ? (
          <SkeletonPanel
            count={SKELETON_SPECIALISTS_COUNT}
            SkeletonCard={<SpecialistCard isLoading={vm.lockState.progress} />}
          />
        ) : (
          vm.specialists.map((specialist) => (
            <SpecialistCard specialist={specialist} key={specialist.id} />
          ))
        )}
        {vm.showMoreSpecialists && !vm.lockState.progress && (
          <ShowMoreSpecialists onClick={vm.onShowMoreSpecialists}>
            {t('show_more')}
          </ShowMoreSpecialists>
        )}
      </SpecialistsLayout>
    </MainLayout>
  );
};

export const SpecialistsPanel = observer(SpecialistsPanelElement);
