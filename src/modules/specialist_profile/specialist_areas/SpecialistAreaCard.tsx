import { ReactElement } from 'react';
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
`;

interface Props {
  label?: string;
}

const SpecialistAreaCardElement = (props: Props): ReactElement => {
  const { label } = props;

  return (
    <MainLayout>
      <Circle generatedColor={generateRandomColor()} />
      <NameArea>{label}</NameArea>
    </MainLayout>
  );
};

export const SpecialistAreaCard = SpecialistAreaCardElement;
