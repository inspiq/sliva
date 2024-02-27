import React, { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { Area } from 'src/modules/specialists/specialist_profile/specialist_account/Area';
import { Option } from 'src/shared';

const AreaListLayout = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: ${({ theme }) => theme.w600};
`;

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  padding-left: 10px;
`;

interface Props {
  areas?: Option[];
}

const AreasPanelElement = memo((props: Props): ReactElement => {
  const { areas } = props;

  return (
    <MainLayout>
      <Title>Выезд к Клиенту</Title>
      <AreaListLayout>
        {areas?.map((area) => <Area key={area.value} label={area.label} />)}
      </AreaListLayout>
    </MainLayout>
  );
});

AreasPanelElement.displayName = 'AreasPanelElement';

export const AreaPanel = AreasPanelElement;
