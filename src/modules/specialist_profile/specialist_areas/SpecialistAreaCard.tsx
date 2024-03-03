import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { generateRandomColor } from 'src/shared/utils/get-random-color';

interface StyledProps {
  generatedColor: string;
}

const Circle = styled.div<StyledProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ generatedColor }) => generatedColor};
  margin-right: 5px;
  align-self: center;
`;

const MainLayout = styled.div`
  display: flex;
`;

const NameArea = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.secondary};
  font-family: ${({ theme }) => theme.w400};
`;

interface Props {
  area?: string;
}

const SpecialistAreaCardElement = (props: Props): ReactElement => {
  const { area } = props;

  return (
    <MainLayout>
      <Circle generatedColor={generateRandomColor()} />
      <NameArea>{area}</NameArea>
    </MainLayout>
  );
};

export const SpecialistAreaCard = memo(SpecialistAreaCardElement);
