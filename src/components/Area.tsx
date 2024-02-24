import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 5px;
  align-self: center;
`;

const MainLayout = styled.div`
  display: flex;
`;

interface Props {
  value?: string;
  label?: string;
}

const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

const AreaElement = (props: Props): ReactElement => {
  const { label } = props;

  return (
    <MainLayout>
      <Circle color={generateRandomColor()} />
      <div>{label}</div>
    </MainLayout>
  );
};

export const Area = AreaElement;
