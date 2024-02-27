import React, { ReactElement } from 'react';
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

interface Props {
  label?: string;
}

const AreaElement = (props: Props): ReactElement => {
  const { label } = props;

  return (
    <MainLayout>
      <Circle generatedColor={generateRandomColor()} />
      <div>{label}</div>
    </MainLayout>
  );
};

export const Area = AreaElement;
