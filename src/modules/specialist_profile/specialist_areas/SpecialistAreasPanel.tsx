import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { SpecialistAreaCard } from 'src/modules/specialist_profile/specialist_areas/SpecialistAreaCard';
import { Option } from 'src/shared';

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  margin-top: 3px;
`;

const AreasLayout = styled.div<{ hasAreas: boolean }>`
  display: flex;
  max-width: 500px;
  gap: 5px 10px;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.grey};
  font-size: 15px;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.w500};
  font-size: 16px;
  color: ${({ theme }) => theme.secondary};
`;

interface Props {
  areas?: Option[];
}

const SpecialistAreasPanelElement = (props: Props): ReactElement => {
  const { areas } = props;

  const t = useTranslations('SpecialistCard');

  return (
    <MainLayout>
      <Title>{t('areas.title')}</Title>
      <AreasLayout hasAreas={!!areas?.length}>
        {areas?.length
          ? areas?.map((area) => (
              <SpecialistAreaCard key={area.value} area={area.label} />
            ))
          : t('areas.no_info')}
      </AreasLayout>
    </MainLayout>
  );
};

export const SpecialistAreasPanel = SpecialistAreasPanelElement;
