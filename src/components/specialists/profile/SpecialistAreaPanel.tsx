import React, { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { Area } from 'src/components/specialists/profile/account/Area';
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

const AreaListElement = memo(function AreaListElement(
  props: Props,
): ReactElement {
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

export const AreaPanel = AreaListElement;
