import { memo, ReactElement } from 'react';
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

const AreasLayout = styled.div`
  display: flex;
  max-width: 500px;
  gap: 5px 10px;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.w500};
  font-size: 16px;
`;

interface Props {
  areas?: Option[];
}

const SpecialistAreasPanelElement = memo((props: Props): ReactElement => {
  const { areas } = props;

  return (
    <MainLayout>
      <Title>Выезд к клиенту</Title>
      <AreasLayout>
        {areas?.map((area) => (
          <SpecialistAreaCard key={area.value} label={area.label} />
        ))}
      </AreasLayout>
    </MainLayout>
  );
});

SpecialistAreasPanelElement.displayName = 'SpecialistAreasPanelElement';

export const SpecialistAreasPanel = SpecialistAreasPanelElement;
