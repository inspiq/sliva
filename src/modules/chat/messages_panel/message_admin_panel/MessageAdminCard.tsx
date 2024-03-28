import { memo, ReactElement } from 'react';
import styled from 'styled-components';

import { type Option } from 'src/shared';

const MainLayout = styled.div`
  font-size: 15px;
  font-weight: ${({ theme }) => theme.w400};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.3s;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.light_grey};
  }
`;

interface Props {
  item: Option;
  adminActions: { [key: string]: VoidFunction };
}

const MessageAdminCardElement = (props: Props): ReactElement => {
  const { item, adminActions } = props;

  return (
    <MainLayout onClick={adminActions[item.value]}>{item.label}</MainLayout>
  );
};

export const MessageAdminCard = memo(MessageAdminCardElement);
